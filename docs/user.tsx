abstract class RemoteEntity {
  private loadingState: any;

  isLoading(func: Function): boolean {

    return false;
  }

  setLoading(func: Function): void {

  }
}

@Entity
class User extends Seriable {

  // 细粒度控制
  @Observable list: any[];
  @Observable total: number;
  @Observable page: number;

  @Autowired private userRepository: UserRepository;




  // 只要是 async 的都要被 RemoteEntity 监听
  async fetch(page: number) {
    // batch
    this.page = page;

    const { headers, data } = await this.userRepository.fetch(page);

    // batch
    this.list = data;
    this.total = parseInt(headers['x-total-count'], 10);

    return {
      page,
      list: data,
      total: this.total
    }
  }

  async remove(id) {
    await this.userRepository.remove(id);
    this.list = _.remove(this.list, { id });
    return this.reload();
  }

  async reload() {
    return this.fetch(this.page);
  }
}

// 在请求的时候
@Repository
class UserRepository {

  @Loading
  async fetch(page) {
    return await request(`/api/users?_page=${page}&_limit=${20}`)
  }

  async remove(id) {
    return await request(`/api/users/${id}`, {
      method: 'DELETE',
    });
  }

  async  around(method, args) {
    // 设置 Loading 为 true
    this.loading[method.toString()] = true;
    await method.apply(null, args);
    // 设置 Loading 为 false

    this.loading[method.toString()] = false;
  }
}



// 监控使用的数据变化，强制 render
@Component
class MainView extends React.Component<any, any> {
  @Autowired user: User;
  @Autowired city: City;

  // 依旧是 template，json template
  render() {
    this.user.isLoading(this.user.fetch);
    return (
      <button onClick={this.onReset}>
        Seconds passed: {this.user.page}
      </button>
    );
  }

  @Bind
  onReset() {
    user.reset();
  }
}

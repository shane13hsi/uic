import { action, observable } from 'mobx';
import { provide } from '../../core/ioc';

@provide($Canvas)
export class $Canvas {

  @observable activeId: string;
  @observable map = new Map<string, any>();

  @action
  setActive(id: string) {
    this.activeId = id;
  }

  @action
  loadUISchema(id: string) {
    this.map.set(id, {});
  }

}

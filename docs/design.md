var React = require('react');
var Hay = require('hay');
var debug = require('hay-debug');
var loading = require('hay-loading');

var app = Hay();
app.use(debug());
app.use(loading());

// -> route.md
app.routes({

})

@Model
class User {

    constructor() {

    }

    @Inject
    cityRepo: CityRepo;


    async save() {
    }

    // reducer
    async computeValidEmailName(userId: string,
                          firstName: string,
                          lastName: string,
                          engName: string) {
        // 默认所有 public 操作都是异步的
        let city: City = await this.cityRepo.getCityByUserId(userId);
        // update to user
        let emailName = this._computeValidEmailName(firstName, lastName, engName, city.PYName);
        return emailName;
    }

    _computeValidEmailName(firstName, lastName, engName, cityPYName) {
    }

}


function MainView({ emit }) {
    async function save() {
        await emit('user/save');
    }
}

- Template: Json Template
- View: View model actually, but no static types, just plain data. Slight modification and feed to stateless components.
- Model: Logic and separated data.
- Repository: Request logic and raw data.

Read:

GraphQL and Relay will replace Model and Repository,
it should map request directly to View model,
with slightly data modification logic.

Write:
Event and GraphQL modification.


API
- RemoteEntity: plugin, add methods
- @Entity/@Repository/@Service/@Component
- @Observable
- @Autowired
- @Bind

准备对 Mobx 和 inversityJS 做封装 - 传统DDD做法



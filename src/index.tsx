import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Container } from 'inversify';
import 'reflect-metadata';
import { makeProvideDecorator } from 'inversify-binding-decorators';
import getDecorators from 'inversify-inject-decorators';
import LoginForm, { form } from './form';


let container = new Container({ defaultScope: "Singleton" });
let provide = makeProvideDecorator(container);
let { lazyInject } = getDecorators(container);


@provide(App)
class App {
  @observable timer = 0;

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  resetTimer() {
    this.timer = 0;
  }

}

@observer
class TimerView extends React.Component<{}, {}> {

  @lazyInject(App)
  private app: App;

  render() {
    return (
      <div>
        <button onClick={this.onReset}>
          Seconds passed: {this.app.timer}
        </button>
        <LoginForm form={form}/>
      </div>
    );
  }

  onReset = () => {
    this.app.resetTimer();
  }
}

ReactDOM.render(<TimerView />, document.getElementById('root'));

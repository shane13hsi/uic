import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { observable, observer } from './uic';
import { LoginForm } from './form';
import { lazyInject, provide } from './uic/ioc';
import './antd';

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
        <LoginForm/>
      </div>
    );
  }

  onReset = () => {
    this.app.resetTimer();
  }
}

ReactDOM.render(<TimerView />, document.getElementById('root'));

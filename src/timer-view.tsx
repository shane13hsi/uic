import * as React from 'react';
import { observable, observer } from './uic';
import { lazyInject, provide } from './uic/ioc';

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
export class TimerView extends React.Component<{}, {}> {

  @lazyInject(App)
  private app: App;

  render() {
    return (
      <div>
        <button onClick={this.onReset}>
          Seconds passed: {this.app.timer}
        </button>
      </div>
    );
  }

  onReset = () => {
    this.app.resetTimer();
  }
}

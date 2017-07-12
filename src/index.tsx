import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Container } from 'inversify';
import 'reflect-metadata';
import { makeProvideDecorator } from 'inversify-binding-decorators';
import getDecorators from 'inversify-inject-decorators';


let container = new Container();
let provide = makeProvideDecorator(container);
let { lazyInject } = getDecorators(container);


@provide(AppState)
class AppState {
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
  @lazyInject(AppState)
  private appState: AppState;

  render() {
    return (
      <div>
        <button onClick={this.onReset}>
          Seconds passed: {this.appState.timer}
        </button>
      </div>
    );
  }

  onReset = () => {
    this.appState.resetTimer();
  }
}

ReactDOM.render(<TimerView />, document.getElementById('root'));

import * as React from 'react';
import { GLApp } from './gl-app';

export class IDE extends React.Component<{}, {}> {

  componentDidMount() {
    GLApp.instance.init();
  }

  render() {
    return (
      <div>
        <div id="golden-layout"></div>
      </div>
    )
  }
}

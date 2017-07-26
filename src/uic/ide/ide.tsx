import * as React from 'react';
import { GLApp } from './gl-app';
import { ToolBar } from './tool-bar';

export class IDE extends React.Component<{}, {}> {

  componentDidMount() {
    GLApp.instance.init();
  }

  render() {
    return (
      <div>
        <ToolBar/>
        <div id="golden-layout"></div>
      </div>
    )
  }
}

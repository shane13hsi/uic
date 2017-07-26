import * as React from 'react';
import { GLApp } from './gl-app';
import { DragDropContext } from '@uic/react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ToolBar } from './tool-bar';

@DragDropContext(HTML5Backend)
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

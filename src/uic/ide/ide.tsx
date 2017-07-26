import * as React from 'react';
import { GLApp } from './gl-app';
import { DragDropContext } from '@uic/react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export class IDE extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <GLApp/>
      </div>
    )
  }
}

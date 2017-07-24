import * as React from 'react';
import { DragSource } from 'react-dnd';
import { merge } from 'lodash';

const ItemSource = {
  beginDrag(props) {
    return {
      type: props.type,
    };
  },

  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.dropped(merge({}, dropResult, props))
    }
  },

  canDrag(props) {
    return true
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    didDrop: monitor.didDrop(),
  }
}

export function createItem(type): any {
  @DragSource(type, ItemSource, collect)
  class Item extends React.Component<any, any> {
    constructor() {
      super()
    }

    static propTypes = {
      connectDragSource: React.PropTypes.func.isRequired,
      isDragging: React.PropTypes.bool.isRequired,
    };

    render() {
      const { connectDragSource, isDragging } = this.props;
      return connectDragSource(
        <div style={{
          opacity: isDragging ? 0.5 : 1,
          fontWeight: "bold",
          cursor: "move",
        }}>
          {this.props.children}
        </div>
      );
    }
  }

  return Item;
}

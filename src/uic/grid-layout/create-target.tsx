import * as React from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';

const TargetSource = {
  drop: (props, monitor, component) => {
    const hasDroppedOnChild = monitor.didDrop();
    if (hasDroppedOnChild) {
      return;
    }
    return { target: props.targetKey }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
  };
}

export function createTarget(type): any {
  @DropTarget(type, TargetSource, collect)
  class Target extends React.Component<any, any> {
    constructor() {
      super()
    }

    static propTypes = {
      isOver: React.PropTypes.bool.isRequired,
    };

    render() {
      const { connectDropTarget, isOver, canDrop } = this.props;
      return connectDropTarget(
        <div style={{ height: '100%' }}>
          <TargetContainer isOver={isOver} canDrop={canDrop}>
            {this.props.children}
            {/*{isOver ?*/}
            {/*<TargetHoverContainer>*/}
            {/*<p>释放以添加</p>*/}
            {/*</TargetHoverContainer> : null}*/}
          </TargetContainer>
        </div>
      );
    }
  }

  return Target;
}

const TargetContainer: any = styled.div`// styled
  & {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${(props: any) => props.isOver ? 'rgba(30, 144, 255, 0.1)' : (props.canDrop ? 'rgba(30, 144, 255, 0.1)' : 'transparent')};
    border: ${(props: any) => props.isOver ? '2px #333 dashed' : 'none'};
  }
`;

const TargetHoverContainer = styled.div`// styled
  & {
    //display: inline-block;
    //position: absolute;
    //top: 0;
    //left: 0;
    width: 100%;
    height: 100%;
    //z-index: 1;
    //border: 1px dashed #F05440;
    //background-color: rgba(255, 255, 255, 0.75);
    //border-radius: 8px;
    background-color: rgba(30, 144, 255, 0.25);
  }

  //& p {
  //  position: absolute;
  //  width: 100px;
  //  text-align: center;
  //  top: 50%;
  //  left: 50%;
  //  margin-left: -50px;
  //  color: #333333;
  //  font-size: 16px;
  //}
`;

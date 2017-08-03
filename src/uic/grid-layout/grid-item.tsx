import * as React from 'react';
import styled from 'styled-components';

const Item: any = styled.div`// styled
  & {
    text-align: center;
    border: ${(props: any )=> props.active ? '1px solid #cccccc' : '1px solid transparent'};
    user-select: none;
    cursor: ${(props: any )=> props.move ? 'move' : 'default'};
  }
`;

const RootItem: any = styled(Item)`// styled
  & {
    overflow: auto;
    height: 100% !important;
    background-size: 20px 20px; /* 控制条纹的大小 */
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent),
    linear-gradient(-45deg, #eee 25%, transparent 25%, transparent),
    linear-gradient(45deg, transparent 75%, #eee 75%),
    linear-gradient(-45deg, transparent 75%, #eee 75%);
  }
`;

const RemoveIcon = styled.span`// styled
  & {
    position: absolute;
    top: 2px;
    right: 2px;
    padding: 0 4px;
    background-color: red;
    color: white;
    border-radius: 2px;
    z-index: 9999;
    cursor: pointer;
  }
`;

export class GridItem extends React.Component<any, any> {
  constructor() {
    super();
  }

  static contextTypes = {
    layout: React.PropTypes.object
  };

  onClick(e) {
    const { layout } = this.context;
    if (layout) {
      e.stopPropagation();
      layout.setActiveItem(this.props.itemKey, this.props.gridKey)
      this.props.onClick1();
    }
  }

  onHover(e) {
    const { layout } = this.context;
    e.stopPropagation();
    if (layout) {
      layout.changeMouse([this.props.itemKey])
    }
  }

  onRemove() {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.itemKey, this.props.gridKey)
    }
  }

  render() {
    const { itemKey } = this.props;
    const { overItemKeys = null, activeItem = null } = this.context.layout || {};

    const currentOverKey = overItemKeys && overItemKeys.length > 0 ? overItemKeys[overItemKeys.length - 1] : null;
    const canMove = this.props.className && !( this.props.className && this.props.className.indexOf('static') > -1 );
    const isActive = (currentOverKey === itemKey && activeItem !== itemKey || activeItem === itemKey) && itemKey !== 'root';

    const ItemComponent = itemKey === 'root' ? RootItem : Item;

    return this.context.layout ? (
      <ItemComponent
        itemKey={itemKey}
        onMouseOver={this.onHover.bind(this)}
        onClick={this.onClick.bind(this)}
        active={isActive}
        move={canMove}
        {...this.props}>
        {activeItem === itemKey && itemKey !== 'root' ?
          <RemoveIcon onClick={this.onRemove.bind(this)}>x</RemoveIcon> : null}
        {this.props.children}
      </ItemComponent>
    ) : (<div>{this.props.children}</div>)
  }
}

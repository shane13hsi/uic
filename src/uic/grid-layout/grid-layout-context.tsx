import * as React from 'react';
import { bind } from 'decko';

export class GridLayoutContext extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      activeItem: null,
      activeGrid: null,
      overItemKeys: []
    }
  }

  static childContextTypes = {
    layout: React.PropTypes.object
  };

  getChildContext() {
    const { currentComponent, activeItem, activeGrid, overItemKeys } = this.state;
    return {
      layout: {
        activeItem, activeGrid, overItemKeys,
        setActiveItem: this.setActiveItem,
        changeMouse: this.changeMouse
      }
    }
  }

  @bind
  setActiveItem(activeItem, activeGrid) {
    this.setState({ activeItem, activeGrid });
  }

  @bind
  changeMouse(keys) {
    this.setState({ overItemKeys: keys });
  }

  render() {
    return <div style={{ height: '100%' }}>{this.props.children}</div>
  }
}

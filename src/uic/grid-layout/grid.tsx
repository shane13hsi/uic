import './grid.css';
import * as React from 'react';
import styled from 'styled-components';
import sizeMe from 'react-sizeme';
import * as ReactGridLayout from 'react-grid-layout';
import { bind } from 'decko';
import { merge } from 'lodash';

const GridWrapper: any = styled.div`// styled
  & {
    position: relative;
    height: 100%;

    .react-grid-layout {
      height: ${(props: any) => props.gridKey === null ? '100% !important' : 'foo'}
    }
  }
`;

@sizeMe({ monitorWidth: true })
export class Grid extends React.Component<any, any> {
  constructor() {
    super();
  }

  static contextTypes = {
    layout: React.PropTypes.object
  };

  @bind
  onChange(layout, oldItem, newItem) {
    if (this.props.onChange) {
      this.props.onChange(layout)
    }
  }

  @bind
  onResize(layout, oldItem, newItem, placeholder, e, element) {
    e.stopPropagation();
    if (this.props.onChange) {
      this.props.onChange(layout)
    }
  }

  @bind
  onDrag(layout, oldItem, newItem, placeholder, e, element) {
    e.stopPropagation();
    if (this.props.onChange) {
      this.props.onChange(layout)
    }
  }

  @bind
  layoutWrapper(layout) {
    if (!this.context.layout) {
      return layout.map(l => merge({}, l, { static: true }))
    }
    return layout
  }

  render() {
    const { layout, cols = 12, rowHeight = 32, size, padding = [0, 0], margin = [0, 0], gridKey } = this.props;

    return this.context.layout ? (
      <GridWrapper gridKey={gridKey}>
        <ReactGridLayout layout={this.layoutWrapper(layout)}
                         cols={cols}
                         rowHeight={rowHeight}
                         width={size.width}
                         verticalCompact={false}
                         measureBeforeMount={true}
                         containerPadding={padding}
                         margin={margin}
                         onDrag={this.onDrag}
                         onResize={this.onResize}
                         onResizeStop={this.onChange}
                         onDragStop={this.onChange}>
          {this.props.children}
        </ReactGridLayout>
      </GridWrapper>
    ) : <div>{this.props.children}</div>
  }
}

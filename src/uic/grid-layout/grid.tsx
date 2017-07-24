import * as React from 'react';
import styled from 'styled-components';
import sizeMe from 'react-sizeme';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';

const GridWrapper: any = styled.div`// styled
  & {
    position: relative;
    height: 100%;
  }
`;

const GridWrapperCover: any = styled.div`// styled
  & {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    //background-color: rgba(204, 204, 204, 0.35);
    pointer-events: none;
    border: 2px #333 dashed;
  }

  &:after {
    content: '点击以编辑该区块';
    color: ${(props: any) => props.active ? 'transparent' : '#333333'};
    top: calc(50% - 20px);
    zoom: 50%;
    position: relative;
  }
`;

const FinishButton: any = styled.button`// styled
  & {
    position: absolute;
    right: 8px;
    top: 8px;
    z-index: 1000;
  }
`;

const Button = styled.button`// styled
  & {
    display: inline-block;
    position: absolute;
    z-index: 1000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 84px;
    height: 28px;
    background: rgba(240, 84, 64, 0.45);
    color: white;
    border: none;
    outline: none;
    transition: all 0.35s ease;
    cursor: pointer;
    font-size: 12px;
    border-radius: 3px;

    &:hover {
      background: rgba(240, 84, 64, 1);
    }
  }
`;

@sizeMe({ monitorWidth: true })
export class Grid extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      showButton: false
    }
  }

  static contextTypes = {
    layout: React.PropTypes.object
  }

  onChange(layout, oldItem, newItem) {
    if (this.props.onChange) {
      this.props.onChange(layout)
    }
  }

  onResize(layout, oldItem, newItem, placeholder, e, element) {
    e.stopPropagation()
    if (this.props.onChange) {
      this.props.onChange(layout)
    }
  }

  onDrag(layout, oldItem, newItem, placeholder, e, element) {
    e.stopPropagation()
    if (this.props.onChange) {
      this.props.onChange(layout)
    }
  }

  render() {
    const { layout, cols = 12, rowHeight = 32, size, padding = [0, 0], margin = [0, 0] } = this.props;
    const { overItemKeys } = this.context.layout
    const { showButton } = this.state
    return (
      <GridWrapper editable={this.state.showButton && layout && layout.length > 0}>
        <ReactGridLayout layout={layout} cols={cols} rowHeight={rowHeight} width={size.width} verticalCompact={false}
                         measureBeforeMount={true}
                         containerPadding={padding} margin={margin}
                         onDrag={this.onDrag.bind(this)}
                         onResize={this.onResize.bind(this)}
                         onResizeStop={this.onChange.bind(this)}
                         onDragStop={this.onChange.bind(this)}>
          {this.props.children}
        </ReactGridLayout>
        {/*{ showButton && currentOverKey === gridKey && activeGrid === null || activeGrid === gridKey ?*/}
        {/*<GridWrapperCover active={activeGrid === gridKey}/> : null }*/}
        {/*{this.state.showButton && layout && layout.length > 0 ?*/}
        {/*<Button onClick={this.onEditable.bind(this)}>编辑{this.props.gridKey}</Button> : null }*/}
        {/*{activeGrid === gridKey ?*/}
        {/*<FinishButton onClick={() => this.props.onEditable(null)}>完成编辑</FinishButton> : null}*/}
      </GridWrapper>
    )
  }
}

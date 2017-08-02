import * as React from 'react';
import { Col, Collapse, Popover, Row } from '../antd/antd';
import { bind } from 'decko';
import { findDOMNode } from 'react-dom';
import { Scroll } from './components/scroll';
import { createItem } from '../grid-layout/utils/create-item';
import { $Canvas } from './models/$canvas';
import { lazyInject } from '../core/ioc';
import { $ComponentList, IComponent, IComponent2 } from './models/$component-list';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import styled from 'styled-components';
import { toJS } from 'mobx';

const Panel = Collapse.Panel;
const Item = createItem("grid-target");

@observer
export class ComponentList extends React.Component<{}, {}> {
  private _node: any;

  @lazyInject($Canvas)
  private _$canvas: $Canvas;

  @lazyInject($ComponentList)
  private _$componentList: $ComponentList;

  componentDidMount() {
    this._$componentList.load();
  }

  /**
   * 处理下定位 left 距离，jQuery 配合 React 的 class 和 event handler 很灵活
   */
  @bind
  private _handleVisibleChange() {
    const width = findDOMNode(this._node).getBoundingClientRect().width;
    $('.ant-popover').css({ left: width });
  }

  private _panelRenderer(listByGroup: IComponent2[]) {
    return _.chain(listByGroup)
      .map((value: IComponent2) =>
        <Panel header={value.groupName} key={String(value.groupId)}>
          {this._panelBodyRenderer(value.value)}
        </Panel>)
      .value();
  }

  private _panelBodyRenderer(componentList: IComponent[]) {
    return _.chain(componentList)
      .chunk(3)
      .map((value, idx) =>
        <Row gutter={24} key={idx}>
          {this._panelBodyLIneRender(value)}
        </Row>
      ).value();
  }

  private _panelBodyLIneRender(componentList: IComponent[]) {
    return _.chain(componentList)
      .map((value: IComponent, idx: number) =>
        <Col span={6} key={idx}>
          <Item dropped={({ target }) => this._$canvas.addComponent(value.schema, target)}>
            <Popover onVisibleChange={this._handleVisibleChange}
                     placement="right"
                     content={
                       <PopoverContent>
                         {value.intro}
                         <PreviewWrapper>
                           {value.thumbUrl != null ? <img src={value.thumbUrl}/> : null}
                         </PreviewWrapper>
                       </PopoverContent>
                     }
                     title={value.title}>
              <ComponentIconWrapper>
                {value.title}
              </ComponentIconWrapper>
            </Popover>
          </Item>
        </Col>
      )
      .value()
  }

  @bind
  private _onChange(key: string) {
    this._$componentList.changeActiveKey(key);
  }

  public render() {
    return (
      <Scroll ref={n => this._node = n}>
        <Collapse bordered={false}
                  activeKey={toJS(this._$componentList.activeKey)}
                  onChange={this._onChange}>
          {this._panelRenderer(this._$componentList.listByGroup)}
        </Collapse>
      </Scroll>
    )
  }
}


const ComponentIconWrapper = styled.div`// styled
  & {
    text-align: center;
    width: 44px;
    height: 44px;
    line-height: 44px;
    border: 1px solid transparent;
    transition: border 0.1s ease-in-out;
    border-radius: 2px;
    font-weight: 400;
    background: #fff;

    &:hover {
      border: 1px solid gray;
    }
  }
`;

const PopoverContent = styled.div`// styled
  & {
    width: 180px;
  }
`;

const PreviewWrapper = styled.div`// styled
  & {
    & > img {
      width: 100px;
    }
  }
`;

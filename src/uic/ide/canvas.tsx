import * as React from 'react';
import { Card, Rate, UndefinedComponent } from '../antd/antd';
import { GridLayoutContext } from '../grid-layout/grid-layout-context';
import { observer } from 'mobx-react';
import { UISchemaToJSX } from '../uischema-to-jsx/uischema-to-jsx';
import { $Canvas } from './models/$canvas';
import { lazyInject } from '../core/ioc';
import { GLApp } from './gl-app';
import { toJS } from 'mobx';

const map = {
  Rate,
  Card
};

export function getComponent(name: string) {
  if (map[name]) {
    return map[name];
  } else {
    return UndefinedComponent;
  }
}

@observer
export class Canvas extends React.Component<{}, {}> {

  @lazyInject($Canvas)
  private $canvas: $Canvas;

  render() {
    // TODO: 优化 render 次数
    const uiSchemaDoc = this.$canvas.uiSchemaMap.get(this.$canvas.activeId);
    const layoutSchemaDoc = this.$canvas.layoutSchemaMap.get(this.$canvas.activeId);

    let uiSchema = uiSchemaDoc ? uiSchemaDoc.data : null;
    let layoutSchema = layoutSchemaDoc ? layoutSchemaDoc.data : null;

    if (!GLApp.instance.glLayout.isInitialised) {
      return <div/>
    }
    // TODO: 由于请求的时候，会有 undefined 存在。
    // 猜测在 golden layout 初始化时，uiSchema 已经加载好，layoutSchema 还没有
    if (uiSchema == null || layoutSchema == null) {
      return <div/>
    }

    return (
      <GridLayoutContext>
        <UISchemaToJSX uiSchema={toJS(uiSchema)}
                       layoutSchema={toJS(layoutSchema)}
                       getComponent={getComponent}/>
      </GridLayoutContext>
    )
  }
}

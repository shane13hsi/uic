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
    const uiSchema = this.$canvas.currentUISchema;
    const layoutSchema = this.$canvas.currentLayoutSchema;

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

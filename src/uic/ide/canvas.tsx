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

const uiSchema1 = [
  {
    "_id": "root",
    "component": "Card",
    "props": {
      "title": "测试拖动布局",
      "children": [
        {
          "_id": "11",
          "component": "Rate",
          "props": {
            "allowHalf": true,
            "defaultValue": 3.5
          }
        },
        {
          "_id": "12",
          "component": "Rate",
          "props": {
            "defaultValue": 4,
          }
        }
      ]
    }
  }
];

const layoutSchema1 = {
  "root": {
    "layout": { "x": 0, "y": 0, "w": 12, "h": 4, "static": true },
    "options": { "padding": [10, 10], "margin": [0, 10] }
  },
  "11": { "layout": { "x": 0, "y": 1, "w": 12, "h": 1, "static": false } },
  "12": { "layout": { "x": 0, "y": 0, "w": 12, "h": 1, "static": false } },
};

@observer
export class Canvas extends React.Component<{}, {}> {

  @lazyInject($Canvas)
  private $canvas: $Canvas;

  render() {
    const uiSchema = this.$canvas.activeUISchema;
    const layoutSchema = this.$canvas.activeLayoutSchema;

    if (!GLApp.instance.glLayout.isInitialised) {
      return <div/>
    }

    console.log(layoutSchema);

    return (
      <GridLayoutContext>
        <UISchemaToJSX uiSchema={toJS(uiSchema)}
                       layoutSchema={toJS(layoutSchema)}
                       getComponent={getComponent}/>
      </GridLayoutContext>
    )
  }
}

/**
 * Form 表单 数据
 * XXForm
 * X2Form
 *
 * 其他组件
 * uiSchema: {
 *
 * }
 */


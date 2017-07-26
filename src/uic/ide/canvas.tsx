import * as React from 'react';
import { Card, Rate, UndefinedComponent } from '../antd/antd';
import { GridLayoutContext } from '../grid-layout/grid-layout-context';
import { observer } from 'mobx-react';

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

const uiSchema = [
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
          "component_ref": "#123",
          "props": {
            "defaultValue": 4,
          }
        }
      ]
    }
  }
];

const layoutSchema = {
  "root": { "options": { "padding": [10, 10], "margin": [0, 10] } },
  "11": { "layout": { "x": 0, "y": 1, "w": 12, "h": 1, "static": false } },
  "12": { "layout": { "x": 0, "y": 0, "w": 12, "h": 1, "static": false } },
};

@observer
export class Canvas extends React.Component<{}, {}> {

  render() {
    return (
      <GridLayoutContext>
        <h1>123</h1>
        {/*<UISchemaToJSX uiSchema={uiSchema}
                       layoutSchema={layoutSchema}
         getComponent={getComponent}/>*/}
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


import * as React from 'react';
import { Card, Rate, UndefinedComponent } from './antd';
import { UISchemaToJSX } from './uic';

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
    "component": "Card",
    "props": {
      "title": "测试拖动布局",
      "children": [
        {
          "component": "Rate",
          "props": {
            "allowHalf": true,
            "defaultValue": 3.5
          }
        },
        {
          "component": "Rate",
          "props": {
            "allowHalf": true,
            "defaultValue": 3.5
          }
        }
      ]
    }
  }
];

export class Canvas extends React.Component<{}, {}> {

  render() {
    return (
      <UISchemaToJSX uiSchema={uiSchema} getComponent={getComponent}/>
    )
  }
}

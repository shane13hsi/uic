import 'antd/dist/antd.less';
import './override.css';
import * as React from 'react';
export { Form, Icon, Input, Button, Card, Rate, Tree, Checkbox, Switch, Tooltip } from 'antd';

export function UndefinedComponent(props) {
  return (
    <div>
      <span>UndefinedComponent</span>
      {props.children}
    </div>
  )
}

import 'antd/dist/antd.css';
import * as React from 'react';
export { Form, Icon, Input, Button, Card, Rate } from 'antd';

export function UndefinedComponent(props) {
  return (
    <div>
      <span>UndefinedComponent</span>
      {props.children}
    </div>
  )
}

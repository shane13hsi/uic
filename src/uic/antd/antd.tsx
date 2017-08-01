import 'antd/dist/antd.less';
import './override.css';
import * as React from 'react';
import { Button as AButton } from 'antd';
import { ButtonProps } from 'antd/lib/button/button';
export { Form, Icon, Input, Card, Rate, Tree, Checkbox, Switch, Tooltip, Collapse, Row, Col, Popover } from 'antd';

export function UndefinedComponent(props) {
  return (
    <div>
      <span>UndefinedComponent</span>
      {props.children}
    </div>
  )
}

export type IButtonProps = ButtonProps & { text: string }

export function Button(p: IButtonProps) {
  return (
    <AButton>
      {p.text}
    </AButton>
  )
}

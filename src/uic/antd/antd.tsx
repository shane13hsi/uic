import 'antd/dist/antd.less';
import './override.css';
import * as React from 'react';
import { Button as AButton } from 'antd';
import { ButtonProps } from 'antd/lib/button/button';
import * as _ from 'lodash';
export {
  Form,
  Icon,
  Input,
  Card,
  Rate,
  Tree,
  Checkbox,
  Switch,
  Tooltip,
  Collapse,
  Row,
  Col,
  Popover,
  Button as AButton
} from 'antd';

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
    <AButton {..._.omit(p, ['text'])}>
      {p.text}
    </AButton>
  )
}

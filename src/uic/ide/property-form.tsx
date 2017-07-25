import * as React from 'react';
import { Form, Icon, Input, Switch, Tooltip } from '../antd/antd';

export class PropertyForm extends React.Component<{}, {}> {
  render() {
    return (
      <Form>
        <Form.Item label={
          (<span>count&nbsp;
            <Tooltip title="star 总数">
                <Icon type="question-circle-o"/>
              </Tooltip>
          </span>)
        }>
          <Input placeholder="Username"/>
        </Form.Item>
        <Form.Item label={
          (<span>value&nbsp;
            <Tooltip title="当前数，受控值">
                <Icon type="question-circle-o"/>
              </Tooltip>
          </span>)
        }>
          <Input placeholder="Username"/>
        </Form.Item>
        <Form.Item label={
          (<span>allowHalf&nbsp;
            <Tooltip title="是否允许半选">
                <Icon type="question-circle-o"/>
              </Tooltip>
          </span>)
        }>
          <Switch/>
        </Form.Item>
      </Form>
    )
  }
}

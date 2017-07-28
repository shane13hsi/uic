import * as React from 'react';
import { Form, Icon, Tooltip } from '../../antd/antd';
import { IPropertyFormItemProps } from './property-form-item.props';

export class PropertyFormItem extends React.Component<IPropertyFormItemProps, {}> {
  render() {
    const { label, tooltip } = this.props;
    return (
      <Form.Item label={
        (<span>{label}&nbsp;
          <Tooltip title={tooltip}>
                <Icon type="question-circle-o"/>
              </Tooltip>
          </span>)
      }>
        {this.props.children}
      </Form.Item>
    )
  }
}

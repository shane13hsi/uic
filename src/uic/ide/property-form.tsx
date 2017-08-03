import * as React from 'react';
import { Form, Input, Switch, UndefinedComponent } from '../antd/antd';
import { PropertyFormItem } from './components/property-form-item';
import styled from 'styled-components';
import { UISchemaToJSX } from '../uischema-to-jsx/uischema-to-jsx';
import { observer } from 'mobx-react';
import { $PropertyForm } from './models/$property-form';
import { lazyInject } from '../core/ioc';
import { toJS } from 'mobx';

const map = {
  Form,
  PropertyFormItem,
  Input,
  Switch
};


function getComponent(name: string) {
  if (map[name]) {
    return map[name];
  } else {
    return UndefinedComponent;
  }
}

/**
 * Mobx Form 实例作为数据，onChange 需要控制下
 * mobx 数据
 */
@observer
export class PropertyForm extends React.Component<{}, {}> {
  @lazyInject($PropertyForm)
  private $propertyForm: $PropertyForm;

  public render() {
    if (this.$propertyForm.form == null) return <div/>;
    return (
      <Wrapper>
        <PropertyForm2 form={this.$propertyForm.form}
                       uiSchema={toJS(this.$propertyForm.uiSchema)}
        />
      </Wrapper>
    )
  }
}

@observer
export class PropertyForm2 extends React.Component<any, {}> {
  render() {
    const { form, uiSchema } = this.props;
    return <UISchemaToJSX uiSchema={uiSchema}
                          layoutSchema={[]}
                          form={form}
                          getComponent={getComponent}/>
  }
}

const Wrapper = styled.div`// styled
  & {
    margin: 5px;
  }
`;

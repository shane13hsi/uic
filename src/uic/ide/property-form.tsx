import * as React from 'react';
import { Form, Input, Switch, UndefinedComponent } from '../antd/antd';
import { PropertyFormItem } from './components/property-form-item';
import styled from 'styled-components';
import { UISchemaToJSX } from '../uischema-to-jsx/uischema-to-jsx';
import { formSchema, uiSchema } from '../antd/forms/ratings';
import { observer } from 'mobx-react';
import { $PropertyForm } from './models/$property-form';
import { observable } from 'mobx';

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
  @observable private _form: $PropertyForm;

  componentDidMount() {
    this._form = new $PropertyForm({
      fields: formSchema, values: {
        value: 4,
        count: 5,
        allowHalf: true
      }
    }, { name: '12345' });
  }

  //
  public render() {
    if (this._form == null) return <div/>;
    console.log(this._form.values());
    return (
      <Wrapper>
        <UISchemaToJSX uiSchema={uiSchema}
                       layoutSchema={[]}
                       form={this._form}
                       getComponent={getComponent}/>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`// styled
  & {
    margin: 5px;
  }
`;

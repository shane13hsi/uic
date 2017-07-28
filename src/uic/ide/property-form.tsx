import * as React from 'react';
import { Form, Input, Switch, UndefinedComponent } from '../antd/antd';
import { PropertyFormItem } from './components/property-form-item';
import styled from 'styled-components';
import { UISchemaToJSX } from '../uischema-to-jsx/uischema-to-jsx';
import { uiSchema } from '../antd/forms/ratings';

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

export class PropertyForm extends React.Component<{}, {}> {

  render() {
    return (
      <Wrapper>
        <UISchemaToJSX uiSchema={uiSchema}
                       layoutSchema={[]}
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

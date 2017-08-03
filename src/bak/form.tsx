import * as React from 'react';
import * as validatorjs from 'validatorjs';
import { AButton, Button, Form, Input } from '../uic/antd/antd';
import { Form as MobxReactForm } from 'mobx-react-form';
import { observer } from 'mobx-react';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const fields = [{
  name: 'email',
  label: 'Email',
  placeholder: 'Insert Email',
  rules: 'required|email|string|between:5,25',
}, {
  name: 'password',
  label: 'Password',
  placeholder: 'Insert Password',
  rules: 'required|string|between:5,25',
}];

const plugins = { dvr: validatorjs };

class MyForm extends MobxReactForm {

  onSuccess(form) {
    alert('Form is valid! Send the request here.');
    // get field values
    console.log('Form Values!', form.values());
  }

  onError(form) {
    // get all form errors
    console.log('All form errors', form.errors());
    // invalidate the form with a custom error message
    form.invalidate('This is a generic error message!');
  }
}

const form = new MyForm({ fields }, { plugins });

@observer
export class LoginForm extends React.Component<{}, {}> {

  componentDidMount() {

  }

  render() {

    console.log(form.values)
    return (
      <div>
        <Form>
          <Form.Item {...formItemLayout}
                     label={form.$('email').label}
                     help={form.$('email').error}>
            <Input {...form.$('email').bind()} />
          </Form.Item>

          <Form.Item {...formItemLayout}
                     label={form.$('password').label}
                     help={form.$('password').error}>
            <Input {...form.$('password').bind({ type: 'password' })} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}>
            <Button type="primary" onClick={form.onSubmit} text="Submit"></Button>
            &nbsp;&nbsp;
            <AButton onClick={form.onReset}>Reset</AButton>
            &nbsp;&nbsp;
            <AButton onClick={form.onClear}>Clear</AButton>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
//
// MobxReactFormDevTools.register({
//   $LoginForm,
// });
//
// MobxReactFormDevTools.select('$LoginForm');
//
// MobxReactFormDevTools.open(true);

import * as React from 'react';
import * as validatorjs from 'validatorjs';
import { Button, Form, Input } from './uic/antd/antd';
import { computed, lazyInject, MobxReactForm, observer, provide } from './uic';

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

@provide($Form)
class $Form extends MobxReactForm {

  plugins() {
    return {
      dvr: {
        package: validatorjs
      },
    };
  }

  onSuccess(form) {
    // alert('see console');
    console.log('Form Values', form.values());
  }

  onError(form) {
    // alert('see console');
    console.log('Form Errors', form.errors());
  }
}

@provide($LoginForm)
class $LoginForm extends $Form {

  /**
   * TODO: 使用 computed 值
   *
   * @param name
   * @returns {any}
   */
  validateStatus(name: string) {
    const f = this.$(name);
    if (f.isPristine) {
      return undefined;
    } else if (f.validating) {
      return 'validating';
    } else if (f.isValid) {
      return 'success';
    } else {
      return 'error';
    }
  }

  @computed get isLoading() {
    return this.fields.size === 0;
  }
}

@observer
export class LoginForm extends React.Component<{}, {}> {

  @lazyInject($LoginForm)
  private form: $LoginForm;

  componentDidMount() {
    this.form.init({
      email: {
        label: 'Email',
        placeholder: 'Insert Email',
        rules: 'required|email|string|between:5,25',
      },
      password: {
        label: 'Password',
        placeholder: 'Insert Password',
        rules: 'required|string|between:5,25',
      },
    })
  }

  render() {
    if (this.form.isLoading) return (<div>Loading</div>);

    return (
      <Form>
        <Form.Item {...formItemLayout}
                   label={this.form.$('email').label}
                   help={this.form.$('email').error}
                   validateStatus={this.form.validateStatus('email')}>
          <Input {...this.form.$('email').bind()} />
        </Form.Item>

        <Form.Item {...formItemLayout}
                   label={this.form.$('password').label}
                   help={this.form.$('password').error}
                   validateStatus={this.form.validateStatus('password')}>
          <Input {...this.form.$('password').bind({ type: 'password' })} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}>
          <Button type="primary" onClick={this.form.onSubmit}>Submit</Button>
          &nbsp;&nbsp;
          <Button onClick={this.form.onReset}>Reset</Button>
          &nbsp;&nbsp;
          <Button onClick={this.form.onClear}>Clear</Button>
        </Form.Item>
      </Form>
    )
  }
}



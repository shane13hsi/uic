import * as React from 'react';
import { observer } from 'mobx-react';
import * as validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import { lazyInject, provide } from './ioc';

@provide(Form)
class Form extends MobxReactForm {

  plugins() {
    return {
      dvr: {
        package: validatorjs
      },
    };
  }

  onSuccess(form) {
    alert('see console');
    console.log('Form Values', form.values());
  }

  onError(form) {
    alert('see console');
    console.log('Form Errors', form.errors());
  }
}

@provide($LoginForm)
class $LoginForm extends Form {
  setup() {
    return {
      fields: {
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
      }
    }
  }
}

@observer
export class LoginForm extends React.Component<{}, {}> {

  @lazyInject($LoginForm)
  private form: $LoginForm;

  render() {
    return (
      <form>
        <label htmlFor={this.form.$('email').id}>
          {this.form.$('email').label}
        </label>
        <input {...this.form.$('email').bind()} />
        <p>{this.form.$('email').error}</p>

        <label htmlFor={this.form.$('password').id}>
          {this.form.$('password').label}
        </label>
        <input {...this.form.$('password').bind({ type: 'password' })} />
        <p>{this.form.$('password').error}</p>

        <button type="submit" onClick={this.form.onSubmit}>Submit</button>
        <button type="button" onClick={this.form.onReset}>Reset</button>
        <button type="button" onClick={this.form.onClear}>Clear</button>

        <p>{this.form.error}</p>
      </form>
    )
  }
}

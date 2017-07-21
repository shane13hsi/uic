import * as React from 'react';
import { observer } from 'mobx-react';
import * as validatorjs from 'validatorjs';
import MobxReactForm from '@uic/mobx-react-form';
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
}

@observer
export class LoginForm extends React.Component<{}, {}> {

  @lazyInject($LoginForm)
  private $loginForm: $LoginForm;

  componentDidMount() {
    this.$loginForm.init({
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
    if (this.$loginForm.fields.size === 0) return (<div>Loading</div>);
    return (
      <form>
        <label htmlFor={this.$loginForm.$('email').id}>
          {this.$loginForm.$('email').label}
        </label>
        <input {...this.$loginForm.$('email').bind()} />
        <p>{this.$loginForm.$('email').error}</p>

        <label htmlFor={this.$loginForm.$('password').id}>
          {this.$loginForm.$('password').label}
        </label>
        <input {...this.$loginForm.$('password').bind({ type: 'password' })} />
        <p>{this.$loginForm.$('password').error}</p>

        <button type="submit" onClick={this.$loginForm.onSubmit}>Submit</button>
        <button type="button" onClick={this.$loginForm.onReset}>Reset</button>
        <button type="button" onClick={this.$loginForm.onClear}>Clear</button>

        <p>{this.$loginForm.error}</p>
      </form>
    )
  }
}

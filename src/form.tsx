import * as React from 'react';
import { observer } from 'mobx-react';
import * as validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

const fields = {
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
};

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

class LoginForm extends Form {}

export const form = new LoginForm({ fields }, { name: "Login Form" });

interface IFormProps {
  form: any;
}

export default observer(({ form }: IFormProps) => (
  <form>
    <label htmlFor={form.$('email').id}>
      {form.$('email').label}
    </label>
    <input {...form.$('email').bind()} />
    <p>{form.$('email').error}</p>

    <label htmlFor={form.$('password').id}>
      {form.$('password').label}
    </label>
    <input {...form.$('password').bind({ type: 'password' })} />
    <p>{form.$('password').error}</p>

    <button type="submit" onClick={form.onSubmit}>Submit</button>
    <button type="button" onClick={form.onReset}>Reset</button>
    <button type="button" onClick={form.onClear}>Clear</button>

    <p>{form.error}</p>
  </form>
));

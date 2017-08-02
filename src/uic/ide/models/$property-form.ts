import { Form } from '@uic/mobx-react-form';
import * as validatorjs from 'validatorjs';

export class $PropertyForm extends Form {

  public plugins() {
    return {
      dvr: {
        package: validatorjs
      },
    };
  }
}

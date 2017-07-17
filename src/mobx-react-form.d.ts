declare module 'mobx-react-form' {

  interface I$RV {
    bind: Function;
    label: string;
    id: string;
    error: string;
  }

  interface ISetupRV {
    fields: any;
  }

  export class Base {

  }

  class Form {

    public error: any;

    setup(): ISetupRV;

    $(name: string): I$RV;

    onSubmit();

    onReset();

    onClear();

  }

  export default Form;
}

declare module 'mobx-react-form' {

  interface IFormOption {
    name?: any;
    options?: any;
    plugins?: any;
    bindings?: any;
    onSubmit?: any;
    onClear?: Function;
    onReset?: Function;
  }

  class Form {
    constructor(setup: any, opt?: IFormOption);
  }

  export = Form;
}

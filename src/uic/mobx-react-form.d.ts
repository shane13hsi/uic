declare module '@uic/mobx-react-form' {

  interface I$RV {
    bind: Function;
    label: string;
    id: string;
    error: string;
    isValid: boolean;
    validating: boolean;
    isPristine: boolean;
  }

  export class Base {

  }

  export class Form {

    $(name: string): I$RV;

    onSubmit();

    onReset();

    onClear();

    init(fields: any);

    fields: Map<any, any>;
  }

}

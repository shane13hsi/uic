import * as React from 'react';
import { IUISchemaToJSXProps } from './uischema-to-jsx.props';
import { isValidUISchema } from './utils';
import { replaceProps } from './utils/replace-props';
import { IUISchemaItem } from './interfaces';

export class UISchemaToJSX extends React.Component<IUISchemaToJSXProps, Readonly<{}>> {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { getComponent, uiSchema, data, handlers } = this.props;

    const renderer = uiSchema.map((item: IUISchemaItem, idx: number) => {
      const Component = getComponent(item.component);
      const nextProps = replaceProps(item.props, data, handlers);

      if (isValidUISchema(item.props.children)) {
        return (
          <Component key={idx} {...nextProps}>
            <UISchemaToJSX uiSchema={item.props.children} getComponent={getComponent}/>
          </Component>
        )
      } else {
        return (
          <Component key={idx} {...nextProps}/>
        )
      }
    });

    return <div>{renderer}</div>;
  }
}

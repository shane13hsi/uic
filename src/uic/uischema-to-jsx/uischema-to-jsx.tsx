import * as React from 'react';
import { IUISchemaToJSXProps } from './uischema-to-jsx.props';
import { isValidUISchema } from './utils';
import { replaceProps } from './utils/replace-props';
import { IUISchemaItem } from './interfaces';
import { Grid, GridItem } from '../grid-layout';

export class UISchemaToJSX extends React.Component<IUISchemaToJSXProps, Readonly<{}>> {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { getComponent, uiSchema, data, handlers, layoutSchema } = this.props;

    const renderer = uiSchema.map((item: IUISchemaItem) => {
      const Component = getComponent(item.component);
      const nextProps = replaceProps(item.props, data, handlers);

      if (isValidUISchema(item.props.children)) {
        return (
          <GridItem key={item._id}>
            <Component key={item._id} {...nextProps}>
              <UISchemaToJSX uiSchema={item.props.children} getComponent={getComponent}/>
            </Component>
          </GridItem>
        )
      } else {
        return (
          <GridItem key={item._id}>
            <Component key={item._id} {...nextProps}/>
          </GridItem>
        )
      }
    });

    return <Grid layout={
      [
        { i: "root", "x": 0, "y": 0, "w": 12, "h": 1, "static": false },
        { i: "11", "x": 0, "y": 1, "w": 12, "h": 1, "static": false },
        { i: "12", "x": 0, "y": 0, "w": 12, "h": 1, "static": false }
      ]
    }>{renderer}</Grid>
  }
}

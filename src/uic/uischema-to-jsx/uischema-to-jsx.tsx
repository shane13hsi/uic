import * as React from 'react';
import { IUISchemaToJSXProps } from './uischema-to-jsx.props';
import { isValidUISchema } from './utils';
import { replaceProps } from './utils/replace-props';
import { IUISchemaItem } from './interfaces';
import { GridItem } from '../grid-layout/grid-item';
import { Grid } from '../grid-layout/grid';
import { getLayout } from '../grid-layout/utils/get-layout';
// import { createTarget } from '../grid-layout/utils/create-target';
// const GridTarget = createTarget("grid-target");

export class UISchemaToJSX extends React.Component<IUISchemaToJSXProps, Readonly<{}>> {
  constructor(props, context) {
    super(props, context);
  }

  static contextTypes = {
    layout: React.PropTypes.object
  };

  render() {
    const { getComponent, uiSchema, parentUiSchema, data, handlers, layoutSchema } = this.props;
    const gridLayout = getLayout(parentUiSchema, layoutSchema, this.context.layout.activeGrid)

    const renderer = uiSchema.map((item: IUISchemaItem) => {
      const Component = getComponent(item.component);
      const nextProps = replaceProps(item.props, data, handlers);
      const gridKey = parentUiSchema ? parentUiSchema._id : null
      const gridItemProps = {
        key: item._id,
        itemKey: item._id,
        gridKey,
        onRemove: () => {
        }
      }

      if (isValidUISchema(item.props.children)) {
        return (
          <GridItem {...gridItemProps}>
            <Component key={item._id} {...nextProps}>
              <UISchemaToJSX uiSchema={item.props.children}
                             parentUiSchema={item}
                             layoutSchema={layoutSchema}
                             getComponent={getComponent}/>
            </Component>
          </GridItem>
        )
      } else {
        return (
          <GridItem {...gridItemProps}>
            <Component key={item._id} {...nextProps}/>
          </GridItem>
        )
      }
    });

    return <Grid {...gridLayout}>{renderer}</Grid>
  }
}

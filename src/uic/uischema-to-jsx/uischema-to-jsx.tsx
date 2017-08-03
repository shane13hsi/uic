import * as React from 'react';
import { IUISchemaToJSXProps } from './uischema-to-jsx.props';
import { isValidUISchema } from './utils';
import { replaceProps } from './utils/replace-props';
import { IUISchemaItem } from './interfaces';
import { GridItem } from '../grid-layout/grid-item';
import { Grid } from '../grid-layout/grid';
import { getLayout } from '../grid-layout/utils/get-layout';
import { createTarget } from '../grid-layout/utils/create-target';
import { lazyInject } from '../core/ioc';
import { $Canvas } from '../ide/models/$canvas';
import { bind } from 'decko';
import { $PropertyForm } from '../ide/models/$property-form';
import { $ComponentList } from '../ide/models/$component-list';
const GridTarget = createTarget("grid-target");

export class UISchemaToJSX extends React.Component<IUISchemaToJSXProps, Readonly<{}>> {

  @lazyInject($Canvas)
  private $canvas: $Canvas;

  @lazyInject($PropertyForm)
  private $propertyForm: $PropertyForm;

  @lazyInject($ComponentList)
  private $componentList: $ComponentList;

  constructor(props, context) {
    super(props, context);
  }

  static contextTypes = {
    layout: React.PropTypes.object
  };

  @bind
  handleGridChange(layout: any) {
    this.$canvas.updateLayoutSchema(layout);
  }

  @bind
  removeComponent(itemKey: string, gridKey: string) {
    this.$canvas.removeComponent(itemKey, gridKey);
  }


  render() {
    const { getComponent, uiSchema, parentUiSchema, data, handlers, layoutSchema, form } = this.props;
    const gridKey = parentUiSchema ? parentUiSchema._id : null;
    const activeGrid = this.context.layout ? this.context.layout.activeGrid : null;

    const renderer = uiSchema.map((item: IUISchemaItem, idx: number) => {
      const Component = getComponent(item.component);
      let nextProps = replaceProps(item.props, data, handlers);
      if (item.binding != null) {
        $ = form.$(item.binding).bind();
        // TODO: onChange 放到一起
        nextProps = Object.assign({}, nextProps || {}, {
          value: $.value,
          onChange: $.onChange,
          onBlur: $.onBlur
        });
      }
      const gridItemProps = {
        key: item._id || idx,
        itemKey: item._id || idx,
        gridKey,
        onRemove: (itemKey, gridKey) => {
          this.removeComponent(itemKey, gridKey)
        },
        onClick1: () => {
          const propsSchema = this.$componentList.propsSchemaMap.get(item.component);
          this.$propertyForm.setForm(item._id, propsSchema, item.props);
        }
      };

      if (isValidUISchema(item.props.children)) {
        return (
          <GridItem {...gridItemProps}>
            <Component key={item._id || idx} {...nextProps}>
              <UISchemaToJSX uiSchema={item.props.children}
                             parentUiSchema={item}
                             layoutSchema={layoutSchema}
                             form={form}
                             getComponent={getComponent}/>
            </Component>
          </GridItem>
        )
      } else {
        return (
          <GridItem {...gridItemProps}>
            <Component key={item._id || idx} {...nextProps}>
              {item.props.children && Array.isArray(item.props.children) ? <GridTarget targetKey={item._id}/> : null}
            </Component>
          </GridItem>
        )
      }
    });

    return parentUiSchema && this.context.layout ? (
      <GridTarget targetKey={gridKey}>
        <Grid {...getLayout(parentUiSchema, layoutSchema, activeGrid)}
              gridKey={gridKey}
              onChange={this.handleGridChange}>{renderer}</Grid>
      </GridTarget>
    ) : (<Grid {...getLayout(parentUiSchema, layoutSchema, activeGrid)}
               gridKey={gridKey}
               onChange={this.handleGridChange}>{renderer}</Grid>)
  }
}

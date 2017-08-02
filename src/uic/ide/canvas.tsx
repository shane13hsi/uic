import * as React from 'react';
import { GridLayoutContext } from '../grid-layout/grid-layout-context';
import { observer } from 'mobx-react';
import { UISchemaToJSX } from '../uischema-to-jsx/uischema-to-jsx';
import { $Canvas } from './models/$canvas';
import { lazyInject } from '../core/ioc';
import { GLApp } from './gl-app';
import { toJS } from 'mobx';
import { getComponent } from './get-component';

@observer
export class Canvas extends React.Component<{}, {}> {

  @lazyInject($Canvas)
  private _$canvas: $Canvas;

  public render() {
    const uiSchema = this._$canvas.activeUISchema;
    const layoutSchema = this._$canvas.activeLayoutSchema;
    if (!GLApp.instance.isInitialised()) {
      return <div/>
    }
    return (
      <GridLayoutContext>
        <UISchemaToJSX uiSchema={toJS(uiSchema)}
                       layoutSchema={toJS(layoutSchema)}
                       getComponent={getComponent}/>
      </GridLayoutContext>
    )
  }
}

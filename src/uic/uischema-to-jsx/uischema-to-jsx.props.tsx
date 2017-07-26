import * as React from 'react';
import { IHandlers, IUISchemaItem } from './interfaces';

/**
 * IResolveUIProps
 *
 */
export interface IUISchemaToJSXProps {
  /**
   * uiSchema
   */
  uiSchema?: IUISchemaItem[];

  parentUiSchema?: IUISchemaItem[];

  layoutSchema?: any;

  /**
   * 根据 component 名称获取 React Class
   *
   * @param string component 名称
   */
  getComponent?: (string) => React.ComponentClass<any>;

  /**
   * handlers
   */
  handlers?: IHandlers;

  /**
   * data
   */
  data?: any;
}

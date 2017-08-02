import * as React from 'react';

export type IHandlers = { [key: string]: Function }

export type IReactProps = {
  children?: IUISchemaItem[];
};

/**
 * IUISchemaField
 *
 */
export interface IUISchemaItem {

  /**
   * 如果没有 layout 需求，可不必须
   */
  _id?: string;
  /**
   * component 名称
   *
   */
  component: string;

  /**
   * 是否隐藏，可以使用布尔值或者 @method()
   *
   */
  hidden?: boolean | string;

  /**
   * 属性
   *
   */
  props: any & IReactProps;
}

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
  props: IReactProps;
}

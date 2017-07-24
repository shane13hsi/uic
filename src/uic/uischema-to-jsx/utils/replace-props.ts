import {
  extractCallback,
  extractImmediateFunction,
  extractState,
  isCallback,
  isImmediateFunction,
  isState
} from './index';
import { IHandlers, IReactProps } from '../interfaces';
var get = require('lodash.get');
var toPath = require('lodash.topath');
var reduce = require('lodash.reduce');

function processValue(value: string, data: any, handlers: IHandlers): any {
  if (isImmediateFunction(value)) {
    const methodKey = extractImmediateFunction(value);
    return methodKey ? handlers[methodKey]() : value;
  }
  else if (isCallback(value)) {
    const methodKey = extractCallback(value);
    return methodKey ? handlers[methodKey] : value;
  }
  else if (isState(value)) {
    const stateKey = extractState(value);
    return get(data, toPath(stateKey))
  }
  else {
    return value;
  }
}

/**
 * 替换 props string mark 为真实的 data 和 handlers
 *
 * @param props
 * @param data
 * @param handlers
 * @returns {{}}
 */
export function replaceProps(props: IReactProps, data: any, handlers: IHandlers): IReactProps {
  const n = reduce(props, (acc: any, value: string, key: string) => {
    if (key === 'children') {
      return acc;
    }
    // todo: 暂时注释
    // if (isState(value)) {
    //   acc["$$state"] = extractState(value);
    // }
    acc[key] = processValue(value, data, handlers);
    return acc;
  }, {});

  return n;
}

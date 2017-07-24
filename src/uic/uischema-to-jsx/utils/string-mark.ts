import { isString } from 'lodash';

export function isState(value: string): boolean {
  if (isString(value) && value.startsWith("$")) {
    return true;
  }
}

export function extractState(value: string): string {
  return value && value.length > 0 ? value.slice(1) : null;
}

export function isCallback(value: string): boolean {
  if (isString(value)
    && value.startsWith("@") && !value.endsWith('()')) {
    return true;
  }
}

export function extractCallback(value: string): string {
  return value.slice(1);
}

export function isImmediateFunction(value: string): boolean {
  if (isString(value)
    && value.startsWith("@") && value.endsWith('()')) {
    return true;
  }
}

export function extractImmediateFunction(value: string): string {
  return value.slice(1, value.length - 2);
}

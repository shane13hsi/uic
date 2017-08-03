import { findIndex, get, isEmpty, merge } from 'lodash';
import { IUISchemaItem } from '../../uischema-to-jsx/interfaces';

// calculate the children's layout
export function getLayout(uiSchema: IUISchemaItem, layoutSchema: any, activeGrid?: string) {
  if (!uiSchema) {
    return { layout: [getLayoutByKey(layoutSchema, 'root', true)] }
  }
  const { props } = uiSchema;
  const { children } = props;
  if (children && Array.isArray(children)) {
    let layout = children.map(item => {
      return getLayoutByKey(layoutSchema, item._id, activeGrid !== uiSchema._id)
    });

    return Object.assign({ layout });
  } else {
    return {}
  }
}

function getLayoutByKey(layoutSchema, key, isStatic) {
  const index = findIndex(layoutSchema, { i: key });
  if (index === -1) {
    return { x: 0, y: 0, w: 12, h: 1, static: isStatic, i: key }
  } else {
    return merge({}, layoutSchema[index], { static: isStatic })
  }
}

import { get, isEmpty, merge } from 'lodash';
import { IUISchemaItem } from '../../uischema-to-jsx/interfaces';

// calculate the children's layout
export function getLayout(uiSchema: IUISchemaItem, layoutSchema: any, activeGrid?: string) {
  const { props } = uiSchema;
  const { children } = props;
  let recalc = false;
  let recalcBase: any = {};
  let recalcOffset = 0;
  if (children && Array.isArray(children)) {
    let layout = children.map(item => {
      if (isEmpty(layoutSchema[item._id])) {
        return { x: 0, y: 0, w: 12, h: 1, static: activeGrid !== uiSchema._id, i: item._id }
      }
      let originHeight: number = get<any, number>(layoutSchema, [item._id, 'layout', 'h']);
      let resolvedHeight = getChildrenHeight(item, layoutSchema);
      if (resolvedHeight > originHeight) {
        recalc = true;
        recalcBase = merge({}, layoutSchema[item._id].layout, { h: resolvedHeight, i: item._id });
        recalcOffset = resolvedHeight - originHeight
      }
      return merge({}, get(layoutSchema, [item._id, 'layout']), {
        h: Math.max(resolvedHeight, layoutSchema[item._id].layout.h),
        // h: resolvedHeight || layoutSchema[item._id].layout.h,
        i: item._id,
        "static": activeGrid !== uiSchema._id
      })
    });

    if (recalc) {
      let newLayout = layout.map((item: any) => {
        // 在下方受影响 后面要添加上x轴的判断
        if ((item.y <= recalcBase.y + recalcBase.h + 1) && (item.y > recalcBase.y) && (item.i !== recalcBase.i)) {
          return merge({}, item, { y: item.y + recalcOffset })
        } else {
          return item
        }
      });
      return Object.assign({ layout: newLayout }, get(layoutSchema, `${uiSchema._id}.options`));
    } else {
      return Object.assign({ layout }, get(layoutSchema, `${uiSchema._id}.options`));
    }
  } else {
    return {}
  }
}

// calculate self's width and height
function getChildrenHeight(uiSchema: IUISchemaItem, layoutSchema: any) {
  let maxH = 0;
  const { props } = uiSchema;
  const { children } = props;
  if (children && Array.isArray(children)) {
    children.forEach(item => {
      const layout: any = get<any, any>(layoutSchema, [item._id, 'layout']) || {};
      if (layout.h + layout.y >= maxH) {
        maxH = layout.h + layout.y
      }
    })
  }
  return maxH
}

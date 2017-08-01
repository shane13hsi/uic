import { action, extendObservable, observable, toJS } from 'mobx';
import { provide } from '../../core/ioc';
import { remove } from 'lodash';
import { db } from '../db/pouchdb';

function InputSchema() {
  return {
    "_id": String(Date.parse(new Date().toISOString())),
    "component": "Card",
    "props": {
      "children": []
    }
  }
}

@provide($Canvas)
export class $Canvas {

  @observable activeId: string;
  @observable uiSchemaMap = new Map<string, any>();
  @observable layoutSchemaMap = new Map<string, any>();

  @action
  initMapFromLS(map) {
    for (let [key, _] of map) {
      this.uiSchemaMap.set(key, undefined);
    }
  }

  @action
  setActiveId(activeId) {
    this.activeId = activeId;
  }

  @action
  async loadUISchema(id: string) {
    await db.createIndex({
      index: { fields: ['type', 'pageId'] },
      ddoc: "my-index-design-doc"
    });
    const rtv = await db.find({
      selector: {
        type: 'uiSchema',
        pageId: id
      },
      use_index: "my-index-design-doc"
    });
    this.uiSchemaMap.set(id, rtv.docs[0] || {
        data: [{
          "_id": "root",
          "component": "Board",
          "props": {
            "children": []
          }
        }]
      });
  }

  @action
  async loadLayoutSchema(id: string) {
    await db.createIndex({
      index: { fields: ['type', 'pageId'] },
      ddoc: "my-index-design-doc"
    });
    const rtv = await db.find({
      selector: {
        type: 'layoutSchema',
        pageId: id
      },
      use_index: "my-index-design-doc"
    });
    // TODO: layoutSchema 可不传兼容
    this.layoutSchemaMap.set(id, rtv.docs[0] || {
        data: {
          root: {
            layout: {
              x: 0, y: 0, w: 12, h: 1
            }
          }
        }
      });
  }

  @action
  async updateLayoutSchema(layout: any[]) {
    let layoutSchemaDoc: any = this.layoutSchemaMap.get(this.activeId);

    if (Array.isArray(layout)) {
      layout.forEach(l => {
        const { x, y, w, h, i } = l;
        // data 空则初始化
        if (layoutSchemaDoc.data[i] == null) {
          extendObservable(layoutSchemaDoc.data, {
            [i]: {
              layout: {}
            }
          });
        }

        // 更新 layout
        extendObservable(layoutSchemaDoc.data[i].layout, {
          x, y, w, h, "static": l.static
        });

      })
    }

    try {
      const res = await db.put(toJS(layoutSchemaDoc));
      // 更新 _rev
      layoutSchemaDoc._rev = res.rev;

      this.layoutSchemaMap.set(this.activeId, layoutSchemaDoc);
    } catch (e) {
      // TODO: 更优的 pouchdb 更新
    }
  }

  @action
  async addComponent(schema, target) {
    let uiSchemaDoc = this.uiSchemaMap.get(this.activeId);
    let nodeToAdd = findNodeOfTree(uiSchemaDoc.data, target);
    nodeToAdd.props.children.push(schema);

    try {
      const res = await db.put(toJS(uiSchemaDoc));
      uiSchemaDoc._rev = res.rev;
      this.uiSchemaMap.set(this.activeId, uiSchemaDoc);
    } catch (e) {
    }
  }

  @action
  async removeComponent(itemKey, gridKey) {
    let uiSchemaDoc = this.uiSchemaMap.get(this.activeId);
    let grid = findNodeOfTree(uiSchemaDoc.data, gridKey);
    let gridChildren = grid.props.children;
    remove(gridChildren, (i: any) => i._id === itemKey);
    try {
      const res = await db.put(toJS(uiSchemaDoc));
      uiSchemaDoc._rev = res.rev;
      this.uiSchemaMap.set(this.activeId, uiSchemaDoc);
    } catch (e) {
    }
  }
}

function findNodeOfTree(tree, id) {
  if (!tree) {
    return {}
  }

  for (let i = 0; i < tree.length; i++) {
    if (tree[i]._id === id) {
      return tree[i]
    } else if (tree[i].props.children && tree[i].props.children.length > 0) {
      if (findNodeOfTree(tree[i].props.children, id)) {
        return findNodeOfTree(tree[i].props.children, id)
      }
    }
  }
}

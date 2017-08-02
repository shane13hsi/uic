import { action, observable, toJS } from 'mobx';
import { provide } from '../../core/ioc';
import * as _ from 'lodash';
import { findIndex, remove } from 'lodash';
import { db } from '../db/pouchdb';
import * as uuidv4 from 'uuid/v4';

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
        data: [
          { x: 0, y: 0, w: 12, h: 1, i: "root" }
        ]
      });
  }

  @action
  async updateLayoutSchema(layout: any[]) {
    let layoutSchemaDoc: any = this.layoutSchemaMap.get(this.activeId);

    if (Array.isArray(layout)) {
      layout.forEach(l => {
        const { x, y, w, h, i } = l;
        const index = findIndex(layoutSchemaDoc.data, { i })
        if (index > -1) {
          layoutSchemaDoc.data[index] = {
            x, y, w, h, i, "static": l.static
          }
        } else {
          layoutSchemaDoc.data.push({
            x, y, w, h, i, "static": l.static
          })
        }
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
    let layoutSchemaDoc: any = this.layoutSchemaMap.get(this.activeId);
    let nodeToAdd = findNodeOfTree(uiSchemaDoc.data, target);
    const uuid = uuidv4()
    nodeToAdd.props.children.push(_.assign({}, schema, { _id: uuid }));
    layoutSchemaDoc.data.push({
      x: 0, y: 0, w: 12, h: 1, i: uuid, "static": false
    })

    try {
      const res = await db.put(toJS(uiSchemaDoc));
      uiSchemaDoc._rev = res.rev;
      this.uiSchemaMap.set(this.activeId, uiSchemaDoc);
    } catch (e) {
    }

    try {
      const res = await db.put(toJS(layoutSchemaDoc));
      layoutSchemaDoc._rev = res.rev;
      this.layoutSchemaMap.set(this.activeId, layoutSchemaDoc);
    } catch (e) {
    }
  }

  @action
  async removeComponent(itemKey, gridKey) {
    let uiSchemaDoc = this.uiSchemaMap.get(this.activeId);
    let layoutSchemaDoc: any = this.layoutSchemaMap.get(this.activeId);
    let grid = findNodeOfTree(uiSchemaDoc.data, gridKey);
    let gridChildren = grid.props.children;
    remove(gridChildren, (i: any) => i._id === itemKey);
    remove(layoutSchemaDoc.data, (layout: any) => layout.id === itemKey)

    try {
      const res = await db.put(toJS(uiSchemaDoc));
      uiSchemaDoc._rev = res.rev;
      this.uiSchemaMap.set(this.activeId, uiSchemaDoc);
    } catch (e) {
    }

    try {
      const res = await db.put(toJS(layoutSchemaDoc));
      layoutSchemaDoc._rev = res.rev;
      this.layoutSchemaMap.set(this.activeId, layoutSchemaDoc);
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

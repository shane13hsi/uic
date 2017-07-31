import { action, computed, observable } from 'mobx';
import { provide } from '../../core/ioc';
import { set } from 'lodash';
import { db } from '../db/pouchdb';

function InputSchema() {
  return {
    "_id": String(Date.parse(new Date().toISOString())),
    "component": "Rate",
    "props": {
      "allowHalf": true,
      "defaultValue": 1
    }
  }
}

@provide($Canvas)
export class $Canvas {

  @observable activeId: string;
  @observable uiSchemaMap = new Map<string, any>();
  @observable layoutSchemaMap = new Map<string, any>();

  @computed get activeUISchema() {
    return this.uiSchemaMap.get(this.activeId);
  }

  @computed get activeLayoutSchema() {
    return this.layoutSchemaMap.get(this.activeId);
  }

  @action
  initMap(map) {
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

    this.uiSchemaMap.set(id, rtv.docs[0].data);
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

    this.layoutSchemaMap.set(id, rtv.docs[0].data);
  }

  @action
  updateLayoutSchema(layout: any[]) {
    let layoutSchema: any = this.activeLayoutSchema;

    console.log(layout)

    if (Array.isArray(layout)) {
      layout.forEach(l => {
        const { x, y, w, h, i } = l;
        set(layoutSchema, `${i}.layout`, { x, y, w, h, "static": l.static })
      })
    }

    this.layoutSchemaMap.set(this.activeId, layoutSchema);
  }

  @action
  async init(map: Map<string, string>, activeId) {
    this.initMap(map);
    this.setActiveId(activeId);
    await this.loadUISchema(activeId);
    await this.loadLayoutSchema(activeId);
    return;
  }

  @action
  addComponent(type, target) {
    let schema = this.activeUISchema
    schema[0].props.children.push(InputSchema());
    this.uiSchemaMap.set(this.activeId, schema);
  }
}

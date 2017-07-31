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
  @observable layoutMap = new Map<string, any>();

  @computed get activeUISchema() {
    return this.uiSchemaMap.get(this.activeId);
  }

  @computed get activeLayoutSchema() {
    return this.layoutMap.get(this.activeId);
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
    // TODO: 暂时不清楚 no-sql 存储 list 的好方法
    const doc = await db.get(`uiSchema/${id}`);
    this.uiSchemaMap.set(id, doc.uiSchema);
  }

  @action
  async loadLayoutSchema(id: string) {
    const doc = await db.get(`layoutSchema/${id}`);
    this.layoutMap.set(id, doc.layoutSchema);
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

    this.layoutMap.set(this.activeId, layoutSchema);
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

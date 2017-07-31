import { action, computed, extendObservable, observable, toJS } from 'mobx';
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

  @computed get currentUISchema() {
    if (this.uiSchemaMap.get(this.activeId) != null) {
      return this.uiSchemaMap.get(this.activeId).data;
    } else {
      return undefined;
    }
  }

  @computed get currentLayoutSchema() {
    if (this.layoutSchemaMap.get(this.activeId) != null) {
      return this.layoutSchemaMap.get(this.activeId).data;
    } else {
      return undefined;
    }
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

    this.uiSchemaMap.set(id, rtv.docs[0]);
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

    this.layoutSchemaMap.set(id, rtv.docs[0]);
  }

  @action
  async updateLayoutSchema(layout: any[]) {
    let layoutSchemaDoc: any = this.layoutSchemaMap.get(this.activeId);
    console.log(layoutSchemaDoc._rev);

    if (Array.isArray(layout)) {
      layout.forEach(l => {
        const { x, y, w, h, i } = l;
        if (layoutSchemaDoc.data[i] == null) {
          extendObservable(layoutSchemaDoc.data, {
            i: {
              layout: {}
            }
          });
        }

        extendObservable(layoutSchemaDoc.data[i].layout, {
          x, y, w, h, "static": l.static
        });

      })
    }

    try {
      const res = await db.put(toJS(layoutSchemaDoc));
      layoutSchemaDoc._rev = res.rev;
      console.log(layoutSchemaDoc._rev);
      this.layoutSchemaMap.set(this.activeId, layoutSchemaDoc);
    } catch (e) {
    }
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
    let uiSchemaDoc = this.uiSchemaMap.get(this.activeId);
    uiSchemaDoc[0].props.children.push(InputSchema());
    this.uiSchemaMap.set(this.activeId, uiSchemaDoc);
  }
}

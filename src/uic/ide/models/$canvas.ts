import { action, computed, observable } from 'mobx';
import { provide } from '../../core/ioc';
import { set } from 'lodash';

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
  @observable map = new Map<string, any>();
  @observable layoutMap = new Map<string, any>();

  @computed get activeUISchema() {
    return this.map.get(this.activeId);
  }

  @computed get activeLayoutSchema() {
    return this.layoutMap.get(this.activeId);
  }

  @action
  initMap(map) {
    for (let [key, value] of map) {
      this.map.set(key, undefined);
    }
  }

  @action
  setActiveId(activeId) {
    this.activeId = activeId;
  }

  @action
  loadUISchema(id: string) {
    this.map.set(id, [
      {
        "_id": "root",
        "component": "Card",
        "props": {
          "title": "测试拖动布局",
          "children": [
            {
              "_id": "11",
              "component": "Rate",
              "props": {
                "allowHalf": true,
                "defaultValue": 3.5
              }
            },
            {
              "_id": "12",
              "component": "Rate",
              "props": {
                "defaultValue": 4,
              }
            }
          ]
        }
      }
    ]);
  }

  @action
  loadLayoutSchema(id: string) {
    this.layoutMap.set(id, {
      "root": {
        "layout": { "x": 0, "y": 0, "w": 12, "h": 4, "static": true },
        "options": { "padding": [10, 10], "margin": [0, 10] }
      }
    })
  }

  @action
  updateLayoutSchema(layout: any) {
    let layoutSchema = this.activeLayoutSchema
    if (layout && Array.isArray(layout)) {
      layout.forEach(l => {
        const { x, y, w, h, i } = l;
        set(layoutSchema, `${i}.layout`, { x, y, w, h, "static": l.static })
      })
    }
    this.layoutMap.set(this.activeId, layoutSchema);
  }

  @action
  init(map: Map<string, string>, activeId) {
    this.initMap(map);
    this.setActiveId(activeId);
    this.loadUISchema(activeId);
    this.loadLayoutSchema(activeId);
  }

  @action
  addComponent(type, target) {
    let schema = this.activeUISchema
    schema[0].props.children.push(InputSchema())
    this.map.set(this.activeId, schema);
  }
}

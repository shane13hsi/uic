import { provide } from '../../core/ioc';
import { action, computed, observable } from 'mobx';
import { db } from '../db/pouchdb';
import * as _ from 'lodash';

export interface IComponent {
  groupId: number;
  name: string;
  thumbUrl: string;
  title: string;
  intro: string;
  schema: any;
}

export interface IComponent2 {
  groupId: number;
  groupName: string;
  value: IComponent[];
}


@provide($ComponentList)
export class $ComponentList {

  @observable private componentList = [];
  @observable private _activeKey;
  @observable private _initialised: boolean;

  @action
  async load(id: string = 'componentList') {
    const doc = await db.get(id);
    this._initialised = true;
    this.componentList = doc.data;
  }

  @action
  changeActiveKey(key: string) {
    this._activeKey = key;
  }

  @computed
  public get listByGroup(): IComponent2[] {
    return _.chain(this.componentList)
      .groupBy(item => item.groupId)
      .map((value, key) => ({
        groupId: value[0].groupId,
        groupName: value[0].groupName,
        value: value
      }))
      .value();
  }

  @computed
  public get activeKey(): string[] {

    if (!this._initialised) {
      return []
    }

    if (this._activeKey != null) {
      return this._activeKey;
    }

    // activeKey 未设置且有请求到值
    if (this.listByGroup.length > 0) {
      return [String(this.listByGroup[0].groupId)]
    } else {
      return [];
    }
  }
}

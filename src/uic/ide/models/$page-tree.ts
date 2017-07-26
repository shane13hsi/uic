import { action, observable } from 'mobx';
import { db } from '../db/pouchdb';
import { provide } from '../../core/ioc';

@provide($PageTree)
export class $PageTree {

  @observable pageTree = [];

  @action
  async loadPageTree(id: string) {
    const doc = await db.get(id);
    this.pageTree = doc.pageList;
  }
}

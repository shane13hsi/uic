import { action, observable } from 'mobx';
import { db } from '../db/pouchdb';
import { provide } from '../../core/ioc';

@provide($PageTree)
export class $PageTree {

  @observable public pageTree = [];

  @action
  public async load(id: string = 'pageList') {
    const doc = await db.get(id);
    this.pageTree = doc.pageList;
  }
}

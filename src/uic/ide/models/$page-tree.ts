import { action, observable } from 'mobx';
import { db } from '../db/pouchdb';
import { provide } from '../../core/ioc';

@provide($PageTree)
export class $PageTree {

  @observable pageTree = [];

  @action
  loadPageTree(id: string) {
    db.get(id).then((doc: any) => {
      this.pageTree = doc.pageList;
    });
  }
}

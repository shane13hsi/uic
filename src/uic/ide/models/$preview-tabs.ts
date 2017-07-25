import { action, computed, observable } from 'mobx';
import { provide } from '../../core/ioc';

@provide($PreviewTabs)
export class $PreviewTabs {

  @observable tabs = new Map();

  @observable activeTabId: string;

  @computed get activeTabTitle() {
    return this.tabs.get(this.activeTabId);
  }

  @action
  handleClickPage(id, name) {
    this.activeTabId = id;
    this.tabs.set(id, name);
  }
}

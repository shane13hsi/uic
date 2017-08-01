import { provide } from '../../core/ioc';

export interface $IGLApp {

  /**
   * 获得当前 config
   */
  getConfig(): any;

  /**
   * 保存 golden layout 的 config
   *
   * @param config
   */
  saveConfigState(config: any): void;

  /**
   * 获取当前 canvas tabs
   */
  getCanvasTabs(): Map<string, string>;

  /**
   * 删除 canvas tabs
   * @param id
   */
  removeCanvasTab(id: string): void;

  /**
   * 新增/更新 canvas tab
   *
   * @param id
   * @param title
   */
  setCanvasTab(id: string, title: string): void;
}

const defaultConfig = require('./gl-layout-default-config.json');

// TODO: 放到 Pouchdb 里，等 reset 功能做好后
@provide($GLApp)
export class $GLApp implements $IGLApp {

  private static readonly LAYOUT_KEY = '$$uic_ide_layout';
  private static readonly CANVAS_TABS_KEY = '$$uic_ide_canvas_tabs';

  public getConfig(): any {
    const state = localStorage.getItem($GLApp.LAYOUT_KEY);
    return state == null ? defaultConfig : JSON.parse(state);
  }

  public saveConfigState(config: any): void {
    localStorage.setItem($GLApp.LAYOUT_KEY, config);
  }

  public getCanvasTabs(): Map<string, string> {
    let state: string = localStorage.getItem($GLApp.CANVAS_TABS_KEY);
    let aMap: Map<string, string> = state == null ? new Map() : new Map(JSON.parse(state));
    return aMap;
  }

  public removeCanvasTab(id: string): void {
    const aMap = this.getCanvasTabs();
    aMap.delete(id);
    localStorage.setItem($GLApp.CANVAS_TABS_KEY, JSON.stringify([...aMap]));
  }

  public setCanvasTab(id: string, title: string): void {
    const aMap = this.getCanvasTabs();
    aMap.set(id, title);
    // http://2ality.com/2015/08/es6-map-json.html
    localStorage.setItem($GLApp.CANVAS_TABS_KEY, JSON.stringify([...aMap]));
  }
}

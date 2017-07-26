declare var require: any;

import * as GoldenLayout from 'golden-layout';
import { Canvas } from './canvas';
import { PropertyForm } from './property-form';
import { PageTree } from './page-tree';
import { ComponentsList } from './components-list';

const LAYOUT_KEY = '$$uic_ide_layout';
const CANVAS_TABS_KEY = '$$uic_ide_canvas_tabs';

const defaultConfig = require('./models/gl-layout-default-config.json');

const singleton = Symbol();
const singletonEnforcer = Symbol();

/**
 * 不使用 React 结合的方式，使用 singleton
 *
 * Bug of inversify with golden-layout,
 * manully implement a singleton pattern
 *
 * 猜测是因为 golden-layout 的实现方式导致的
 *
 */
export class GLApp {
  private glLayout: GoldenLayout & any;

  constructor(enforcer) {
    if (enforcer != singletonEnforcer) throw "Cannot construct singleton";
  }

  // https://stackoverflow.com/questions/26205565/converting-singleton-js-objects-to-use-es6-classes
  static get instance(): GLApp {
    if (!this[singleton]) {
      this[singleton] = new GLApp(singletonEnforcer);
    }
    return this[singleton];
  }

  public init() {
    if (this.glLayout == null) {
      this.glLayout = new GoldenLayout(this.config, $('#golden-layout'));

      this.glLayout.registerComponent('Canvas', Canvas);
      this.glLayout.registerComponent('PropertyForm', PropertyForm);
      this.glLayout.registerComponent('PageTree', PageTree);
      this.glLayout.registerComponent('ComponentsList', ComponentsList);

      this.glLayout.init();
      this.hackMaxmizeOfStack();

      this.glLayout.on('stateChanged', () => {
        this.saveState(JSON.stringify(this.glLayout.toConfig()));
      });

      this.glLayout.on('itemDestroyed', (a) => {
        this.removeCanvasMap(a.config.id);
        this.hackMaxmizeOfStack();
      });

      this.glLayout.on('itemCreated', () => {
        this.hackMaxmizeOfStack(true);
      });
    }
  }

  /**
   * stack 没有 items 的时候，maxmize 的行为不对
   * 暂收 hack 掉
   *
   * @param force itemCreated 的时全部显示（DOM 慢）
   */
  private hackMaxmizeOfStack(force?: boolean) {
    for (let item of $('.lm_stack')) {
      // 有 items，则显示
      if ($(item).find('.lm_items').children().length !== 0 || force) {
        $(item).find('.lm_maximise').show()
      } else { // 则隐藏
        $(item).find('.lm_maximise').hide()
      }
    }
  }

  private saveState(state) {
    localStorage.setItem(LAYOUT_KEY, state);
  }

  private get config() {
    const state = localStorage.getItem(LAYOUT_KEY);
    return state == null ? defaultConfig : JSON.parse(state);
  }

  private getCanvasMap(): Map<string, string> {
    let state: string = localStorage.getItem(CANVAS_TABS_KEY);
    let aMap: Map<string, string> = state == null ? new Map() : new Map(JSON.parse(state));
    return aMap;
  }

  private setCanvasMap(id: string, title: string) {
    const aMap = this.getCanvasMap();
    aMap.set(id, title);
    // http://2ality.com/2015/08/es6-map-json.html
    localStorage.setItem(CANVAS_TABS_KEY, JSON.stringify([...aMap]));
  }

  private removeCanvasMap(id: string) {
    const aMap = this.getCanvasMap();
    aMap.delete(id);
    localStorage.setItem(CANVAS_TABS_KEY, JSON.stringify([...aMap]));
  }

  /**
   *
   * @param id
   * @param title
   */
  public addOrSetActiveWithinCanvas(id: string, title: string) {
    const canvas = this.glLayout.root.getItemsById('canvas')[0];

    if (this.getCanvasMap().get(id) != null) {
      const oldChild = canvas.getItemsById(id)[0];
      // 如果 title 变了
      if (this.getCanvasMap().get(id) != title) {
        this.setCanvasMap(id, title);
        oldChild.setTitle(title);
      }
      // set active
      canvas.setActiveContentItem(canvas.getItemsById(id)[0]);
    } else {
      // add
      this.setCanvasMap(id, title);
      canvas.addChild({
        id: id, // id 为设置 active 用
        title: title,
        type: 'react-component',
        component: 'Canvas'
      });
    }
  }
}

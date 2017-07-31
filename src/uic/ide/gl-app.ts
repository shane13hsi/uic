import * as GoldenLayout from 'golden-layout';
import { Canvas } from './canvas';
import { PropertyForm } from './property-form';
import { PageTree } from './page-tree';
import { ComponentsList } from './components-list';
import { lazyInject } from '../core/ioc';
import { $Canvas } from './models/$canvas';
import { runInAction } from 'mobx';

// TODO: 放到 Pouchdb 里
const LAYOUT_KEY = '$$uic_ide_layout';
const CANVAS_TABS_KEY = '$$uic_ide_canvas_tabs';

const defaultConfig = require('./models/gl-layout-default-config.json');

const singleton = Symbol();
const singletonEnforcer = Symbol();

type GoldenLayout2 = GoldenLayout & { on: any };

/**
 * 不使用 React 结合的方式，使用 singleton
 *
 * Bug of inversify with golden-layout,
 * manully implement a singleton pattern
 *
 * 猜测是因为 golden-layout 的实现方式导致的
 */
export class GLApp {

  @lazyInject($Canvas)
  private $canvas: $Canvas;

  public glLayout: GoldenLayout2;

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
      this.glLayout = (new GoldenLayout(this.config, '#golden-layout')) as GoldenLayout2;

      this.glLayout.registerComponent('Canvas', Canvas);
      this.glLayout.registerComponent('PropertyForm', PropertyForm);
      this.glLayout.registerComponent('PageTree', PageTree);
      this.glLayout.registerComponent('ComponentsList', ComponentsList);

      this.glLayout.init();


      $(window).resize(() => {
        this.glLayout.updateSize()
      });

      this.glLayout.on('stateChanged', () => {
        if (this.glLayout.isInitialised) {
          this.saveState(JSON.stringify(this.glLayout.toConfig()));
        }
      });

      this.glLayout.on('itemDestroyed', (a) => {
        this.removeCanvasMap(a.config.id);
      });

      this.glLayout.on('initialised', () => {
        const canvas = this.getCanvasContentItem();

        canvas.on('activeContentItemChanged', (a) => {
          const id = a.config.id;
          runInAction(() => {
            this.$canvas.setActiveId(id);
            this.$canvas.loadUISchema(id);
            this.$canvas.loadLayoutSchema(id);
          });
        });

        const item = canvas.getActiveContentItem();

        if (item == null) {
          return;
        }

        let id = Array.isArray(item.config.id) ? item.config.id[0] : item.config.id;

        // 更新 $canvas map
        runInAction(() => {
          this.$canvas.initMapFromLS(this.getCanvasTabsFromLS());
          this.$canvas.setActiveId(id);
          this.$canvas.loadUISchema(id);
          this.$canvas.loadLayoutSchema(id);
        });

      });
    }
  }

  private saveState(state) {
    localStorage.setItem(LAYOUT_KEY, state);
  }

  private get config() {
    const state = localStorage.getItem(LAYOUT_KEY);
    return state == null ? defaultConfig : JSON.parse(state);
  }

  private getCanvasTabsFromLS(): Map<string, string> {
    let state: string = localStorage.getItem(CANVAS_TABS_KEY);
    let aMap: Map<string, string> = state == null ? new Map() : new Map(JSON.parse(state));
    return aMap;
  }

  private setCanvasMap(id: string, title: string) {
    const aMap = this.getCanvasTabsFromLS();
    aMap.set(id, title);
    // http://2ality.com/2015/08/es6-map-json.html
    localStorage.setItem(CANVAS_TABS_KEY, JSON.stringify([...aMap]));
  }

  private removeCanvasMap(id: string) {
    const aMap = this.getCanvasTabsFromLS();
    aMap.delete(id);
    localStorage.setItem(CANVAS_TABS_KEY, JSON.stringify([...aMap]));
  }

  private getCanvasContentItem() {
    const canvas = this.glLayout.root.getItemsById('canvas')[0];
    return canvas;
  }

  /**
   *
   * @param id
   * @param title
   */
  public addOrSetActiveWithinCanvas(id: string, title: string) {
    const canvas = this.getCanvasContentItem();

    if (this.getCanvasTabsFromLS().get(id) != null) {
      const oldChild = canvas.getItemsById(id)[0];
      // 如果 title 变了
      if (this.getCanvasTabsFromLS().get(id) != title) {
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

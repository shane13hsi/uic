import * as GoldenLayout from 'golden-layout';
import { Canvas } from './canvas';
import { PropertyForm } from './property-form';
import { PageTree } from './page-tree';
import { ComponentList } from './component-list';
import { lazyInject } from '../core/ioc';
import { $Canvas } from './models/$canvas';
import { runInAction } from 'mobx';
import { $GLApp, $IGLApp } from './models/$gl-app';

type GoldenLayout2 = GoldenLayout & { on: any };

// https://stackoverflow.com/questions/26205565/converting-singleton-js-objects-to-use-es6-classes
const singleton = Symbol();
const singletonEnforcer = Symbol();

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

  @lazyInject($GLApp)
  private $glApp: $IGLApp;

  public glLayout: GoldenLayout2;

  constructor(enforcer) {
    if (enforcer != singletonEnforcer) throw "Cannot construct singleton";
  }

  static get instance(): GLApp {
    if (!this[singleton]) {
      this[singleton] = new GLApp(singletonEnforcer);
    }
    return this[singleton];
  }

  public init() {
    if (this.glLayout == null) {
      this.glLayout = (new GoldenLayout(this.$glApp.getConfig(), '#golden-layout')) as GoldenLayout2;

      // 注册 components
      this.glLayout.registerComponent('Canvas', Canvas);
      this.glLayout.registerComponent('PropertyForm', PropertyForm);
      this.glLayout.registerComponent('PageTree', PageTree);
      this.glLayout.registerComponent('ComponentsList', ComponentList);

      this.glLayout.init();

      // 注册 event handlers
      $(window).resize(() => {
        this.glLayout.updateSize()
      });

      // 保存 config
      this.glLayout.on('stateChanged', () => {
        if (this.glLayout.isInitialised) {
          this.$glApp.saveConfigState(JSON.stringify(this.glLayout.toConfig()));
        }
      });


      this.glLayout.on('initialised', () => {
        const canvas = this.getCanvasContentItem();

        // 删除 canvas tabs
        canvas.on('itemDestroyed', (a) => {
          this.$glApp.removeCanvasTab(a.origin.config.id);
        });

        // 激活 tab 变化
        canvas.on('activeContentItemChanged', (a) => {
          const id = a.config.id;
          runInAction(() => {
            this.$canvas.setActiveId(id);
            this.$canvas.loadUISchema(id);
            this.$canvas.loadLayoutSchema(id);
          });
        });

        // 如果有默认激活 tab，则初始化
        const item = canvas.getActiveContentItem();

        if (item == null) {
          return;
        }

        let id = Array.isArray(item.config.id) ? item.config.id[0] : item.config.id;

        // 更新 $canvas map
        runInAction(() => {
          this.$canvas.initMapFromLS(this.$glApp.getCanvasTabs());
          this.$canvas.setActiveId(id);
          this.$canvas.loadUISchema(id);
          this.$canvas.loadLayoutSchema(id);
        });

      });
    }
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
  public addOrSetActiveCanvasTab(id: string, title: string) {
    const canvas = this.getCanvasContentItem();

    if (this.$glApp.getCanvasTabs().get(id) != null) {
      const oldChild = canvas.getItemsById(id)[0];
      // 如果 title 变了
      if (this.$glApp.getCanvasTabs().get(id) != title) {
        this.$glApp.setCanvasTab(id, title);
        oldChild.setTitle(title);
      }
      // set active
      canvas.setActiveContentItem(canvas.getItemsById(id)[0]);

    } else {
      // add
      this.$glApp.setCanvasTab(id, title);
      canvas.addChild({
        id: id, // id 为设置 active 用
        title: title,
        type: 'react-component',
        component: 'Canvas'
      });
    }
  }
}

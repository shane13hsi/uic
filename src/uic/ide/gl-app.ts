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
  private _$canvas: $Canvas;

  @lazyInject($GLApp)
  private _$glApp: $IGLApp;

  public static readonly MOUNT_ID = 'golden-layout';

  private _glLayout: GoldenLayout2;

  private constructor(enforcer) {
    if (enforcer != singletonEnforcer) throw "Cannot construct singleton";
  }

  static get instance(): GLApp {
    if (!this[singleton]) {
      this[singleton] = new GLApp(singletonEnforcer);
    }
    return this[singleton];
  }

  public init() {
    if (this._glLayout == null) {
      this._glLayout = (new GoldenLayout(this._$glApp.getConfig(), `#${GLApp.MOUNT_ID}`)) as GoldenLayout2;

      // 注册 components
      this._registerComponents();

      this._glLayout.init();

      // 注册 event handlers
      $(window).resize(() => {
        this._glLayout.updateSize()
      });

      // 保存 config
      this._saveOnStatedChanged();

      this._glLayout.on('initialised', () => {
        const canvas = this._getCanvasContentItem();
        // 删除 canvas tabs
        this._removeOnTabDestroyed(canvas);
        // 激活 tab 变化
        this._reloadOnTabChanged(canvas);
        // 如果有默认激活 tab，则初始化
        this._initTab(canvas);
      });
    }
  }

  private _registerComponents() {
    this._glLayout.registerComponent('ComponentsList', ComponentList);
    this._glLayout.registerComponent('PageTree', PageTree);
    this._glLayout.registerComponent('Canvas', Canvas);
    this._glLayout.registerComponent('PropertyForm', PropertyForm);
  }

  public isInitialised(): boolean {
    return this._glLayout.isInitialised;
  }

  /**
   * @param id
   * @param title
   */
  public setActiveCanvasTab(id: string, title: string) {
    const canvas = this._getCanvasContentItem();

    if (this._$glApp.getCanvasTabs().get(id) != null) {
      const oldChild = canvas.getItemsById(id)[0];
      // 如果 title 变了
      if (this._$glApp.getCanvasTabs().get(id) != title) {
        this._$glApp.setCanvasTab(id, title);
        oldChild.setTitle(title);
      }
      // set active
      canvas.setActiveContentItem(canvas.getItemsById(id)[0]);

    } else {
      // add
      this._$glApp.setCanvasTab(id, title);
      canvas.addChild({
        id: id, // id 为设置 active 用
        title: title,
        type: 'react-component',
        component: 'Canvas'
      });
    }
  }

  private _getCanvasContentItem() {
    const canvas = this._glLayout.root.getItemsById('canvas')[0];
    return canvas;
  }

  private _initTab(canvas: GoldenLayout.ContentItem): void {
    const item = canvas.getActiveContentItem();
    if (item == null) {
      return;
    }
    let id = Array.isArray(item.config.id) ? item.config.id[0] : item.config.id;
    // 更新 _$canvas map
    runInAction(() => {
      this._$canvas.initMapFromLS(this._$glApp.getCanvasTabs());
      this._$canvas.setActiveId(id);
      this._$canvas.loadUISchema(id);
      this._$canvas.loadLayoutSchema(id);
    });
  }

  private _reloadOnTabChanged(canvas: GoldenLayout.ContentItem) {
    canvas.on('activeContentItemChanged', (a) => {
      const id = a.config.id;
      runInAction(() => {
        this._$canvas.setActiveId(id);
        this._$canvas.loadUISchema(id);
        this._$canvas.loadLayoutSchema(id);
      });
    });
  }

  private _removeOnTabDestroyed(canvas: GoldenLayout.ContentItem) {
    canvas.on('itemDestroyed', (a) => {
      this._$glApp.removeCanvasTab(a.origin.config.id);
    });
  }

  private _saveOnStatedChanged() {
    this._glLayout.on('stateChanged', () => {
      if (this.isInitialised()) {
        this._$glApp.saveConfigState(JSON.stringify(this._glLayout.toConfig()));
      }
    });
  }

}

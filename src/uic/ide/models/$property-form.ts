import { provide } from '../../core/ioc';
import { action, computed, observable, toJS } from 'mobx';
import { Form as MobxReactForm } from '@uic/mobx-react-form';
import * as validatorjs from 'validatorjs';
import * as _ from 'lodash';

export class $Form extends MobxReactForm {

  plugins() {
    return {
      dvr: {
        package: validatorjs // 暂时有的是 DVR
      },
    };
  }
}

@provide($PropertyForm)
export class $PropertyForm {
  @observable private _activeId: string;
  @observable private _formMap = new Map<string, $Form>();

  private _formSchemaMap = new Map<string, any>();
  @observable private _formUISchemaMap = new Map<string, any>();

  @computed
  public get form() {
    return this._formMap.get(this._activeId);
  }

  @computed
  public get uiSchema() {
    return this._formUISchemaMap.get(this._activeId);
  }

  @action
  public setForm(id, component, propsSchema, props) {
    console.log('setForm')
    // props 要重新设计
    // type 获取，经过适当的转换
    this._activeId = id;
    if (this._formMap.has(id)) {
      // TODO: 更新 props（即值）
      return;
    } else {
      this._setSchema(id, propsSchema);
      const form = new $Form({ fields: toJS(this._formSchemaMap.get(id)) }, { name: `${component}_${id}` })
      this._formMap.set(id, form);
    }
  }

  // 暂时让 form schema 转换成可用于 UISchemaToJSX
  private _setSchema(id: string, propsSchema: any) {
    let rule = _.chain(propsSchema)
      .mapValues((item: any) => ({ rules: item.rules }))
      .value();
    this._formSchemaMap.set(id, rule);

    let ui = _.chain(propsSchema)
      .map((item, key) => ({
        "component": "PropertyFormItem",
        "props": {
          "label": key,
          "tooltip": item.tooltip,
          "children": [{
            "component": "Input",  // TODO: 处理其他 component
            "binding": key,
            "props": {}
          }]
        },
      }))
      .value();
    this._formUISchemaMap.set(id, [{
      "component": "Form",
      "props": {
        "children": ui
      }
    }]);
  }

}

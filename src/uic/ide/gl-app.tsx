import * as React from 'react';
import * as GoldenLayout from 'golden-layout';
import { Canvas } from './canvas';
import { PropertyForm } from './property-form';
import { PageTree } from './page-tree';
import { ComponentsList } from './components-list';

class TestComponent extends React.Component<any, {}> {

  render() {
    return (<h1>{this.props.label}</h1>)
  }
}

/**
 * 还有一种 react-dom render 方式，可以实践下
 */
export class GLApp extends React.Component<{}, {}> {
  private node: any;

  componentDidMount() {
    const glConfig = {
      content: [
        {
          type: 'row',
          content: [
            {
              type: 'column',
              width: 2,
              content: [
                {
                  title: '组件库',
                  type: 'react-component',
                  component: 'ComponentsList',
                },
                {
                  title: '页面',
                  type: 'react-component',
                  component: 'PageTree',
                }
              ]
            },
            {
              title: '预览',
              type: 'react-component',
              width: 6,
              component: 'Canvas'
            },
            {
              title: '属性编辑',
              type: 'react-component',
              component: 'PropertyForm',
              width: 2
            }
          ]
        }
      ]
    };
    const glLayout = new GoldenLayout(glConfig, this.node);
    glLayout.registerComponent('TestComponent', TestComponent);
    glLayout.registerComponent('Canvas', Canvas);
    glLayout.registerComponent('PropertyForm', PropertyForm);
    glLayout.registerComponent('PageTree', PageTree);
    glLayout.registerComponent('ComponentsList', ComponentsList);
    glLayout.init();
  }

  render() {
    return <div ref={n => this.node = n}/>
  }
}

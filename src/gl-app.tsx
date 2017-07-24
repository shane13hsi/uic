import * as React from 'react';
import * as GoldenLayout from 'golden-layout';
import { Canvas } from './canvas';

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
                  component: 'TestComponent',
                  props: { label: 'A' }
                },
                {
                  title: '页面',
                  type: 'react-component',
                  component: 'TestComponent',
                  props: { label: 'B' }
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
              component: 'TestComponent',
              width: 2,
              props: { label: 'C' }
            }
          ]
        }
      ]
    };
    const glLayout = new GoldenLayout(glConfig, this.node);
    glLayout.registerComponent('TestComponent', TestComponent);
    glLayout.registerComponent('Canvas', Canvas);
    glLayout.init();
  }

  render() {
    return <div ref={n => this.node = n}/>
  }
}

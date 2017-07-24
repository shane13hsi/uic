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

  componentDidMount() {
    const glConfig = {
      content: [{
        type: 'row',
        content: [{
          title: '预览',
          type: 'react-component',
          component: 'Canvas',
          props: { label: 'A' }
        }, {
          type: 'column',
          content: [{
            type: 'react-component',
            component: 'TestComponent',
            props: { label: 'B' }
          }, {
            type: 'react-component',
            component: 'TestComponent',
            props: { label: 'C' }
          }]
        }]
      }]
    };
    const glLayout = new GoldenLayout(glConfig, '#golden-layout');
    glLayout.registerComponent('TestComponent', TestComponent);
    glLayout.registerComponent('Canvas', Canvas);
    glLayout.init();
  }

  render() {
    return <div id="golden-layout"/>
  }
}

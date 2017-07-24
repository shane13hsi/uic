import * as React from 'react';
import * as GoldenLayout from 'golden-layout';

class TestComponent extends React.Component<any, {}> {

  render() {
    return (<h1>{this.props.label}</h1>)
  }
}

export class GLApp extends React.Component<{}, {}> {

  node: any;

  componentDidMount() {
    const glConfig = {
      content: [{
        type: 'row',
        content: [{
          type: 'react-component',
          component: 'test-component',
          props: { label: 'A' }
        }, {
          type: 'column',
          content: [{
            type: 'react-component',
            component: 'test-component',
            props: { label: 'B' }
          }, {
            type: 'react-component',
            component: 'test-component',
            props: { label: 'C' }
          }]
        }]
      }]
    };
    const glLayout = new GoldenLayout(glConfig, this.node);
    glLayout.registerComponent('test-component', TestComponent);
    glLayout.init();
  }

  render() {
    return <div ref={n => this.node = n}/>
  }
}

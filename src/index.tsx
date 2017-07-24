import 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GLApp } from './uic/ide/gl-app';

declare var window: any;
window.React = React;
window.ReactDOM = ReactDOM;

ReactDOM.render(<GLApp />, document.getElementById('root'));

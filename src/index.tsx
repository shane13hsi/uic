import 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IDE } from './uic/ide/ide';

declare var window: any;
window.React = React;
window.ReactDOM = ReactDOM;

ReactDOM.render(<IDE />, document.getElementById('root'));

import 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IDE } from './uic/ide/ide';
import './uic/ide/db/pouchdb';

declare var window: any;
window.React = React;
window.ReactDOM = ReactDOM;

ReactDOM.render(<IDE />, document.getElementById('root'));

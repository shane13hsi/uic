import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Mobx from 'mobx';
import './uic/ide/db/pouchdb';
import { IDE } from './uic/ide/ide';
declare var window: any;

window.React = React;
window.ReactDOM = ReactDOM;
window.Mobx = Mobx;

ReactDOM.render(<IDE />, document.getElementById('root'));

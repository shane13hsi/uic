declare var window: any;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Mobx from 'mobx';
import { IDE } from './uic/ide/ide';
import './uic/ide/db/pouchdb';

window.React = React;
window.ReactDOM = ReactDOM;
window.Mobx = Mobx;

ReactDOM.render(<IDE />, document.getElementById('root'));

declare var window: any;

import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

/**
 * PouchDB chrome extension
 */
window.PouchDB = PouchDB;

/**
 * 浏览器 localStorage 和 远程（local）CouchDB 同步
 */
export const db = new PouchDB('uic-ide-local');
db.sync('http://localhost:5984/uic-ide', {
  live: true,
  retry: true
});
// PouchDB.replicate('http://192.168.50.157:5984/uic-ide', 'http://localhost:5984/uic-ide');

db.info().then(function (info) {
  console.debug(info);
});

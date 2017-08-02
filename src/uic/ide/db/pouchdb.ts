declare var window: any;

import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);

export const db = new PouchDB('uic-ide-local');

window.PouchDB = PouchDB;

db.sync('http://localhost:5984/uic-ide', {
  live: true,
  retry: true
});
// PouchDB.replicate('http://192.168.50.157:5984/uic-ide', 'http://localhost:5984/uic-ide');

db.info().then(function (info) {
  console.debug(info);
});

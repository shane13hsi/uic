declare var window: any;

import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);

export const db = new PouchDB('uic-ide-local');

window.PouchDB = PouchDB;

db.sync('http://192.168.50.157:5984/uic-ide', {
  live: true,
  retry: true
});

db.info().then(function (info) {
  console.debug(info);
});

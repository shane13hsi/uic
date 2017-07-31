import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);

export const db = new PouchDB('http://localhost:5984/uic-ide');

db.info().then(function (info) {
  console.debug(info);
});

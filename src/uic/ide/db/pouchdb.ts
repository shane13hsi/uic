import PouchDB from 'pouchdb';

export const db = new PouchDB('http://localhost:5984/uic-ide');

db.info().then(function (info) {
  console.debug(info);
});

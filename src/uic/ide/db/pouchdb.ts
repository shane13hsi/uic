import PouchDB from 'pouchdb';

PouchDB.debug.enable('*');
const db = new PouchDB('http://localhost:5984/uic-ide');

db.info().then(function (info) {
  console.log(info);
});

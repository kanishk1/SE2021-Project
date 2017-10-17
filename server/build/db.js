'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;
exports.get = get;
exports.close = close;
exports.data = data;

var _mongodb = require('mongodb');

var state = {
  db: null
};

function connect(url, done) {
  if (state.db) return done();

  _mongodb.MongoClient.connect(url, function (err, db) {
    if (err) return done(err);
    state.db = db;
    done();
  });
}

function get() {
  return state.db;
}

function close(done) {
  if (state.db) {
    state.db.close(function (err, result) {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
}

// Use this function to get info from the database.
//
// Params:
//  - store      => The data store to get information from (e.g., 'bing')
//  - suburb     => The record to retrieve
//  - renew      => How often to renew the data; one of {day,week,month,year}
//  - generate   => A function returning a promise with the data.
//
// Returns a promise of a JSON object with the data.
function data(store, suburb, renew, generate) {
  var getExpiration = function getExpiration() {
    var date = new Date();
    switch (renew) {
      case 'day':
        date.setDate(date.getDate() + 1);break;
      case 'week':
        date.setDate(date.getDate() + 7);break;
      case 'month':
        date.setDate(date.getDate() + 30);break;
      case 'year':
        date.setDate(date.getDate() + 365);break;
      default:
        console.log("Invalid renew: ", renew);
    }
    return date;
  };

  var collection = get().collection(store);
  return collection.findOne({ suburb: suburb }).then(function (doc) {
    if (doc && doc['expires'] > new Date()) {
      console.log(doc['expires']);
      return doc['data'];
    }

    return generate().then(function (data) {
      if (doc) {
        collection.updateOne({ suburb: suburb }, {
          $set: { 'expires': getExpiration(), 'data': data }
        }).catch(function (err) {
          return console.log("error: " + err);
        });
      } else {
        collection.insertOne({
          'suburb': suburb, 'expires': getExpiration(), 'data': data
        }).catch(function (err) {
          return console.log("error: " + err);
        });
      }

      return data;
    });
  });
}
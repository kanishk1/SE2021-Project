import { MongoClient } from 'mongodb'

var state = {
  db: null,
};

export function connect(url, done) {
  if (state.db) return done();

  MongoClient.connect(url, (err, db) => {
    if (err)
      return done(err);
    state.db = db;
    done();
  });
}

export function get() {
  return state.db;
}

export function close(done) {
  if (state.db) {
    state.db.close((err, result) => {
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
export function data(store, suburb, renew, generate) {
  const getExpiration = () => {
    const date = new Date();
    switch (renew) {
      case 'day':   date.setDate(date.getDate() +   1); break;
      case 'week':  date.setDate(date.getDate() +   7); break;
      case 'month': date.setDate(date.getDate() +  30); break;
      case 'year':  date.setDate(date.getDate() + 365); break;
      default:
        console.log("Invalid renew: ", renew);
    }
    return date;
  };

  const collection = get().collection(store);
  return collection.findOne({ suburb })
    .then(doc => {
      if (doc && doc['expires'] > new Date()) {
        console.log(doc['expires']);
        return doc['data'];
      }

      return generate().then(data => {
        if (doc) {
          collection.updateOne({ suburb }, {
            $set: { 'expires': getExpiration(), 'data': data }
          }).catch(err => console.log("error: " + err));
        } else {
          collection.insertOne({
            'suburb': suburb, 'expires': getExpiration(), 'data': data
          }).catch(err => console.log("error: " + err));
        }

        return data;
      });
    });
}

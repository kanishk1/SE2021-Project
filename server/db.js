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

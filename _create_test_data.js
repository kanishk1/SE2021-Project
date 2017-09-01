conn = new Mongo();
db = conn.getDB("suburber");

db.test.remove({});
db.test.insertOne({ name: 'Wassup Boiz' });
db.test.insertOne({ name: 'I\'m not a boy!' });

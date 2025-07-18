const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let db;

const initDb = (callback) => {
  if (db) {
    console.log('DB is already initialized!');
    return callback(null, db);
  }

  MongoClient.connect(process.env.MONGODB_URL, { useUnifiedTopology: true })
    .then((client) => {
      db = client.db(); 
      console.log('MongoDB initialized');
      callback(null, db);
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      callback(err);
    });
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

module.exports = { initDb, getDb };

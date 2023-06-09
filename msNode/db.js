const { Pool } = require('pg');
const MongoClient = require('mongodb').MongoClient;
const redis = require('redis');

const pool = new Pool({
  // Configurações do PostgreSQL
});

let db;
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) throw err;
  db = client.db('yourdatabase');
});

const client = redis.createClient({
  // Configurações do Redis
});
client.on('error', (err) => {
  console.log(`Error: ${err}`);
});

// Operações CRUD para PostgreSQL
const insertDataPostgreSQL = async (data) => {
  const query = 'INSERT INTO yourtable (column1, column2) VALUES ($1, $2)';
  const values = [data.field1, data.field2];

  try {
    const result = await pool.query(query, values);
    console.log('Data inserted in PostgreSQL:', result.rows[0]);
  } catch (err) {
    console.error('Error inserting data in PostgreSQL:', err);
  }
};

const selectDataPostgreSQL = async (key) => {
  const query = 'SELECT * FROM yourtable WHERE key = $1';
  const values = [key];

  try {
    const result = await pool.query(query, values);
    console.log('Data selected from PostgreSQL:', result.rows);
  } catch (err) {
    console.error('Error selecting data from PostgreSQL:', err);
  }
};

// Operações CRUD para MongoDB
const insertDataMongoDB = (data) => {
  db.collection('yourcollection').insertOne(data, (err, result) => {
    if (err) {
      console.error('Error inserting data in MongoDB:', err);
    } else {
      console.log('Data inserted in MongoDB:', result.ops[0]);
    }
  });
};

const selectDataMongoDB = (key) => {
  db.collection('yourcollection').findOne({ key }, (err, result) => {
    if (err) {
      console.error('Error selecting data from MongoDB:', err);
    } else {
      console.log('Data selected from MongoDB:', result);
    }
  });
};

// Operações CRUD para Redis
const insertDataRedis = (data) => {
  client.set(data.key, data.value, (err, reply) => {
    if (err) {
      console.error('Error inserting data in Redis:', err);
    } else {
      console.log('Data inserted in Redis:', reply);
    }
  });
};

const selectDataRedis = (key) => {
  client.get(key, (err, reply) => {
    if (err) {
      console.error('Error selecting data from Redis:', err);
    } else {
      console.log('Data selected from Redis:', reply);
    }
  });
};

module.exports = {
  pool,
  db,
  client,
  insertDataPostgreSQL,
  selectDataPostgreSQL,
  insertDataMongoDB,
  selectDataMongoDB,
  insertDataRedis,
  selectDataRedis
};

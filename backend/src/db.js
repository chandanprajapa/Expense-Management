const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

pool.connect()
  .then(client => {
    console.log(' Connected to the database successfully');
    client.release();
  })
  .catch(err => {
    console.error(' Failed to connect to the database:', err.message);
  });

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};

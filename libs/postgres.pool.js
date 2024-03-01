const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'my_store',
  user: 'admin',
  password: 'admin123',
});


module.exports = pool;

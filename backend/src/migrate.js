require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('./db');

const sql = fs.readFileSync(path.join(__dirname, '../migrations/initial.sql'), 'utf8');

(async () => {
  try {
    await db.pool.query(sql);
    console.log(' Migrations applied');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
})();

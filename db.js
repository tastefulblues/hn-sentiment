const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || `postgresql://postgres:${process.env.DB_PASSWORD}@127.0.0.1:5432/hn_sentiment`,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

module.exports = pool;
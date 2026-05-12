const { Pool } = require('pg');

const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    database: 'hn_sentiment',
    user: 'postgres',
    password: process.env.DB_PASSWORD
});

module.exports = pool;
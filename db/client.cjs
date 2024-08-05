const { Client } = require('pg');
require('dotenv').config();
console.log(process.env.DATABASE_URL)
const client = new Client(process.env.DATABASE_URL);

module.exports = client;


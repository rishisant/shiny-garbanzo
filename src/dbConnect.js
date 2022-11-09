const {Client, Pool} = require('pg');
//const dotenv = require('dotenv').config();

// Connect to the database
const pool = new Pool({
    user: "csce315_903_rehmat",
    host: "csce-315-db.engr.tamu.edu",
    database: "csce315_903_13",
    password: "528000730",
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Now connect to the database
console.log('Connecting to database...')
pool.connect();
// Run a query
pool.query('SELECT * FROM orders LIMIT 5')
.then(res => console.log(res.rows))
.finally(() => pool.end());

const express = require('express')
const app = express()
const port = 3002
app.get('/', (req, res) => {
    res.status(200).send(res);
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

// const express = require('express')
// const Pool = require('pg').Pool
// const app = express()
// const port = 3001

// app.get('/', (req, res) => {
//   res.status(200).send('Hello World!');
// })

// app.listen(port, () => {
//   console.log(`App running on port ${port}.`)
// })






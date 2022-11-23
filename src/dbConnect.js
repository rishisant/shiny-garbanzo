const {Client, Pool} = require('pg');
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});
console.log('Connecting to database...')
pool.connect();
pool.query('SELECT * FROM orders LIMIT 5')
.then(res => console.log(res.rows[0]['total_price']))
.finally(() => pool.end());

// const express = require('express')
// const app = express()
// const port = 3002
// app.get('/', (req, res) => {
//     res.status(200).send(res);
// })
// app.listen(port, () => {
//   console.log(`App running on port ${port}.`)
// })

const express = require('express')
const Pool = require('pg').Pool
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})






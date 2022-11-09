// // linkFTB : links front end to back end
// // test_text -> string to be displayed in the tinybox (part of querytest.js)
// const {Client, Pool} = require('pg');
// //const dotenv = require('dotenv').config();

// // Connect to the database

// import pg from 'pg'
// const {Client, Pool} = require('pg');
// const Pool = require('pg').Pool
//const dotenv = require('dotenv').config();

// Connect to the database

// // Now connect to the database
/*
const { Pool } = require('pg');
const express = require('express');
const app = express();

const pool = new Pool({
    user: "csce315_903_santhanam",
    host: "csce-315-db.engr.tamu.edu",
    database: "csce315_903_13",
    password: "529009921",
    port: 5432,
    ssl: {rejectUnauthorized: false}
});

// var test_text = "";
pool.connect();

app.set("view engine", "ejs");
// app.use(express.static("public"));

app.get('/QueryTest', (req, res) => {
    var orders= [];

    pool.query('SELECT * FROM teammembers;')
        .then(res => {
            for (let i = 0; i < res.rowCount; i++){
                orders.push(res.rows[i]);
            }
        });
    
    const data = {orders: orders};
    console.log(orders);
    res.render('QueryTest', data);
    
});

process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

// export function linkFTB() {
//     console.log("text has been linked\n");

//     var test_text = "";
//     var btn = document.getElementsByClassName("tinybox")[0];
//     btn.innerHTML = test_text;
//     // Run a query 
//     // pool.connect()
//     // pool.connect();
//     // pool.query('SELECT * FROM product where product_id = 113')
//     // .then(
//     //     res => {
//     //         console.log(res.rows);
//     //         test_text = res.rows;
//     //         btn.innerHTML = test_text;
//     //     }
//     // )
//     // .finally(() => pool.end());
// }*/
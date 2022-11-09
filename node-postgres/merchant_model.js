// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'csce315_903_juntunen',
//   host: 'csce-315-db.engr.tamu.edu',
//   database: 'csce315_903_13',
//   password: '630007600',
//   port: 5432,
// });

// const getProducts = () => {
//     return new Promise(function(resolve, reject) {
//       pool.query('SELECT * FROM product', (error, results) => {
//         if (error) {
//           reject(error)
//         }
//         resolve(results);
//       })
//     }) 
// }
// // const createProducts = (body) => {
// // return new Promise(function(resolve, reject) {
// //     const { name, email } = body
// //     pool.query("INSERT INTO product(product_id, name, description, stock, cat_id, price, ing_id) VALUES(234, 'test', 'Test sub', 50, 1, 7.99, '{1, 2, 20, 13, 30}') RETURNING *", [product_id, name, description, stock, cat_id, price, ing_id], (error, results) => {
// //     if (error) {
// //         reject(error)
// //     }
// //     resolve(`A new product has been added added: ${results}`)
// //     })
// // })
// // }
// // const deleteProducts = () => {
// // return new Promise(function(resolve, reject) {
// //     const id = parseInt(request.params.id)
// //     pool.query('DELETE FROM product WHERE product_id = 234', [product_id], (error, results) => {
// //     if (error) {
// //         reject(error)
// //     }
// //     resolve(`Merchant deleted with ID: ${product_id}`)
// //     })
// // })
// // }

// module.exports = {
//     getProducts,
//     // createProducts,
//     // deleteProducts,
// }
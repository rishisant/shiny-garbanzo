const config = require('./dbConfig');
    sql = require('mssql');
const getProducts = async () => {
    try {
        let pool = await sql.connect(config);
        let products = pool.request().query("SELECT * FROM product");
        console.log(products);
        return products;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts
}
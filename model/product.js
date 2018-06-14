"use strict";

const db = require("./db");

var getProduct = async function (productID) {
    var rows = await db.invoke(`
    SELECT
        id,
        name,
        price,
        create_at
    FROM products
    WHERE id = ?
    `, [productID]);

    if (rows.length === 0) {
        return null
    }

    return rows[0];
}

var getProducts = async function () {
    return db.invoke(`
    SELECT
        id,
        name,
        price,
        create_at
    FROM products
    ORDER BY id ASC
    `, []);
};

module.exports = {
    getProduct,
    getProducts
}

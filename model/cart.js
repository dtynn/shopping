"use strict";

const db = require("./db");

var addItem = async function (userID, productID) {
    return db.invoke(`
    INSERT INTO cart_items (
        user_id,
        product_id,
        create_at
    ) VALUES (
        ?,
        ?,
        ?
    )
    `, [userID, productID, Date.now() / 1000])
}

var getShoppintListForUser = async function (userID) {
    return db.invoke(`
    SELECT
        ci.id,
        ci.product_id,
        ci.create_at,
        p.name,
        p.price,
        p.create_at AS p_create_at
    FROM cart_items AS ci
    INNER JOIN products AS p
        ON p.id = ci.product_id
    WHERE ci.user_id = ?
    ORDER BY ci.create_at ASC
    `, [userID]);
}

module.exports = {
    addItem,
    getShoppintListForUser,
}

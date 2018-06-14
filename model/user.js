"use strict";

const db = require("./db");

var addUser = async function (user) {
    return db.invoke(`
    INSERT INTO users (
        username,
        password,
        create_at
    ) VALUES (
        ?,
        ?,
        ?
    )
    `, [user.username, user.password, Date.now() / 1000]);
};

var getUser = async function (username) {
    var rows = await db.invoke(`
    SELECT
        id,
        username,
        password,
        create_at
    FROM users
    WHERE
        username = ?
    `, [username])

    if (rows.length === 0) {
        return null
    }

    return rows[0];
}

var getUserByID = async function (id) {
    var rows = await db.invoke(`
    SELECT
        id,
        username,
        password,
        create_at
    FROM users
    WHERE
        id = ?
    `, [id])

    if (rows.length === 0) {
        return null
    }

    return rows[0];
}

module.exports = {
    addUser,
    getUser,
    getUserByID
}

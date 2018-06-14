"use strict";

const mysql = require("mysql");

var pool;

var initMySQL = function (config) {
    pool = mysql.createPool(config);
}

var invoke = function (sql, values) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, conn) {
            if (err) {
                reject(err)
                return
            };

            conn.query(sql, values, function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }

                conn.release()
            })
        })
    })
}

module.exports = {
    initMySQL,
    invoke
};

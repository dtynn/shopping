"use strict";

module.exports = {
    port: 10080,
    signature: {
        key: "devabcd",
    },
    db: {
        mysql: {
            connectionLimit: 10,
            host: "localhost",
            user: "root",
            password: "",
            database: "shopping",
            charset: "utf8mb4",
            supportBigNumbers: true,
            multipleStatements: true
        }
    }
}

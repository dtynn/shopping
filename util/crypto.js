"use strict";

const bcrypt = require("bcrypt")
const crypto = require('crypto');

var passwordHash = function (password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

var passwordCompare = function (password, hash) {
    return bcrypt.compareSync(password, hash);
}

var sign = function (content, key) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(content)
    return hmac.digest("base64");
}

var signWithData = function (data, key) {
    var content = JSON.stringify(data);
    return new Buffer(content).toString("base64") + ":" + sign(content, key);
}

var parseToken = function (token, key) {
    var pieces = token.split(":", 2);
    if (pieces.length !== 2) {
        throw new Error("invalid token")
    }

    var buf = new Buffer(pieces[0], "base64");
    var content = buf.toString("utf-8");

    if (sign(content, key) !== pieces[1]) {
        throw new Error("invalid signature")
    }

    return JSON.parse(content);
}

module.exports = {
    passwordHash,
    passwordCompare,
    signWithData,
    parseToken
}

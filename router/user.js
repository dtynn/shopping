"use strict";

const userModel = require("../model/user");
const resp = require("../util/response").resp;
const crypto = require("../util/crypto");
const cfg = require("../config")

var signup = async function (ctx, next) {
    var body = ctx.request.body;

    var username = body.username,
        password = body.password;

    if (!username) {
        resp(ctx, 400, { message: "username required" })
        return next()
    }

    if (!password) {
        resp(ctx, 400, { message: "password required" })
        return next()
    }

    try {
        await userModel.addUser({
            username: username,
            password: crypto.passwordHash(password)
        })
        resp(ctx, 200, { message: "ok" })
    } catch (err) {
        if (err.code && err.code === "ER_DUP_ENTRY") {
            resp(ctx, 400, { message: "duplicate username" })
        } else {
            console.log(err)
            resp(ctx, 500, { message: "internal server error" })
        }
    }

    return next()
}

var signin = async function (ctx, next) {
    var body = ctx.request.body;

    var username = body.username,
        password = body.password;

    if (!username) {
        resp(ctx, 400, { message: "username required" })
        return next()
    }

    if (!password) {
        resp(ctx, 400, { message: "password required" })
        return next()
    }

    try {
        var user = await userModel.getUser(username)
        if (user === null) {
            resp(ctx, 400, { message: "invalid username or password" })
        } else if (crypto.passwordCompare(password, user.password) === true) {
            resp(ctx, 200, { token: crypto.signWithData({ id: user.id }, cfg.signature.key) })

        } else {
            resp(ctx, 400, { message: "invalid username or password" })
        }

    } catch (err) {
        console.log(err)
        resp(ctx, 500, { message: "internal service error" })
    }

    return next()
}


module.exports = {
    signup,
    signin
};

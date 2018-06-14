"use strict";

var resp = function (ctx, status, body) {
    ctx.status = status
    ctx.body = body
}

module.exports = {
    resp
}

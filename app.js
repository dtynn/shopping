"use strict";

const Koa = require("koa");
const Router = require("koa-router");
const BodyParser = require("koa-bodyparser");
const graph = require("apollo-server-koa")

const user = require("./router/user")
const cfg = require("./config")
const db = require("./model/db")
const graphSchema = require("./router/graphql").schema;

const port = process.env.PORT || 10080;

db.initMySQL(cfg.db.mysql);

const app = new Koa();
const router = new Router();

router.post("/signup", user.signup);
router.post("/signin", user.signin);

router.get("/graphql", graph.graphqlKoa(function (req) {
    return {
        schema: graphSchema,
    }
}))

router.post("/graphql", graph.graphqlKoa(function (req) {
    // parse token and get user from request
    return {
        schema: graphSchema,
        // context: {
        //     user: user,
        // }
    }
}))

router.get("/graphiql", graph.graphiqlKoa({
    endpointURL: "/graphql",
}))

app.use(BodyParser())
    .use(router.routes());

console.log("MODE", cfg.mode, "start on", cfg.port)
app.listen(cfg.port);

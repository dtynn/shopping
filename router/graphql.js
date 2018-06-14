"use strict";

const graphqlTools = require("graphql-tools");

const productModel = require("../model/product");
const userModel = require("../model/user");
const cartModel = require("../model/cart");
const cfg = require("../config")
const crypto = require("../util/crypto");

const typeDefs = `
type User {
    username: String!
    token: String
}

type Product {
    id: Int!
    name: String
    price: Int
    createAt: Int
}

type CartItem {
    id: Int!
    product: Product
    createAt: Int
}

type Query {
    signin(username:String!, password:String!): User
    products: [Product]
    shoppingList(token: String!): [CartItem]
}

type Mutation {
    signup(username:String!, password:String!): Boolean

    addToShoppingList(
        token: String!,
        productID: Int!
    ): Boolean
}
`

const resolvers = {
    Query: {
        signin: async function (_, args, ctx) {
            var user = await userModel.getUser(args.username);
            if (user === null) {
                throw new Error("invalid username or password");
            }

            if (crypto.passwordCompare(args.password, user.password) !== true) {
                throw new Error("invalid username or password");
            }

            return {
                username: user.username,
                token: crypto.signWithData({ id: user.id }, cfg.signature.key),
            }
        },

        products: async function () {
            var products = await productModel.getProducts();
            for (var i = 0; i < products.length; i++) {
                products[i].createAt = products[i].create_at
            }

            return products;
        },

        shoppingList: async function (_, args) {
            var user = await getUserByToken(args.token);
            var rows = await cartModel.getShoppintListForUser(user.id);

            var items = [];
            for (var i = 0; i < rows.length; i++) {
                items.push({
                    id: rows[i].id,
                    createAt: rows[i].create_at,
                    product: {
                        id: rows[i].product_id,
                        name: rows[i].name,
                        price: rows[i].price,
                        createAt: rows[i].p_create_at,
                    },
                })
            }

            return items;
        }
    },

    Mutation: {
        signup: async function (_, args) {
            await userModel.addUser({
                username: args.username,
                password: crypto.passwordHash(args.password),
            })

            return true
        },

        addToShoppingList: async function (_, args) {
            var user = await getUserByToken(args.token);
            var product = await productModel.getProduct(args.productID);
            if (product === null) {
                throw new Error("product not found")
            }

            await cartModel.addItem(user.id, product.id);

            return true;
        }
    }
}

const schema = graphqlTools.makeExecutableSchema({
    typeDefs,
    resolvers,
})

var getUserByToken = async function (token) {
    var data = crypto.parseToken(token, cfg.signature.key)
    if (!data || !data.id) {
        throw new Error("invalid token data");
    }

    var user = await userModel.getUserByID(data.id)
    if (user === null) {
        throw new Error("user not exists");
    }

    return user
}

module.exports = {
    schema
}

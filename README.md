### shopping list

A demo written in node.js.

Uses [koajs](https://koajs.com/), [graphql-tools](https://www.apollographql.com/docs/graphql-tools/) and [apollo-server-koa](https://www.apollographql.com/docs/apollo-server/).

#### usage

##### prepare

```
// install pm2 and nodemon
npm install -g pm2 nodemon

// get the source code
git clone git@github.com:dtynn/shopping.git
cd shopping

// install packages
npm install

// init database tabels
mysql -u <USERNAME> -p < files/database.sql

// init products
mysql -u <USERNAME> -p < files/products.sql

// update local configuration
// by editing `config/config.dev.js`

// if you want to deploy the service in production env:
// you should create `config/config.prod.js` and edit it
cat config/config.dev.js > config/config.prod.js
```



##### dev

-  `npm run dev`



##### deployment

-  `npm run deploy:prod`
- you can monitor the service by  `pm2 ls`



#### API

##### graphql schema

```
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
```



##### testing the api

1. start the dev service and open the page `http://localhost:10080/graphiql` in your browser
2. send whatever your want.
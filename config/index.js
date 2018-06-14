
const NODE_ENV = process.env.NODE_ENV || 'dev';
var config = require(`./config.${NODE_ENV}.js`);
config.mode = NODE_ENV;
module.exports = config;

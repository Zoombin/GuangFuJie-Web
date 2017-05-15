const baseConfig = require('./base');
const env = process.env.NODE_ENV;

let config = null;

if (env === 'production') config = Object.assign({}, baseConfig, require('./prod'));
else if (env === 'develop') config = Object.assign({}, baseConfig, require('./develop'));
else config = Object.assign({}, baseConfig, require('./local'));

module.exports = config;

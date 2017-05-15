
// const config = require('./config');
const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const favicon = require('koa-favicon');
const logger = require('koa-logger');
const views = require('koa-views');
const session = require('koa-session-minimal');
const MysqlSession = require('koa-mysql-session');
const app = new Koa();
const config = require('./config');

const router = require('./routes');
let store = new MysqlSession({
    user: config.database.user,
    password: config.database.password,
    database: config.database.db,
    host: config.database.host
});

// 配置session中间件
app.use(session({
    key: 'USER_ID',
    store: store
}));


(process.env.NODE_ENV === 'develop' 
    || process.env.NODE_ENV === 'local')
    ? app.use(logger()) : '';
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(require('koa-static')(path.join(__dirname, '/public')));
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port);
console.log('server is listening on : ' + config.port);


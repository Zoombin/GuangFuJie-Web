// 主页子路由

const Router = require('koa-router');
const router = new Router();
// const homeCtr = require('../controllers/home');
const pageCtr = require('../controllers/page');


router.get('/', pageCtr.indexPage);

module.exports = router;
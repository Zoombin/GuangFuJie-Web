// 登录页路由

const Router = require('koa-router');
const router = new Router();
const pageCtr = require('../controllers/page');

router.get('/', pageCtr.loginPage);

module.exports = router;
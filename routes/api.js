/**
 * restful api 子路由
 */

const Router = require('koa-router');
const userCtr = require('../controllers/user');
const bannerCtr = require('../controllers/banner');

const router = new Router();

router.post('/user/signin', userCtr.signIn);
router.get('/banner/data', bannerCtr.bannerPagition);

 module.exports = router;
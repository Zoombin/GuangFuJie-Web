/**
 * restful api 子路由
 */

const Router = require('koa-router');
const userCtr = require('../controllers/user');
const bannerCtr = require('../controllers/banner');
const caseCtr = require('../controllers/case');
const contactUsCtr = require('../controllers/contactus');

const {uploadPicture} = require('../utils/upload-utils');

const {putToken} = require('../utils/qiniu-utils');

const router = new Router();

router.post('/user/signin', userCtr.signIn);
router.get('/banner/list', bannerCtr.bannerPagition);
router.get('/case/list', caseCtr.casePagition);
router.get('/contactus/list', contactUsCtr.contactPagition);

router.post('/upload', async (ctx) => {
    let restult = await uploadPicture(ctx);
    console.log(result);
    ctx.body = result;
});

router.get('/token', async (ctx) => {
    ctx.body = {
        token: putToken(ctx.query.key),
        key: ctx.query.key,
        domainUrl: require('../config').qiniu.domainUrl
    };
});

 module.exports = router;
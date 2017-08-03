/**
 * restful api 子路由
 */

const _ = require('lodash');
const Router = require('koa-router');

const userCtr = require('../controllers/user');
const bannerCtr = require('../controllers/banner');
const caseCtr = require('../controllers/case');
const serviceCtr = require('../controllers/service');
const contactUsCtr = require('../controllers/contactus');
const teamCtr = require('../controllers/team');
const newsCtr = require('../controllers/news');
const articlesCtr = require('../controllers/articles');
const addressCtr = require('../controllers/address');

const dbUtils = require('../utils/db-utils');
const {uploadPicture} = require('../utils/upload-utils');

const {putToken} = require('../utils/qiniu-utils');

const router = new Router();

const articleTableMap = {
    case: 'case',
    news: 'news'
};

router.post('/user/signin', userCtr.signIn);

router.get('/banner/list', bannerCtr.bannerPagition);
router.post('/banner/create', bannerCtr.insertBanner);
router.post('/banner/batchdel', bannerCtr.batchDelete);
router.post('/banner/edit', bannerCtr.update);

router.get('/case/list', caseCtr.casePagition);
router.post('/case/batchdel', caseCtr.batchDelete);
router.post('/case/edit', caseCtr.update);
router.post('/case/create', caseCtr.insertCase);

router.get('/service/list', serviceCtr.servicePagition);
router.post('/service/create', serviceCtr.insertService);
router.post('/service/edit', serviceCtr.update);
router.post('/service/batchdel', serviceCtr.batchDelete);

router.get('/team/list', teamCtr.teamPagition);
router.post('/team/create', teamCtr.insertTeam);
router.post('/team/edit', teamCtr.update);
router.post('/team/batchdel', teamCtr.batchDelete);

router.get('/news/list', newsCtr.newsPagition);
router.post('/news/create', newsCtr.insertNews);
router.post('/news/edit', newsCtr.update);
router.post('/news/batchdel', newsCtr.batchDelete);

router.get('/contactus/list', contactUsCtr.contactPagition);
router.post('/contactus/toggle', contactUsCtr.toggleContact);

router.get('/articles/list', articlesCtr.getList);
router.get('/articles/typelist', articlesCtr.typelist);
router.post('/articles/edit', articlesCtr.editArt);
router.post('/articles/create', articlesCtr.newArt);

router.get('/address/provincelist', addressCtr.provinceList);
router.get('/address/citylist', addressCtr.cityList);
router.get('/address/arealist', addressCtr.areList);


router.get('/article', async (ctx) => {
    let type = ctx.query.type;
    let id = ctx.query.id;
    console.log(type, id);
    let result = {
        success: false,
        msg: '',
        data: null,
        code: 0
    };
    if (_.isUndefined(type) || _.isUndefined(id)) {
        result.msg = '缺少参数';
        return ctx.body = result;
    }
    const tbName = articleTableMap[type];

    const queryData = await dbUtils.findPartDataById([tbName], ['content'], id);
    // console.log(queryData);
    if (queryData) {
        result.success = true;
        result.msg = '操作成功';
        result.data = queryData;
    }

    ctx.body = result;
});

router.post('/article/save', async (ctx) => {
    let params = ctx.request.body;
    let { type, id, content } = params;
    let result = {
        success: false,
        msg: '',
        data: null,
        code: 0
    };
    if (_.isUndefined(type) || _.isUndefined(id)) {
        result.msg = '缺少参数';
        return ctx.body = result;
    }

    const tbName = articleTableMap[type];

    const queryData = await dbUtils.updateDataById([tbName], {content}, id);

    if (queryData) {
        result.success = true;
        result.msg = '操作成功';
        data = queryData;
    }

    ctx.body = result;
});

router.post('/upload', async (ctx) => {
    let restult = await uploadPicture(ctx);
    // console.log(result);
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
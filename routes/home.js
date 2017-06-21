// 主页子路由

const Router = require('koa-router');
const router = new Router();
// const homeCtr = require('../controllers/home');
const pageCtr = require('../controllers/page');
const contactCtr = require('../controllers/contactus');


router.get('/', pageCtr.indexPage);
router.get('case/:id', pageCtr.casePage);
router.get('news/:id', pageCtr.newItemPage);
router.post('contactus/insert', contactCtr.handlerContactUsForm);
module.exports = router;
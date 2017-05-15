const Router = require('koa-router');
const router = new Router();
const pageCtr = require('../controllers/page');
router.get('/', pageCtr.adminPage);

module.exports = router;
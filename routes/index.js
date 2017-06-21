const Router = require('koa-router');
const router = new Router();

const home = require('./home');
// const login = require('./login');
const api = require('./api');
const admin = require('./admin');
const ue = require('./ue');

router.use('/', home.routes(), home.allowedMethods());
// router.use('/login', login.routes(), login.allowedMethods());
// router.use('/admin', async (ctx, next) => {
//     // isLogin: true, userName: 'admin', userId: 1 }
//     if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
//         next();
//     } else {
//         ctx.redirect('/login');
//     }
// }, admin.routes(), admin.allowedMethods());
router.use('/admin', admin.routes(), admin.allowedMethods());
router.use('/api', api.routes(), home.allowedMethods());
router.use('/ue', ue.routes(), ue.allowedMethods());
module.exports = router;
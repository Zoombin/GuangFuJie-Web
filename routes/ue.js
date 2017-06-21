const Router = require('koa-router');
const Promise = require('bluebird');
const Busboy = require('busboy');
const fs = require('fs');
const qn = require('qn');
const path = require('path');
const router = new Router();
const qiniuUtils = require('../utils/qiniu-utils');
const defaultConfig = require('./uecfg');
router.all('/', async (ctx) => {
    // ctx.body = 'heell';
    const action = ctx.query.action;
    console.log(action);
    if (action === 'config') {
        ctx.body = defaultConfig;
    } else if (action === 'uploadimage' || action === 'uploadvideo' || action === 'uploadfile') {
        let result = await uploadFileToQiNiu(ctx);
        // console.log(result);
        ctx.body = {
            state: 'SUCCESS',
            url: qiniuUtils.getUrl(result.key),
            title: result.key,
            original: result.key
        };
    }
});


function uploadFileToQiNiu(ctx, options = {}) {
    let req = ctx.req;
    let res = ctx.res;
    let busboy = new Busboy({
        headers: req.headers
    });

    return new Promise((resolve, reject) => {
        busboy.on('file', function(fieldName, file, filename, encoding, mimetype) {
            let key = (new Date()).getTime() + filename;
            qiniuUtils.qiniuUploadWithStream(key, file).then(resolve).catch(reject);
        });
        req.pipe(busboy);
    });
}




module.exports = router;
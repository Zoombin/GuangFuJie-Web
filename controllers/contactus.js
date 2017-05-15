const contactUsService = require('../services/contactus');
const _ = require('lodash');

module.exports = {
    async handlerContactUsForm(ctx) {
        let param = ctx.request.body;
        let strs = [];
        let result = {
            success: false,
            msg: '',
            data: null,
            code: ''
        };
        console.log(param);
        if (param.name) strs.push(`name:${param.name}`);
        if (param.tel) strs.push(`tel:${param.tel}`);
        if (param.address) strs.push(`address:${param.address}`);
        if (param.area) strs.push(`area:${param.area}`);
        if (param.msg) strs.push(`msg:${param.msg}`);
        console.log(strs);

        let resData = await contactUsService.insertNeeds(strs);
        console.log(resData);
        if (!resData) result.msg = '提交失败';
        else {
            result.success = true;
            result.msg = '操作成功';
        }

        ctx.body = result;

    }
}
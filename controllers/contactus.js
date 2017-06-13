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
        // console.log(param);
        if (param.name) strs.push(`name:${param.name}`);
        if (param.tel) strs.push(`tel:${param.tel}`);
        if (param.address) strs.push(`address:${param.address}`);
        if (param.area) strs.push(`area:${param.area}`);
        if (param.msg) strs.push(`msg:${param.msg}`);
        // console.log(strs);

        let resData = await contactUsService.insertNeeds(strs);
        // console.log(resData);
        if (!resData) result.msg = '提交失败';
        else {
            result.success = true;
            result.msg = '操作成功';
        }

        ctx.body = result;

    },

    async contactPagition(ctx) {
         let params = ctx.query;
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };
        if (!params.offset || !params.limit) {
            result.code = 'INVALID_PARAM';
            result.msg = pageCode.INVALID_PARAM;
        } else {
            let contactUsData = await contactUsService.getPagitionContactUsData({
                offset: params.offset,
                limit: params.limit,
                order: params.order,
                sort: params.sort
            });

            result.success = true;
            result.msg = '操作成功';
            result.data = contactUsData;
        }
        ctx.body = result;
    }
}
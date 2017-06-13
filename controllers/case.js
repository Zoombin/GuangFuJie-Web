const successCaseService = require('../services/case');
const pagitionCode = require('../codes/pagition');
const _ = require('lodash');
module.exports = {
    async casePagition(ctx) {
        let params = ctx.query;
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };

        if (!params.offset || !params.limit) {
            result.code = 'INVALID_PARAM';
            result.msg = pagitionCode.INVALID_PARAM;
        } else {
            let caseData = await successCaseService.getPagitionCaseData({
                offset: params.offset,
                limit: params.limit,
                order: params.order,
                sort: params.sort
            });

            result.success = true;
            result.msg = '操作成功';
            result.data = caseData;
        }

        ctx.body = result;
    }
}
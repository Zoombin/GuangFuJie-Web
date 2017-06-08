const bannerService = require('../services/banner');
const pageCode = require('../codes/pagition');
const _ = require('lodash');
module.exports = {
    async bannerPagition(ctx) {
        let params = ctx.query;
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };
        // console.log(params);
        // console.log(_.has(params, 'offset'));
        // console.log(_.has(params, 'limit'));
        // console.log(_.has(params, 'order'));
        if (!params.offset || !params.limit) {
            result.code = 'INVALID_PARAM';
            result.msg = pageCode.INVALID_PARAM;
        } else {
            let bannerData = await bannerService.getPagitionBannerData({
                offset: params.offset,
                limit: params.limit,
                order: params.order,
                sort: params.sort
            });

            result.success = true;
            result.msg = '操作成功';
            result.data = bannerData;
        }

        ctx.body = result;
    }
}
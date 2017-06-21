const bannerService = require('../services/banner');
const pageCode = require('../codes/pagition');
const bannerCode = require('../codes/banner');
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
                order: params.order || 'desc',
                sort: params.sort || 'sort_order'
            });

            result.success = true;
            result.msg = '操作成功';
            result.data = bannerData;
        }

        ctx.body = result;
    },
    async insertBanner(ctx) {
        let params = ctx.request.body;
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };
        let { src, isActive, sortOrder } = params;
        if (!src) {
            result.code = 'INVALID_PARAM';
            result.msg = bannerCode.INVALID_PARAM;
        } else {
            let bannerRes = await bannerService.insertBannerData({
                // src,
                // isActive,
                // sortOrder
                src,
                is_active: isActive,
                sort_order: sortOrder
            });
            if (!bannerRes) {
                result.code = 'ERROR_SYS';
                result.msg = bannerCode.ERROR_SYS;
            } else {
                result.success = true;
                result.msg = '操作成功';
                result.data = bannerRes;
            }
        }

        ctx.body = result;
    },
    async batchDelete(ctx) {
        let params = ctx.request.body;
        let ids = params.ids;
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };
        if (!_.isArray(ids) && !_.isNumber(ids)) {
            result.code = 'INVALID_PARAM';
            result.msg = bannerCode.INVALID_PARAM;
        } else {
            let bannerRes = await bannerService.batchDelete(ids);
            if (bannerRes) {
                result.success = true;
                result.msg = '操作成功';
                result.data = bannerRes;
            }
        }
        ctx.body = result;
    },
    async update(ctx) {
        let params = ctx.request.body;
        let data = {};
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };
        if (!params.id) {
            result.code = 'INVALID_PARAM';
            result.msg = bannerCode.INVALID_PARAM;
            return ctx.body = result;
        }
        // console.log(params.isActive);
        if (!_.isUndefined(params.src)) data.src = params.src;
        if (!_.isUndefined(params.isActive)) data.is_active = params.isActive;
        if (!_.isUndefined(params.sortOrder)) data.sort_order = params.sortOrder;
        // console.log(data);

        let bannerRes = await bannerService.updateBanner(data, params.id);

        if (!bannerRes) {
            result.code = 'INVALID_PARAM';
            result.msg = bannerCode.INVALID_PARAM;
            // return ctx.body = result;
        } else {
            result.success = true;
            result.msg = '操作成功';
            result.data = bannerRes;
        }

        return ctx.body = result;
    }
}
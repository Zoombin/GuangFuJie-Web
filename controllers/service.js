const serviceService = require('../services/service');
const pageCode = require('../codes/pagition');
const serviceCode = require('../codes/service');
const _ = require('lodash');
module.exports = {
    async servicePagition(ctx) {
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
            let bannerData = await serviceService.getPagitionServiceData({
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
    async insertService(ctx) {
        let params = ctx.request.body;
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };
        let { src, isActive, sortOrder, title } = params;
        if (!src) {
            result.code = 'INVALID_PARAM';
            result.msg = serviceCode.INVALID_PARAM;
        } else {
            let serviceRes = await serviceService.insertServiceData({
                // src,
                // isActive,
                // sortOrder
                src,
                title,
                is_active: isActive,
                sort_order: sortOrder
            });
            if (!serviceRes) {
                result.code = 'ERROR_SYS';
                result.msg = serviceCode.ERROR_SYS;
            } else {
                result.success = true;
                result.msg = '操作成功';
                result.data = serviceRes;
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
            result.msg = serviceCode.INVALID_PARAM;
        } else {
            let serviceRes = await serviceService.batchDelete(ids);
            if (serviceRes) {
                result.success = true;
                result.msg = '操作成功';
                result.data = serviceRes;
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
            result.msg = serviceCode.INVALID_PARAM;
            return ctx.body = result;
        }
        // console.log(params.isActive);
        if (!_.isUndefined(params.src)) data.src = params.src;
        if (!_.isUndefined(params.isActive)) data.is_active = params.isActive;
        if (!_.isUndefined(params.sortOrder)) data.sort_order = params.sortOrder;
        if (!_.isUndefined(params.title)) data.title = params.title;
        // console.log(data);

        let serviceRes = await serviceService.updateService(data, params.id);

        if (!serviceRes) {
            result.code = 'INVALID_PARAM';
            result.msg = serviceCode.INVALID_PARAM;
            // return ctx.body = result;
        } else {
            result.success = true;
            result.msg = '操作成功';
            result.data = serviceRes;
        }

        return ctx.body = result;
    }
}
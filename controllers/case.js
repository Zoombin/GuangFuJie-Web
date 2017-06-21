const successCaseService = require('../services/case');
const pagitionCode = require('../codes/pagition');
const caseCode = require('../codes/case');
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
                order: params.order || 'desc',
                sort: params.sort || 'sort_order',
                search: params.search || ''
            });

            result.success = true;
            result.msg = '操作成功';
            result.data = caseData;
        }

        ctx.body = result;
    },
    async insertCase(ctx) {
        let params = ctx.request.body;
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };

        let {src, isActive, sortOrder, title, desc, content} = params;
        if (!src) {
            result.code = 'INVALID_PARAM';
            result.msg = caseCode.INVALID_PARAM;
        } else {
            let caseRes = await successCaseService.insertCase({
                src,
                is_active: isActive,
                sort_order: sortOrder,
                title,
                desc,
                content
            });
            if (!caseRes) {
                result.code = 'ERROR_SYS';
                result.msg = caseCode.ERROR_SYS;
            } else {
                result.success = true;
                result.msg = '操作成功';
                result.data = caseRes;
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
            result.msg = caseCode.INVALID_PARAM;
        } else {
            let caseRes = await successCaseService.batchDelete(ids);
            if (caseRes) {
                result.success = true;
                result.msg = '操作成功';
                result.data = caseRes;
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
            result.msg = caseCode.INVALID_PARAM;
            return ctx.body = result;
        }

        if (!_.isUndefined(params.src)) data.src = params.src;
        if (!_.isUndefined(params.isActive)) data.is_active = params.isActive;
        if (!_.isUndefined(params.sortOrder)) data.sort_order = params.sortOrder;
        if (!_.isUndefined(params.title)) data.title = params.title;
        if (!_.isUndefined(params.desc)) data.desc = params.desc;
        if (!_.isUndefined(params.imgSize)) data.image_size = params.imgSize;
        if (!_.isUndefined(params.content)) data.content = params.content;

        let caseRes = await successCaseService.updateCase(data, params.id);

        if (!caseRes) {
            result.code = 'INVALID_PARAM';
            result.msg = caseCode.INVALID_PARAM;
        } else {
            result.success = true;
            result.msg = '操作成功';
            result.data = caseRes;
        }

        return ctx.body = result;
    }
}
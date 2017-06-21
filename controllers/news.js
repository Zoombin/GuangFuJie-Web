const newsService = require('../services/news');
const pagitionCode = require('../codes/pagition');
const newsCodes = require('../codes/news');
const _ = require('lodash');
module.exports = {
    async newsPagition(ctx) {
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
            let caseData = await newsService.getPagitionNewsData({
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
    async insertNews(ctx) {
        let params = ctx.request.body;
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };

        let {src, isActive, sortOrder, title, link, content} = params;
        if (!src) {
            result.code = 'INVALID_PARAM';
            result.msg = newsCodes.INVALID_PARAM;
        } else {
            let newsRes = await newsService.insertNews({
                src,
                is_active: isActive,
                sort_order: sortOrder,
                title,
                link,
                content
            });
            if (!newsRes) {
                result.code = 'ERROR_SYS';
                result.msg = newsCodes.ERROR_SYS;
            } else {
                result.success = true;
                result.msg = '操作成功';
                result.data = newsRes;
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
            result.msg = newsCodes.INVALID_PARAM;
        } else {
            let newsRes = await newsService.batchDelete(ids);
            if (newsRes) {
                result.success = true;
                result.msg = '操作成功';
                result.data = newsRes;
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
            result.msg = newsCodes.INVALID_PARAM;
            return ctx.body = result;
        }

        if (!_.isUndefined(params.src)) data.src = params.src;
        if (!_.isUndefined(params.isActive)) data.is_active = params.isActive;
        if (!_.isUndefined(params.sortOrder)) data.sort_order = params.sortOrder;
        if (!_.isUndefined(params.title)) data.title = params.title;
        if (!_.isUndefined(params.link)) data.link = params.link;
        if (!_.isUndefined(params.content)) data.content = params.content;
        // if (!_.isUndefined(params.imgSize)) data.image_size = params.imgSize;

        let newsRes = await newsService.updateNews(data, params.id);

        if (!newsRes) {
            result.code = 'INVALID_PARAM';
            result.msg = newsCodes.INVALID_PARAM;
        } else {
            result.success = true;
            result.msg = '操作成功';
            result.data = newsRes;
        }

        return ctx.body = result;
    }
}
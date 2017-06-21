const teamService = require('../services/team');
const pageCode = require('../codes/pagition');
const teamCode = require('../codes/team');
const _ = require('lodash');
module.exports = {
    async teamPagition(ctx) {
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
            let teamRes = await teamService.getPagitionTeamData({
                offset: params.offset,
                limit: params.limit,
                order: params.order || 'desc',
                sort: params.sort || 'sort_order'
            });

            result.success = true;
            result.msg = '操作成功';
            result.data = teamRes;
        }

        ctx.body = result;
    },
    async insertTeam(ctx) {
        let params = ctx.request.body;
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };
        let { src, isActive, sortOrder, name, job, desc } = params;
        if (!src) {
            result.code = 'INVALID_PARAM';
            result.msg = teamCode.INVALID_PARAM;
        } else {
            let teamRes = await teamService.insertTeamData({
                src,
                is_active: isActive,
                sort_order: sortOrder,
                name,
                job,
                desc
            });
            if (!teamRes) {
                result.code = 'ERROR_SYS';
                result.msg = teamCode.ERROR_SYS;
            } else {
                result.success = true;
                result.msg = '操作成功';
                result.data = teamRes;
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
            result.msg = teamCode.INVALID_PARAM;
        } else {
            let teamRes = await teamService.batchDelete(ids);
            if (teamRes) {
                result.success = true;
                result.msg = '操作成功';
                result.data = teamRes;
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
            result.msg = teamCode.INVALID_PARAM;
            return ctx.body = result;
        }
        // console.log(params.isActive);
        if (!_.isUndefined(params.src)) data.src = params.src;
        if (!_.isUndefined(params.isActive)) data.is_active = params.isActive;
        if (!_.isUndefined(params.sortOrder)) data.sort_order = params.sortOrder;
        if (!_.isUndefined(params.name)) data.name = params.name;
        if (!_.isUndefined(params.job)) data.job = params.job;
        if (!_.isUndefined(params.desc)) data.desc = params.desc;
        // console.log(data);

        let teamRes = await teamService.updateTeam(data, params.id);

        if (!teamRes) {
            result.code = 'INVALID_PARAM';
            result.msg = teamCode.INVALID_PARAM;
            // return ctx.body = result;
        } else {
            result.success = true;
            result.msg = '操作成功';
            result.data = teamRes;
        }

        return ctx.body = result;
    }
}
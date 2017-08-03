const Promise = require('bluebird');
const { gfjQuery } = require('../utils/db-utils');

module.exports = {
    async provinceList(ctx) {
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };
        let sql = 'SELECT * FROM  `gfj_province`';
        let response = null;
        try {
            response = await gfjQuery(sql, []);
        } catch (error) {
            result.msg = '查询出错';
        }

        if (response) {
            result.success = true;
            result.msg = '操作成功';
            result.data = response;
        } 

        return ctx.body = result;
    },
    async cityList(ctx) {
        let {provinceId} = ctx.query;
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };
        let sql = 'SELECT * FROM `gfj_city` WHERE `father_id` = ?';
        let response = null;
        try {
            response = await gfjQuery(sql, [provinceId]);
        } catch (error) {
            result.msg = '查询出错';
        }

        if (response) {
            result.success = true;
            result.msg = '操作成功';
            result.data = response;
        } 
        return ctx.body = result;
    },
    async areList(ctx) {
        let {cityId} = ctx.query;
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };
        let sql = 'SELECT * FROM `gfj_area` WHERE `father_id` = ?';
        let response = null;
        try {
            response = await gfjQuery(sql, [cityId]);
        } catch (error) {
            result.msg = '查询出错';
        }

        if (response) {
            result.success = true;
            result.msg = '操作成功';
            result.data = response;
        } 
        return ctx.body = result;
    }
}


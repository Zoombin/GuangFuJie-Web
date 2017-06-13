const {dbUtils} = require('../utils');
const Promise = require('bluebird');
const _  = require('lodash');
const banner = {
    async getHomeBanners() {
        // console.log('banner');
        let sql = 'SELECT '+
                    '`id`, ' +
                    '`src`, '+
                    '`link` '+
                  'FROM `banner` '+
                  'WHERE `is_active` = 1 '+
                  'ORDER BY `sort_order` DESC '+
                  'LIMIT 0,3';
        let result = await dbUtils.query(sql);
        // console.log(result);
        if (!_.isArray(result)) return null;
        // if (result.length !== 4) return null;
        return result;
    },
    async getLimitBannersSortByOneField(offset = 0, limit = 10, sort = 'sort_order', order = 'DESC') {
        let subSql = 'SELECT * FROM `banner` ORDER BY ' + sort + ' ' + order.toUpperCase();
        let result = await dbUtils.getListAndCount(subSql, offset, limit);

        if (_.isArray(result) && result.length === 2) return result;
        else return null;
    }
}

module.exports = banner;
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
    // async getCountBySubSql() {
    //     let subSql = 'SELECT * FROM `banner` ORDER BY `sort_order` DESC';
    //     let result = dbUtils.getCountBySubSql(subSql);
    //     if (_.isArray(result) && result.length === 1 && result[0].count) result = result[0].count;
    //     else result = null;
    //     return result;

    // },
    async getLimitBannersSortByOneField(offset = 0, limit = 10, sort = 'sort_order', order = 'DESC') {
        // let offset = data.offset || 0;
        // let limit = data.limit || 10;
        // let order = data.order || 'DESC';
        let subSql = 'SELECT * FROM `banner` ORDER BY ' + sort + ' ' + order.toUpperCase();
        let limitSql = subSql + ' LIMIT ?,?'
        let countSql = 'SELECT COUNT(*) AS `count` FROM ('+ subSql +') t';
        let result = await Promise.all([
            dbUtils.query(limitSql, [offset * 1, limit * 1]),
            dbUtils.query(countSql)
        ]).catch(error => console.log(error));

        if (_.isArray(result) && result.length === 2) return result;
        else return null;
    }
}

module.exports = banner;


// banner.getFourBanners().then(result => console.log(result));
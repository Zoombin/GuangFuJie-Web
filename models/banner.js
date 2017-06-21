const {dbUtils} = require('../utils');
const Promise = require('bluebird');
const _  = require('lodash');

const baseFactory = require('./base');

const banner = Object.assign(baseFactory('banner', [
    'id',
    'src',
    'link',
    'title',
    'is_active',
    'sort_order',
    'created_date',
    'update_date'
]), {
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
    }
});


module.exports = banner;
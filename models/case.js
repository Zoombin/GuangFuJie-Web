const {dbUtils} = require('../utils');
const _ = require('lodash');
const baseFactory = require('./base');

const successCase = Object.assign(baseFactory('case', [
    'id',
    'src',
    'image_size',
    'link',
    'desc',
    'is_active',
    'sort_order',
    'title',
    'content',
    'created_date',
    'update_date'
]), {
    async getOneBig() {
        // console.log('case--1');
        let sql = 'SELECT ' +
                    '`id`, ' +
                    '`link`, ' +
                    '`src`, '  +
                    '`title` ,' +
                    '`desc` ' +
                  'FROM `case` ' +
                  'WHERE `image_size` = 1 AND `is_active` = 1 ' +
                  'ORDER BY `sort_order` DESC ' +
                  'LIMIT 0,1';
        let result = await dbUtils.query(sql);
        if (_.isArray(result) && result.length === 1) result = result[0];
        else result = null;

        return result;
    },
    async getFourSmall() {
        // console.log('case--2');
        let sql = 'SELECT ' +
                    '`id`, ' +
                    '`src`, '  +
                    '`link`, ' +
                    '`title` ,' +
                    '`desc` ' +
                  'FROM `case` ' +
                  'WHERE `image_size` = 2 AND `is_active` = 1 ' +
                  'ORDER BY `sort_order` DESC ' +
                  'LIMIT 0,4';
        let result = await dbUtils.query(sql);
        if (!_.isArray(result)) return null;
        if (result.length !== 4) return null;
        return result;
    }

});
module.exports = successCase;
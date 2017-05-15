const {dbUtils} = require('../utils');
const _ = require('lodash');
const news = {
    async getSixNews() {
        console.log('news');
        let sql = 'SELECT ' +
                    '`id`, ' +
                    '`src`, ' +
                    '`link`, ' +
                    '`title`, ' +
                    '`created_date` AS `date`' +
                  'FROM `news` ' +
                  'WHERE `is_active` = 1 '
                  'ORDER BY `created_date` DESC ' +
                  'LIMIT 0,6';
        let result = await dbUtils.query(sql);
        if (!_.isArray(result)) return null;
        if (result.length !== 6) return null;
        return result;
    }
}

module.exports = news;
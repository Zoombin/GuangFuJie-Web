const {dbUtils} = require('../utils');
const _ = require('lodash');
const baseFactory = require('./base');
const news = Object.assign(baseFactory('news', [
    'id',
    'src',
    'link',
    'is_active',
    'sort_order',
    'title',
    'content',
    'desc',
    'created_date',
    'update_date'
]), {
    async getHomeNews() {
        console.log('news');
        let sql = 'SELECT ' +
                    '`id`, ' +
                    '`src`, ' +
                    '`link`, ' +
                    '`title`, ' +
                    '`created_date` AS `date` ' +
                  'FROM `news` ' +
                  'WHERE `is_active` = 1 ' +
                  'ORDER BY `created_date` DESC ' +
                  'LIMIT 0, 4';
        console.log(sql);
        let result = await dbUtils.query(sql);
        console.log('=========================', result.length);
        if (!_.isArray(result)) return null;
        // if (result.length !== 6) return null;
        return result;
    },
    async getArticle(id) {
        let sql = 'SELECT `content` FROM `news` WHERE id = ?';
        let result = await dbUtils.query(sql, [id]);
        return result;
    }
});
module.exports = news;
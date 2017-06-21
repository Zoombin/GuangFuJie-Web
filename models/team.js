const {dbUtils} = require('../utils');
const _ = require('lodash');
const baseFactory = require('./base');
const team = Object.assign(baseFactory('team', [
    'id',
    'src',
    'name',
    'job',
    'desc',
    'sort_order',
    'is_active',
    'created_date',
    'update_date'
]), {
    async getIndexTeams() {
        console.log('team');
        let sql = 'SELECT ' +
                    '`id`, ' +
                    '`src`, ' +
                    '`name`, ' +
                    '`job`, ' +
                    '`desc` ' +
                  'FROM `team` '
                  'WHERE `is_active` = 1 ' +
                  'ORDER BY `sort_order` DESC ';
        let result = await dbUtils.query(sql);
        if (!_.isArray(result)) return null;
        return result;
    }
});
module.exports = team;
const {dbUtils} = require('../utils');
const _ = require('lodash');
const team = {
    async getTeams() {
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
}

module.exports = team;
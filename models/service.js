const {dbUtils} = require('../utils');
const _ = require('lodash');
const service = {
    async getHomeServices() {
        console.log('service');
        let sql = 'SELECT '+
                    '`id`, ' +
                    '`src`, '+
                    '`link`, '+
                    '`title` '+
                  'FROM `service` '+
                  'WHERE `is_active` = 1 '+
                  'ORDER BY `sort_order` DESC '+
                  'LIMIT 0,6';
        let result = await dbUtils.query(sql);
        if (!_.isArray(result)) return null;
        // if (result.length !== 6) return null;
        return result;
    }
}

module.exports = service;
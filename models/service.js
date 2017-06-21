const {dbUtils} = require('../utils');
const _ = require('lodash');
const baseFactory = require('./base');

const service = Object.assign(baseFactory('service', [
    'id',
    'src',
    'link',
    'title',
    'is_active',
    'sort_order',
    'created_date',
    'update_date'
]), {
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
});

// const service = {
//     async getLimitServiceSortByOneField(offset = 0, limit = 10, sort = 'sort_order', order = 'DESC') {
//         let subSql = 'SELECT * FROM `service` ORDER BY ' + sort + ' ' + order.toUpperCase();
//         let result = await dbUtils.getListAndCount(subSql, offset, limit);
//         if (_.isArray(result) && result.length === 2) return result;
//         else return null;
//     },
//     async insertNewService(src = '', isActive = 0, title = '', sortOrder = 50) {
//         let result = await dbUtils.insertData(
//             ['banner'],
//             ['src', 'is_active', 'sort_order', 'title'],
//             [src, isActive, sortOrder, title]
//         );
//         if (_.isObject(result) && result.affectedRows === 1) return result;
//         else return null;
//     },
//     async editService(data = {}, id) {
//         let result = await dbUtils.updateDataById(['service'], data, id);
//         if (result) {
//             result = await dbUtils.findAllDataById(['service'], id);
//         }
//         return result;
//     },
//     async batchDelete(ids = []) {
//         let result = await dbUtils.batchDeleteByIds(['service'], ids);
//     }
// }

module.exports = service;
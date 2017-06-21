const {dbUtils} = require('../utils');
const Promise = require('bluebird');
const _ = require('lodash');
const baseFactory = require('./base');

const contactUs = Object.assign(baseFactory('contactus', [
    'id',
    'name',
    'tel',
    'address',
    'area',
    'msg',
    'created_date',
    'update_date',
    'is_contact'
]), {
    async insert(strList = []) {
        let fields = strList.map(str => str.split(':')[0].trim());
        let values = strList.map(str => str.split(':')[1].trim());
        values.unshift(fields);
        let sql = 'INSERT INTO `contactus` (??, `created_date`, `update_date`) VALUES('+ _.repeat('?,', strList.length) +' NOW(), NOW())';
        // console.log(param);
        let result = await dbUtils.query(sql, values);
        if (!result.affectedRows === 1) result = null;
        return result;
    }
});
// const contactUs = {
//     async getLimitSortByOneField(offset = 0, limit = 10, sort = 'created_date', order = 'DESC') {
//         let subSql = 'SELECT * FROM `contactus` ORDER BY ' + sort + ' ' + order.toUpperCase();
//         let result = await dbUtils.getListAndCount(subSql, offset, limit);
//         if (_.isArray(result) && result.length === 2) return result;
//         else return null;
//     }
// }

module.exports = contactUs;
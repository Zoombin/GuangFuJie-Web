const {dbUtils} = require('../utils');
const Promise = require('bluebird');
const _ = require('lodash');

const contactUs = {
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
}

module.exports = contactUs;
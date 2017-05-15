const {dbUtils} = require('../utils');
const _ = require('lodash');
const user = {
    async getUserInfoByName(username, password) {
        let sql = 'SELECT * FROM `admin` WHERE username = ? AND password = ?';
        let result = await dbUtils.query(sql, [username, password]);
        if (_.isArray(result) && result.length === 1) result = result[0];
        else result = null;
        return result;
    }
}

module.exports = user;
const {dbUtils} = require('../utils');
const Promise = require('bluebird');
const _  = require('lodash');

function isOk(all, part) {
    let flag = true;
    for(let i = 0; i < part.length; i++) {
        let a = part[i];
        flag = all.includes(a);
        if (!flag) return false;
    }
    return true;
}

module.exports = function (tbName, colNames) {
    return {
        async baseSelect(cols, id) {
            if (!_.isArray(cols)) return null;
            if (!isOk(colNames, cols)) return null;
            let result = await dbUtils.findPartDataById(tbName, cols, id);
            return result;
        },
        async basePagination(cols, offset, limit, sort, order) {
            if (!_.isArray(cols)) return null;
            // console.log(sort);
            if (!colNames.includes(sort)) return null;
            // console.log('ccc');
            if (!isOk(colNames, cols)) return null;
            // let result = null;
            let result = await dbUtils.getListAndCount(cols, tbName, sort, order, offset, limit);
            // if (!search) {
            //     result = await dbUtils.getListAndCount(cols, tbName, sort, order, offset, limit);
            // } else {
            //     result = await dbUtils.getListAndCountWithSearch(cols, tbName, sort, order, offset, limit)
            // }
            if (_.isArray(result) && result.length === 2) return result;
            else return null;
        },
        async basePaginationWithSearch(cols, offset, limit, sort, order, searchKeys, search) {
            if (!_.isArray(cols)) return null;
            // console.log(sort);
            if (!colNames.includes(sort)) return null;
            // console.log('ccc');
            if (!isOk(colNames, cols)) return null;
            if (!isOk(colNames, searchKeys)) return null;
            if (!search) return null;
            // let result = null;
            // let result = await dbUtils.getListAndCount(cols, tbName, sort, order, offset, limit);
            // if (!search) {
            //     result = await dbUtils.getListAndCount(cols, tbName, sort, order, offset, limit);
            // } else {
            let result = await dbUtils.getListAndCountWithSearch(cols, tbName, sort, order, offset, limit, searchKeys, search);
            // }
            if (_.isArray(result) && result.length === 2) return result;
            else return null;
        },
        async baseInsert(data, cb = null) {
            if (!_.isObject(data)) return null;
            let pairs = _.toPairs(data);
            if (!pairs.length) return null;
            let fields = pairs.map(item => item[0]);
            let values = pairs.map(item => item[1]);
            if (!isOk(colNames, fields)) return null;
            let result = await dbUtils.insertData(tbName, fields, values);
            cb && cb(result);
            return result;
        },
        async baseDelete(id) {
            console.log(id);
            if (!_.isNumber(id) && !_.isArray(id)) return null;
            // if (!_.isArray(id)) id = [id];
            if (_.isNumber(id)) id = [id];
            let result = await dbUtils.batchDeleteByIds(tbName, id);
            return result;
        },
        async baseEdit(data, id) {
            if (!_.isObject(data)) return null;
            if (!_.isNumber(id)) return null;
            let result = await dbUtils.updateDataById(tbName, data, id);
            result = await dbUtils.findAllDataById(tbName, id);
            return result;
        }
    };
}
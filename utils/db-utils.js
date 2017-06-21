const {database} = require('../config');
const Promise = require('bluebird');
const _ = require('lodash');
const mysql = require('mysql');

const pool = mysql.createPool({
    host: database.host,
    user: database.user,
    port: database.port,
    password: database.password,
    database: database.db,
    dateStrings: true
});

let query = function(sql, param = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) resolve(err);
            else {
                connection.query(sql, param, (err, rows) => {
                    console.log(sql);
                    if (err) reject(err);
                    else resolve(rows);
                    connection.release();
                });
            }
        });
    });
};

let findAllDataById = function(table, id) {
    let sql = 'SELECT * FROM ?? WHERE id = ?';
    return query(sql, [[table], id]);
};

let findPartDataById = function(table, columns, id) {
    let sql = 'SELECT ?? FROM ?? WHERE id = ?';
    return query(sql, [columns, [table], id]);
};

let findDataByPage = function(table, keys, start, end) {
    let  sql =  "SELECT ?? FROM ??  LIMIT ? , ?"
    return query(sql, [keys,  table,  start, end ]);
};

let insertData = function(table, fields, values) {
    let len = values.length;
    let array = new Array(len).fill('?');
    let sql = 'INSERT INTO ?? (??, `created_date`, `update_date`) VALUES('+ array.join(',') +', NOW(), NOW())';
    return query(sql, [[table], fields, ...values]);
};

let updateDataById = function(table, data, id) {
    // [[key, value], [key, vlaue]]
    let pairs = _.toPairs(data);
    if (!pairs.length) return null;
    let str = pairs.map(item => `\`${item[0]}\` = ?`).join(',');
    let params = pairs.map(item => item[1]);
    // let str = keys.map(key => `${key} = ?`).join(',');
    let sql = 'UPDATE ?? SET ' + str + ' ,`update_date` = NOW() WHERE id = ?';
    console.log(sql);
    // console.log()
    // console.log([table, ...params, id]);
    return query(sql, [[table], ...params, id]);
};

let getCount = function(table) {
    let sql = 'SELECT COUNT(*) as count FROM ??';
    return query(sql, [table]);
};

let getCountBySubSql = function(subSql, param) {
    let sql = 'SELECT COUNT(*) as count FROM (' + subSql + ') t';
    return query(sql, param);
};

let deleteDataById = function(table, id) {
    let sql = 'DELETE FROM ?? WHERE id = ?';
    return query(sql, [table, id]);
};

let batchDeleteByIds = function(table, ids) {
    let len = ids.length;
    let array = new Array(len).fill('?');
    let sql = 'DELETE FROM ?? WHERE `id` in ('+ array.join(',') +')';
    return query(sql, [[table], ...ids]);
};

let getListAndCount = function(cols, tbName, sort, order, offset, limit) {
    // console.log(cols, tbName, sort, order, offset, limit);
    let subSql = 'SELECT ?? FROM ?? ORDER BY ' + sort + ' ' + order.toUpperCase();
    offset = parseInt(offset, 10);
    limit = parseInt(limit, 10);
    // if (baseParam.length > 0) param = baseParam;
    let limitSql = subSql + ' LIMIT ?, ?';
    let countSql = 'SELECT COUNT(*) as `count` FROM ('+ subSql +') t';
    return Promise.all([
        query(limitSql, [cols, [tbName], offset * limit, limit]),
        query(countSql, [cols, [tbName]])
    ]);
};

let getListAndCountWithSearch = function(cols, tbName, sort, order, offset, limit, searchKeys, search) {
    // console.log(cols, tbName, sort, order, offset, limit);
    let str = searchKeys.map(function(item, index) {
        return `${item} like '%${search}%'`;
    }).join(' OR ');
    let subSql = 'SELECT ?? FROM ?? WHERE '+ str +' ORDER BY ' + sort + ' ' + order.toUpperCase();
    offset = parseInt(offset, 10);
    limit = parseInt(limit, 10);
    // if (baseParam.length > 0) param = baseParam;
    let limitSql = subSql + ' LIMIT ?, ?';
    let countSql = 'SELECT COUNT(*) as `count` FROM ('+ subSql +') t';
    return Promise.all([
        query(limitSql, [cols, [tbName], offset * limit, limit]),
        query(countSql, [cols, [tbName]])
    ]);
};

// batchDeleteByIds(['banner'], [110,111]).then(rows => console.log(rows)).catch(error => console.log(error));
// updateDataById(['banner'], { src: 'dsfdsfdsfds', title: 'fdsfdsfewfdsfds'}, 141).then(rows => console.log(rows)).catch(error => console.log(error));

module.exports = {
    query,
    findAllDataById,
    findPartDataById,
    batchDeleteByIds,
    getCount,
    insertData,
    updateDataById,
    getCountBySubSql,
    deleteDataById,
    getListAndCount,
    getListAndCountWithSearch
};

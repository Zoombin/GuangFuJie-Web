const {database} = require('../config');
const Promise = require('bluebird');
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
}

let findAllDataById = function(table, id) {
    let sql = 'SELECT * FROM ? WHERE id = ?';
    return query(sql, [table, id]);
}

let findPartDataById = function(table, columns, id) {
    let sql = 'SELECT ?? FROM ?? WHERE id = ?';
    return query(sql, [columns, table, id]);
}

let findDataByPage = function(table, keys, start, end) {
    let  sql =  "SELECT ?? FROM ??  LIMIT ? , ?"
    return query(sql, [keys,  table,  start, end ]);
}

let insertData = function(table, fields, values) {
    let len = values.length;
    let array = new Array(len).fill('?');
    let sql = 'INSERT INTO ?? (??, `created_date`, `update_date`) VALUES('+ array.join(',') +', NOW(), NOW())';
    return query(sql, [table, fields, ...values]);
}

let getCount = function(table) {
    let sql = 'SELECT COUNT(*) as count FROM ??';
    return query(sql, [table]);
}

let getCountBySubSql = function(subSql, param) {
    let sql = 'SELECT COUNT(*) as count FROM (' + subSql + ') t';
    return query(sql, param);
}

let deleteDataById = function(table, id) {
    let sql = 'DELETE FROM ?? WHERE id = ?';
    return query(sql, [table, id]);
}

let getListAndCount = function(baseSql, offset, limit, baseParam = []) {
    let param = [];
    offset = parseInt(offset, 10);
    limit = parseInt(limit, 10);
    if (baseParam.length > 0) param = baseParam;
    let limitSql = baseSql + ' LIMIT ?, ?';
    let countSql = 'SELECT COUNT(*) as `count` FROM ('+ baseSql +') t';
    return Promise.all([
        query(limitSql, [...param, offset * limit, limit]),
        query(countSql)
    ]);
}

// getCountTwo('select `id` FROM `case` WHERE `image_size` = ?', [2]).then((rows) => console.log(rows)).catch(error => console.log(error));
// findPartDataById('banner', ['id', 'src'], 1).then(rows => console.log(rows)).catch(error => console.log(error));
// query('INSERT INTO `test` (??, `created_date`, `updated_date`) VALUES(?, ?, NOW(), NOW())', [['name', 'age'], 'wfh', '10'])
// .then(rows => console.log(rows)).catch(error => console.log(error));
module.exports = {
    query,
    findAllDataById,
    findPartDataById,
    getCount,
    insertData,
    getCountBySubSql,
    deleteDataById,
    getListAndCount
};
// insertData(['banner'], ['src', 'link', 'title'], ['1', '2', '3']).then(rows => {
//     console.log(rows);
// }).catch(error => console.log(error));

// let array = new Array(6).fill('?');
// console.log(array.join(','));

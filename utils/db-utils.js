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
    return query( sql, [keys,  table,  start, end ] )
}

let insertData = function(table, fields, values) {
    // let sql = 'INSERT '
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

// getCountTwo('select `id` FROM `case` WHERE `image_size` = ?', [2]).then((rows) => console.log(rows)).catch(error => console.log(error));
// findPartDataById('banner', ['id', 'src'], 1).then(rows => console.log(rows)).catch(error => console.log(error));
// query('INSERT INTO `test` (??, `created_date`, `updated_date`) VALUES(?, ?, NOW(), NOW())', [['name', 'age'], 'wfh', '10'])
// .then(rows => console.log(rows)).catch(error => console.log(error));
module.exports = {
    query,
    findAllDataById,
    findPartDataById,
    getCount,
    getCountBySubSql,
    deleteDataById
}

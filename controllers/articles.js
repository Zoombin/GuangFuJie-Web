// const http = require('http');
// // http://guangfujie.zoombin.com:8002/admin/articles/list?pagesize=10&start=0&_=1501736031241
// const options = {
//     // protocol: 'http:',
//     host: 'guangfujie.zoombin.com',
//     port: 8002,
//     method: 'GET',
//     path: '/admin/articles/list?pagesize=10&start=0',
//     headers: {
//         // 'Content-Encoding': 'gzip',
//         'Content-Type': 'application/json; charset=utf-8'
//     }
// };

// const req = http.request(options, function(res) {
//     res.setEncoding('utf8');
//     let data = '';
//     res.on('data', (chunk) => {
//         // console.log(`BODY: ${chunk}`);
//         // let data = JSON.parse(`"${chunk}"`);
//         data += chunk.toString('utf8');
//         // console.log(data);
//     });
//     res.on('end', () => {
//         data = JSON.parse(data);
//         console.log(data);
//         // console.log('No more data in response.');
//     });
// });

// req.on('error', function(e){
//      console.log('错误：' + e.message);
// });

// req.end();

// const http = require('http');
const Promise = require('bluebird');
const { gfjQuery } = require('../utils/db-utils');
const _ = require('lodash');
// function _getList(offset, limit) {
//     let options = {
//         // protocol: 'http:',
//         host: 'guangfujie.zoombin.com',
//         port: 8002,
//         method: 'GET',
//         path: `/admin/articles/list?pagesize=${limit}&start=${offset}`,
//         headers: {
//             // 'Content-Encoding': 'gzip',
//             'Content-Type': 'application/json; charset=utf-8'
//         }
//     };
//     return new Promise((resolve, reject) => {
//         let req = http.request(options, function(res) {
//             let data = '';
//             res.setEncoding('utf8');
//             res.on('data', function(chunk) {
//                 data += chunk.toString('utf8');
//             });
//             res.on('end', function() {
//                 data = JSON.parse(data);
//                 delete data.tpl;
//                 resolve(data);
//             });
//         });
//         req.on('error', reject);
//         req.end();
//     });
// }

module.exports = {
    async getList(ctx) {
        let params = ctx.query;
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };
        let { offset, limit, search, project } = params;
        let response = null;
        let param = [];
        // let sql = ''
        let sql = 'SELECT a.id, a.title, a.image, a.type_id, at.name as type, a.is_active, a.update_date, '+
            'a.province, a.city, a.area, a.content, ' +
            'concat_ws("--", p.name, c.name, ar.name) AS addName ' +
            'FROM `gfj_articles` AS a ' +
            'LEFT JOIN `gfj_articles_type` AS at ' +
            'ON a.type_id = at.id ' +
            'LEFT JOIN `gfj_province` AS p '+
            'ON a.province = p.province_id '+
            'LEFT JOIN `gfj_city` AS c '+
            'ON a.city = c.city_id '+
            'LEFT JOIN `gfj_area` as ar '+
            'ON a.area = ar.area_id '+
            'WHERE a.is_active = 1 AND a.project = ? ';
        
        if (search && search.trim() !== '') {
            sql += ' AND (a.title LIKE ? OR at.name LIKE ? OR concat_ws("--", p.name, c.name, ar.name) LIKE ? ) ';
            param.push('%'+ search.trim() +'%');
            param.push('%'+ search.trim() +'%');
            param.push('%'+ search.trim() +'%');
        } 
        sql += ' ORDER BY a.created_date DESC';
        let countSql = 'SELECT COUNT(*) AS count FROM (' + sql + ') t';
        let limitSql = sql + ' LIMIT ?, ?'
        try {
            response = await Promise.all([
                gfjQuery(limitSql, [project, ...param, offset * limit, limit * 1]),
                gfjQuery(countSql, [project, ...param])
            ]);
        } catch (error) {
            result.msg = '查询出错'
        }

        if (!response) {
            return ctx.body = result;
        } else {
            let articlesRes = response[0];
            let countRes = response[1];
            let total = countRes[0].count;
            console.log('wenzhang' + total);

            result.success = true;
            result.msg = '操作成功';
            result.data = {
                rows: articlesRes,
                total: total
            };

            return ctx.body = result;
        }
    },
    async batchDelete(ctx) {
        let params = ctx.request.body;
        let { ids, project } = params;
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        }
        
        if (_.isArray(ids) && ids.length > 0) {
            let array = new Array(ids.length);
            array.fill('?');
            // array.join(',');
            let sql = 'UPDATE `gfj_articles` SET `is_active` = 0 WHERE project = ? AND id in ('+ array.join(',') +')';
            let response = null;
            try {
                response = gfjQuery(sql, [project, ...ids]);
            } catch (error) {
                result.msg = '查询失败';
            }

            if (!response) {
                return ctx.body = result;
            } else {
                result.success = true;
                result.msg = '操作成功';
                return ctx.body = result;
            }

        } else {
            result.msg = '参数错误，未删除数据';
            return ctx.body = result;
        }
    },
    async typelist(ctx) {
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };
        let sql = 'SELECT * FROM  `gfj_articles_type`';
        let response = null;
        try {
            response = await gfjQuery(sql, []);
        } catch (error) {
            console.log(error);
            result.msg = '查询出错';
        }

        if (response) {
            result.success = true;
            result.msg = '操作成功';
            result.data = response;
        } 

        return ctx.body = result;
    },
    async editArt(ctx) {
        let params = ctx.request.body;
        let { id, src, isActive, title, type, province, city, area, content } = params;
        

        let sql = 'UPDATE `gfj_articles` SET title = ? , image = ?, type_id = ? , is_active = ?, province = ?, city = ?, area = ?, content = ?, update_date = NOW() WHERE id = ?';

        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };
        let response = null;
        try {
            response = await gfjQuery(sql, [title, src, type, isActive, province, city, area, content, id]);
        } catch (error) {
            console.log(error);
            result.msg = '查询出错';
        }

        if (response) {
            let sql = 'SELECT a.id, a.title, a.image, a.type_id, at.name as type, a.is_active, a.update_date, '+
            'a.province, a.city, a.area, a.content, ' +
            'concat_ws("--", p.name, c.name, ar.name) AS addName ' +
            'FROM `gfj_articles` AS a ' +
            'LEFT JOIN `gfj_articles_type` AS at ' +
            'ON a.type_id = at.id ' +
            'LEFT JOIN `gfj_province` AS p '+
            'ON a.province = p.province_id '+
            'LEFT JOIN `gfj_city` AS c '+
            'ON a.city = c.city_id '+
            'LEFT JOIN `gfj_area` as ar '+
            'ON a.area = ar.area_id '+
            'WHERE a.id = ?';
            let res = null;
            try {
                res = await gfjQuery(sql, [id]);
            } catch (error) {
                result.msg = '查询出错';
            }

            if (res) {
                result.success = true;
                result.msg = '操作成功';
                result.data = res;
            }
        }
        
        return ctx.body = result;
    },
    async newArt(ctx) {
        let params = ctx.request.body;
        let {src, isActive, title, type, province, city, area, content } = params;

        let sql = 'INSERT INTO `gfj_articles` SET title = ? , image = ?, type_id = ? , is_active = ?, province = ?, city = ?, area = ?, content = ?, created_date = NOW(), update_date = NOW()';

        
        let result = {
            success: false,
            msg: '',
            data: null,
            code: 0
        };
        let response = null;
        try {
            response = await gfjQuery(sql, [title, src, type, isActive, province, city, area, content]);
        } catch (error) {
            result.msg = '查询出错';
        }

        if (response) {
            result.success = true;
            result.msg = '操作成功';
            result.data = response;
        } 

        return ctx.body = result;
    }
}


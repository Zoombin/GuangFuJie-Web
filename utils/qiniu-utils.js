const Promise = require('bluebird');
const fs = require('fs');
const qiniu = require('node-qiniu');
const config = require('../config');

const ACCESS_KEY = config.qiniu.accessKey;
const SECRET_KEY = config.qiniu.secretKey;
const BUCKET = config.qiniu.bucket;
const DOMAIN_URL = config.qiniu.domainUrl;


qiniu.config({
    access_key: ACCESS_KEY,
    secret_key: SECRET_KEY
});

const gfjBucket = new qiniu.Bucket(BUCKET);


// function generatorToken(key, bucket = BUCKET) {
//     const putPolicy = new qiniu.rs.PutPolicy(`${bucket}:${key}`);
//     return putPolicy.token();
// }

// function qiniuUpload(key, filepath) {
//     return new Promise((resolve, reject) => {
//         if (!key) return reject(new Error('请传入key参数'));
//         if (!filepath) return reject(new Error('请传入filepath参数'));
//         let token = generatorToken(key, BUCKET);
//         qiniu.io.putFile(token, key, filepath, null, function(err, ret) {
//             if (err) return reject(err);
//             else {
//                 return resolve(ret);
//             }
//         });
//     });
// }

function qiniuUpload(key, filePath) {
    return gfjBucket.putFile(key, filePath);
}

function qiniuUploadWithStream(key, readingStream) {
    let puttingStream = gfjBucket.createPutStream(key);
    // let readingStream = fs.createReadStream(filePath);
    return new Promise((resolve, reject) => {
        readingStream
            .pipe(puttingStream)
            .on('error', reject)
            .on('end', resolve);
    });
}

function getAsset(key) {
    return gfjBucket.key(key);
}

function getUrl(key) {
    return `${DOMAIN_URL}${key}`;
}

function putToken(key) {
    return qiniu.genToken('put', {
        scope: `${BUCKET}:${key}`
    });
}

module.exports = {
    qiniuUpload,
    qiniuUploadWithStream,
    getAsset,
    getUrl,
    putToken
};
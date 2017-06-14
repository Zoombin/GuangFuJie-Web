const os = require('os');
const fs = require('fs');
const BusBoy = require('busboy');
const uuid = require('uuid');
const path = require('path');
const Promise = require('bluebird');



const {qiniuUploadWithStream} = require('./qiniu-utils');

// function getNameAndExt(fileName) {
//     let nameList = fileName.split('.')
//     let [...ret, ext] = nameList;

// }

// console.log(path.parse('afdsfds.jpg'));

function uploadPicture(ctx, options={}) {
    let req = ctx.req;
    let res = ctx.res;

    let busboy = new BusBoy({
        headers: req.headers
    });
    // console.log(req);
    console.log(req.headers);
    let pictureType = options.picType || 'common';
    return new Promise((resolve, reject) => {
        busboy.on('file', function(fieldName, file, fileName, encoding, mimeType) {
            // let key = 
            console.log(fieldName, fileName, encoding, mimeType);
            // file.pipe(fs.createWriteStream('./aa' + path.extname(fileName)));
            file.on('data', function(data) {
                console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
            });
            file.on('end', function() {
                resolve({
                    success: true
                });
            })
        });

        busboy.on('error', reject);

    });

}

module.exports = {
    uploadPicture
}
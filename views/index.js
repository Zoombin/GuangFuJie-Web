const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
const frontView = require('./frontView');
const backEndView = require('./backView');
const adminFilePath = path.join(__dirname, './admin.html');

const renderAdminFile = function() {
    return new Promise((resolve, reject) => {
        fs.readFile(adminFilePath, 'utf8', (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}
module.exports = {
    frontView,
    backEndView,
    renderAdminFile
}
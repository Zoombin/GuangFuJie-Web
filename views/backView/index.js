const pug = require('pug');
const path = require('path');

function compiledLogInFn(locals = {}) {
    return pug.compileFile(path.join(__dirname, '/pages/login.pug'))(locals);
}

function compiledAdminFn(locals = {}) {
    return pug.compileFile(path.join(__dirname, '/pages/admin.pug'))(locals);
}

module.exports = {
    compiledLogInFn,
    compiledAdminFn
};
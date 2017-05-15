const pug = require('pug');
const path = require('path');

// const renderFrontIndexFn = pug.compileFile

function compiledIndexFn(locals = {}) {
    return pug.compileFile(path.join(__dirname, '/pages/index.pug'))(locals);
}

function compiledCaseFn(locals = {}) {
    return pug.compileFile(path.join(__dirname, '/pages/case.pug'))(locals);
}

module.exports = {
    compiledIndexFn,
    compiledCaseFn
};
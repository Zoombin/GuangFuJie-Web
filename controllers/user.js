const userService = require('../services/user');
const userCode = require('../codes/user');

module.exports = {
    async signIn(ctx) {
        let userData = ctx.request.body;
        let result = {
            success: false,
            msg: '',
            data: null,
            code: ''
        };

        let userResult = await userService.signIn(userData);
        if (userResult) {
            if (userData.userName === userResult.username) {
                result.success = true;
            }
        } else {
            result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR';
            result.msg = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR;
        }

        if (result.success) {
            let session = ctx.session;
            session.isLogin = true;
            session.userName = userResult.username;
            session.userId = userResult.id;

            // ctx.redirect('/admin');
            // ctx.body = result;
        }
        ctx.body = result;
    }
}
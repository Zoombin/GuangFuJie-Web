const userModel = require('../models/user');
const user = {
    /**
     * 后台登录操作
     * @param {object} userData             用户名和密码
     * @param {string} userData.userName    用户名
     * @param {string} userData.password    密码
     * @return {object||null}               查询出的信息
     */
    async signIn(userData) {
        let user = await userModel.getUserInfoByName(userData.userName, userData.password);
        return user;
    }
}

module.exports = user;
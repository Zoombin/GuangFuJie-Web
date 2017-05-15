const contactUsModel = require('../models/contactus');
const _ = require('lodash');
module.exports = {
    /**
     * 首页用户联系我们表单处理
     * @return {object||null} 返回数据
     */
    async insertNeeds(strs = []) {
        let data = await contactUsModel.insert(strs);
        return data !== null;
    }
}

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
    },
    /**
     * 获取分页数据
     * @param {object} data 
     */
    async getPagitionContactUsData(data = {}) {
        let offset = data.offset;
        let limit = data.limit;
        let order = data.order;
        let sort = data.sort;

        let res = await contactUsModel.getLimitSortByOneField(offset, limit, sort, order);

        let bannerRes = res[0];
        let countRes = res[1];
        let total = countRes[0].count;

        return {
            total,
            rows: bannerRes
        };
    }
}

const serviceModel = require('../models/service');
const serviceData = require('../config/base').frontEndIndex.service;
const _ = require('lodash');
module.exports = {
    /**
     * 首页service部分数据
     * @return {object} 返回数据
     */
    async getSixServiceData() {
        // console.log('获取服务信息');
        let data = await serviceModel.getHomeServices();
        return data 
            ? {
                mainTitle: serviceData.mainTitle,
                defaultAlt: serviceData.defaultAlt,
                items: data
              }
            : null;
    },
    async getPagitionServiceData(data = {}) {
        let offset = data.offset;
        let limit = data.limit;
        let order = data.order;
        // console.log(order);
        let sort = data.sort;

        let res = await serviceModel.basePagination(
            ['id', 'src', 'title', 'is_active', 'sort_order', 'created_date'],
            offset,
            limit,
            sort,
            order
        );

        let serviceRes = res[0];
        let countRes = res[1];
        let total = countRes[0].count;

        return {
            total,
            rows: serviceRes
        };
    },
    async updateService(data = {}, id) {
        let res = await serviceModel.baseEdit(data, id);
        return res ? res : null;
    },
    async insertServiceData(data = {}) {
        let res = await serviceModel.baseInsert(data);
        return res ? res : null;
    },
    async batchDelete(ids) {
        let res = await serviceModel.baseDelete(ids);
        return res ? res : null;
    }
}
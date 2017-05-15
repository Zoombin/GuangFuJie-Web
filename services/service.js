const serviceModel = require('../models/service');
const serviceData = require('../config/base').frontEndIndex.service;
module.exports = {
    /**
     * 首页service部分数据
     * @return {object} 返回数据
     */
    async getSixServiceData() {
        console.log('获取服务信息');
        let data = await serviceModel.getSixServices();
        return data 
            ? {
                mainTitle: serviceData.mainTitle,
                defaultAlt: serviceData.defaultAlt,
                items: data
              }
            : null;
    }
}
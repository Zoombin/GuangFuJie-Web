const bannerModel = require('../models/banner');
const bannerData = require('../config/base').frontEndIndex.banner;
const _ = require('lodash');
module.exports = {
    /**
     * 首页banner部分数据
     * @return {object||null} banner数据
     */
    async getFourBannerData() {
        // console.log('执行banner');
        let data = await bannerModel.getHomeBanners();
        // console.log(data);
        return data
            ? {
                defaultAlt: bannerData.defaultAlt,
                imgs: data.map(b => b.src)
              }
            : null;
    },
    /**
     * 分页数据
     * @return {object}     返回数据
     */
    async getPagitionBannerData(data = {}) {
        let offset = data.offset;
        let limit = data.limit;
        let order = data.order;
        // console.log(order);
        let sort = data.sort;
        // console.log(sort);

        // let res = await bannerModel.getLimitBannersSortByOneField(offset, limit, sort, order);
        let res = await bannerModel.basePagination(
            ['id', 'src', 'is_active', 'sort_order', 'created_date'],
            offset,
            limit,
            sort,
            order
        );
        // let res = await bannerModel.basePagination(['id', 'src', 'link'])
        // console.log(res);
        let bannerRes = res[0];
        let countRes = res[1];
        let total = countRes[0].count;

        return {
            total,
            rows: bannerRes
        };
    },
    async updateBanner(data = {}, id) {
        // let res = await bannerModel.editBanner(data, id);
        let res = await bannerModel.baseEdit(data, id);
        return res ? res : null;
    },
    async insertBannerData(data = {}) {
        // let res = await bannerModel.insertNewBanner(src, isActive, sortOrder);
        let res = await bannerModel.baseInsert(data);
        return res ? res : null;
    },
    async batchDelete(ids) {
        // if (!_.isArray(ids)) return false;
        // if (!ids.length) return false;
        // let res = await bannerModel.batchDelete(ids);
        let res = await bannerModel.baseDelete(ids);
        return res ? res : null;
    }
}
const bannerModel = require('../models/banner');
const bannerData = require('../config/base').frontEndIndex.banner;
module.exports = {
    /**
     * 首页banner部分数据
     * @return {object||null} banner数据
     */
    async getFourBannerData() {
        console.log('执行banner');
        let data = await bannerModel.getFourBanners();
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
        let sort = data.sort;

        let res = await bannerModel.getLimitBannersSortByOneField(sort, offset, limit, order);
        console.log(res);
        let bannerRes = res[0];
        let countRes = res[1];
        let total = countRes[0].count;

        bannerRes = bannerRes.map((value, index) => {
            value.index = index + 1;
            // value.is_active = value.is_active === 1 ? '是' : '否';
            // value.src = '<a href='+ value.src +'>查看图片</a>';
            return value;
        });

        return {
            total,
            rows: bannerRes
        };
    }
}
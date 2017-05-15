const newsModel = require('../models/news');
const newsData = require('../config/base').frontEndIndex.news;
module.exports = {
    /**
     * 获取6张咨询
     * @return {array||null} 返回的咨询
     */
    async getSixNewsData() {
        console.log('获取news');
        let data = await newsModel.getSixNews();
        return data
            ? {
                mainTitle: newsData.mainTitle,
                defaultAlt: newsData.defaultAlt,
                items: data
              }
            : null;
    }
}
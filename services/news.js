const newsModel = require('../models/news');
const newsData = require('../config/base').frontEndIndex.news;
module.exports = {
    /**
     * 获取6张咨询
     * @return {array||null} 返回的咨询
     */
    async getSixNewsData() {
        // console.log('获取news');
        let data = await newsModel.getHomeNews();
        return data
            ? {
                mainTitle: newsData.mainTitle,
                defaultAlt: newsData.defaultAlt,
                items: data
              }
            : null;
    },
    async getPagitionNewsData(data = {}) {
        let offset = data.offset;
        let limit = data.limit;
        let order = data.order;
        let sort = data.sort;
        let search = data.search;

        let res = null;

        if (!search) {
            res = await newsModel.basePagination(
                ['id', 'src', 'link', 'is_active', 'sort_order', 'content', 'title', 'created_date'],
                offset,
                limit,
                sort,
                order
            );
        } else {
            res = await newsModel.basePaginationWithSearch(
                ['id', 'src', 'link', 'is_active', 'sort_order', 'content', 'title', 'created_date'],
                offset,
                limit,
                sort,
                order,
                ['title'],
                search
            );
        }

        let newsRes = res[0];
        let countRes = res[1];
        let total = countRes[0].count;

        return {
            total,
            rows: newsRes
        };
    },
    async insertNews(data = {}) {
        let res = await newsModel.baseInsert(data);
        return res ? res : null;
    },
    async batchDelete(ids) {
        let res = await newsModel.baseDelete(ids);
        return res ? res : null;
    },
    async updateNews(data = {}, id) {
        let res = await newsModel.baseEdit(data, id);
        return res ? res : null;
    },
    async getArticle(id) {
        let res = await newsModel.getArticle(id);
        return res ? res : null;
    }
}
const successCaseModel = require('../models/case');
const _ = require('lodash');
const Promise = require('bluebird');
const caseData = require('../config/base').frontEndIndex.successCase;
module.exports = {

    /**
     * 获取一张大图
     * @return {object||null} 返回对象
     */
    async getOneBigData() {
        console.log('获取一张大图');
        let data = await successCaseModel.getOneBig();
        return data;
    },
    /**
     * 获取四张小图,2张一个数组
     * @return {array||null} 返回数组
     */
    async twoRowSmallData() {
        console.log('获取一张小图');
        let data = await successCaseModel.getFourSmall();
        return data ? _.chunk(data, 2) : null;
    },

    /**
     * 首页成功案例片段数据
     * @return {object}
     */
    async getOneAndRowsData() {
        let data = await Promise.all([
            this.getOneBigData(),
            this.twoRowSmallData()
        ]).catch(error => console.log(error));

        if (!data[0] || !data[1]) return null;

        return {
            mainTitle: caseData.mainTitle,
            defaultAlt: caseData.defaultAlt,
            big: data[0],
            smallFirstRow: data[1][0],
            smallSecondRow: data[1][1]
        };
    }
}
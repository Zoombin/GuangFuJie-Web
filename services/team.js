const teamModel = require('../models/team');
const teamData = require('../config/base').frontEndIndex.team;
module.exports = {
    /**
     * 返回团队信息
     * @return {array||null} 返回信息
     */
    async getTeamsData() {
        // console.log('获取团队信息');
        let data = await teamModel.getIndexTeams();
        return data
            ? {
                mainTitle: teamData.mainTitle,
                defaultAlt: teamData.defaultAlt,
                items: data
              }
            : null;
    },
    async getPagitionTeamData(data = {}) {
        let offset = data.offset;
        let limit = data.limit;
        let order = data.order;
        let sort = data.sort;

        let res = await teamModel.basePagination(
            ['id', 'src', 'is_active', 'sort_order', 'created_date', 'name', 'job', 'desc'],
            offset,
            limit,
            sort,
            order
        );
        let teamRes = res[0];
        let countRes = res[1];
        let total = countRes[0].count;

        return {
            total,
            rows: teamRes
        };
    },
    async updateTeam(data = {}, id) {
        let res = await teamModel.baseEdit(data, id);
        return res ? res : null;
    },
    async insertTeamData(data = {}) {
        let res = await teamModel.baseInsert(data);
        return res ? res : null;
    },
    async batchDelete(ids) {
        let res = await teamModel.baseDelete(ids);
        return res ? res : null;
    }
}
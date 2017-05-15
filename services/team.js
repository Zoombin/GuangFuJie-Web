const teamModel = require('../models/team');
const teamData = require('../config/base').frontEndIndex.team;
module.exports = {
    /**
     * 返回团队信息
     * @return {array||null} 返回信息
     */
    async getTeamsData() {
        console.log('获取团队信息');
        let data = await teamModel.getIndexTeams();
        return data
            ? {
                mainTitle: teamData.mainTitle,
                defaultAlt: teamData.defaultAlt,
                items: data
              }
            : null;
    }
}
const {
    bannerService,
    newsService,
    serviceService,
    successCaseService,
    teamService
} = require('../services');
const Promise = require('bluebird');
const {frontFooterConfig, frontEndIndex, linkHrefs} = require('../config/base');
const {frontView, backEndView} = require('../views');
module.exports = {
    async indexPage(ctx) {
        // 执行时间取决于最耗时的Promise
        let results = await Promise.all([
            newsService.getSixNewsData(),
            bannerService.getFourBannerData(),
            serviceService.getSixServiceData(),
            successCaseService.getOneAndRowsData(),
            teamService.getTeamsData()
        ]).catch(error => console.log(error));
        // 解构
        let [
            news,
            banner,
            service,
            successCase,
            team
        ] = results;
        const about = frontEndIndex.about;
        const ftConfig = frontFooterConfig;

        ctx.body = frontView.compiledIndexFn({
            websitTitle: frontEndIndex.websitTitle,
            banner,
            news,
            service,
            successCase,
            team,
            about,
            ftConfig,
            linkHrefs,
            contactUs: frontEndIndex.contactUs
        });
    },
    async loginPage(ctx) {
        console.log(ctx.session);
        ctx.body = backEndView.compiledLogInFn();
    },
    async adminPage(ctx) {
        ctx.body = backEndView.compiledAdminFn();
    }
}
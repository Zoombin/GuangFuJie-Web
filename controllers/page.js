const {
    bannerService,
    newsService,
    serviceService,
    successCaseService,
    teamService
} = require('../services');
const Promise = require('bluebird');
const {frontFooterConfig, frontEndIndex, linkHrefs} = require('../config/base');
const {frontView, backEndView, renderAdminFile} = require('../views');
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
        console.log(successCase);
        // ctx.body = results;
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
    async casePage(ctx) {
        // console.log('case');
        // console.log(ctx.params);
        let id = ctx.params.id;

        ctx.body = frontView.compiledCaseFn({
            ftConfig: frontFooterConfig,
            linkHrefs,
            caseData: require('../mock/case' + id)
        });
    },
    // async loginPage(ctx) {
    //     console.log(ctx.session);
    //     ctx.body = backEndView.compiledLogInFn();
    // },
    async adminPage(ctx) {
        ctx.body = await renderAdminFile();
    },
    async newItemPage(ctx) {
        let id = ctx.params.id;
        let newsData = {};
        let res = await newsService.getArticle(id);
        if (res) {
            newsData.content = res[0].content;
        }

        ctx.body = frontView.compiledNewsFn({
            ftConfig: frontFooterConfig,
            linkHrefs,
            newsData
        });
    }
}
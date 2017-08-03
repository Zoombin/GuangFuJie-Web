import Vue from 'vue';
import Router from 'vue-router';
// import Hello from 'components/Hello'

import VueEditor from 'components/ueditor/ueditor';
import BannerTable from 'components/tables/banner-table';
import CaseTable from 'components/tables/case-table';
import ServiceTable from 'components/tables/service-table';
import TeamTable from 'components/tables/team-table';
import ContactUsTable from 'components/tables/contactus-table';
import NewsTable from 'components/tables/news-table';
import ArticleTable from 'components/tables/article-table';
import Login from 'components/login/login';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/banner',
            component: BannerTable
        },
        {
            path: '/case',
            component: CaseTable
        },
        {
            path: '/case/editor/:id',
            component: VueEditor
        },
        {
            path: '/service',
            component: ServiceTable
        },
        {
            path: '/team',
            component: TeamTable
        },
        {
            path: '/news',
            component: NewsTable
        },
        {
            path: '/articles',
            component: ArticleTable
        },
        {
            path: '/news/editor/:id',
            component: VueEditor
        },
        {
            path: '/contactus',
            component: ContactUsTable
        }
    ]
});

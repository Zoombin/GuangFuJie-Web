import Vue from 'vue';
import Router from 'vue-router';
// import Hello from 'components/Hello'

import VueEditor from 'components/ueditor/ueditor';
import BannerTable from 'components/tables/banner-table';
import CaseTable from 'components/tables/case-table';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/banner'
        },
        {
            path: '/editor',
            component: VueEditor
        },
        {
            path: '/banner',
            component: BannerTable
        },
        {
            path: '/case',
            component: CaseTable
        }
    ]
});

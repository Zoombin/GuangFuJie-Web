import Vue from 'vue';
import Router from 'vue-router';
// import Hello from 'components/Hello'

import VueEditor from 'components/ueditor/ueditor';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/editor',
            component: VueEditor
        }
    ]
});

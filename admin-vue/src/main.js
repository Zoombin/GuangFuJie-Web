// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
// import VueQuillEditor from 'vue-quill-editor';
import Cookies from 'js-cookie';
// Vue.use(VueQuillEditor);

router.beforeEach((to, from, next) => {
    if (to.path === '/login') next();
    else {
        console.log(from.path);
        console.log(to.path);
        console.log(Cookies.get('islogin'));
        if (!Cookies.get('islogin')) next('/login');
        else next();
    }
    // if (from.path !== '/login') {
    //     if (Cookies.get('islogin')) next();
    //     else next('/login');
    // }
});

import {
    Row,
    Col,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    TableColumn,
    Upload,
    Button,
    Form,
    FormItem,
    Input,
    Switch,
    Radio,
    RadioGroup,
    Option,
    DatePicker,
    Slider,
    Pagination,
    Loading,
    Dialog,
    Popover,
    Tag,
    Cascader,
    Select
} from 'element-ui';

Vue.use(Row);
Vue.use(Col);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Upload);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Slider);
Vue.use(Input);
Vue.use(Switch);
Vue.use(Pagination);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(Popover);
Vue.use(Tag);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Cascader);
Vue.use(Select);


// console.log(Message);
// Vue.config.productionTip = false;

/* eslint-disable no-new */
import 'common/stylus/index.styl';
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});

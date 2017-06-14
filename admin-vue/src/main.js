// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
// import VueQuillEditor from 'vue-quill-editor';

// Vue.use(VueQuillEditor);

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
    Option,
    DatePicker,
    Slider,
    Switch,
    Pagination,
    Loading,
    Dialog
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

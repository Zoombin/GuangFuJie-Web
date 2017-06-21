<template>
    <div class="side-menu">
        <el-menu router :default-active="currentIndex" class="menu" theme="light">
            <el-menu-item index="/banner">轮播图</el-menu-item>
            <el-menu-item index="/service">服务</el-menu-item>
            <el-menu-item index="/contactus">访客需求</el-menu-item>
            <el-menu-item index="/team">团队</el-menu-item>
            <el-menu-item index="/case">施工案例</el-menu-item>
            <el-menu-item index="/news">资讯</el-menu-item>
        </el-menu>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                currentIndex: ''
            };
        },
        watch: {
            '$route'(newRoute) {
                this._setCurrentIndex(newRoute.path);
            }
        },
        methods: {
            _setCurrentIndex(path) {
                let index = '';
                if (path.indexOf('/banner') !== -1) index = '/banner';
                if (path.indexOf('/case') !== -1) index = '/case';
                if (path.indexOf('/service') !== -1) index = '/service';
                if (path.indexOf('/team') !== -1) index = '/team';
                if (path.indexOf('/contactus') !== -1) index = '/contactus';
                if (path.indexOf('/news') !== -1) index = '/news';
                this.currentIndex = index;
            }
        },
        created() {
            this._setCurrentIndex(this.$route.path);
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .side-menu
        height: 100%
        .menu
            height: 100%
</style>
<template>
    <div class="side-menu">
        <el-menu router :default-active="currentIndex" class="menu" theme="light">
            <el-menu-item index="/banner">轮播图</el-menu-item>
            <el-menu-item index="2">服务</el-menu-item>
            <el-menu-item index="3">访客需求</el-menu-item>
            <el-menu-item index="4">团队</el-menu-item>
            <el-menu-item index="/case">施工案例</el-menu-item>
            <el-menu-item index="6">咨询</el-menu-item>
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
            _setCurrentIndex(index) {
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
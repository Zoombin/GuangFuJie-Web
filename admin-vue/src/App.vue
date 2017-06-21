<template>
    <div id="app">
        <m-header class="m-header"></m-header>
        <div class="m-side-menu">
            <m-side-menu></m-side-menu>
        </div>
        <div class="m-main">
            <div class="container">
                <div class="header">
                    <!--<m-bread></m-bread>-->
                    <div class="header-nav">

                    </div>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import MHeader from 'base/header/header';
    import MSideMenu from 'base/side-menu/side-menu';

    export default {
        components: {
            MHeader,
            MSideMenu
        },
        data() {
            return {};
        },
        methods: {
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    #app    
        .m-side-menu
            position: fixed
            top: 60px
            left: 0
            bottom: 0
            width: 180px
            min-width: 45px;
            height: calc(100% - 60px)
            z-index: 900
            background: #fff
            box-shadow: 0 2px 3px hsla(0,0%,7%,.1), 0 0 0 1px hsla(0,0%,7%,.1)
            overflow-y: auto
            overflow-x: hidden
        .m-bread
            box-sizing: border-box
            // box-shadow: 0 1px 3px hsla(0,0%,7%,.1), 0 0 0 1px hsla(0,0%,7%,.1)
        .m-main
            padding-top: 60px
            margin-left: 180px
            .container
                padding: 0 20px 20px 20px
                .header
                    padding: 10px 0
</style>

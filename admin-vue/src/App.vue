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
                </div>


                <m-banner-table></m-banner-table>
                <el-upload 
                    class="upload-demo"
                    ref="upload"
                    action="http://upload.qiniu.com/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :before-upload="handleBeforeUpload"
                    :file-list="fileList"
                    :auto-upload="false"
                    :data="form"
                >
                    <el-button slot="trigger" size="small" type="parmary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
                    <div slot="tip" class="el-upload__tip">东方丽都司法局第三方</div>
                </el-upload>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import MHeader from 'base/header/header';
    import MSideMenu from 'base/side-menu/side-menu';
    import MBread from 'base/bread/bread';
    import MBannerTable from 'components/banner-table/banner-table';

    import axios from 'axios';

    export default {
        components: {
            MHeader,
            MSideMenu,
            MBread,
            MBannerTable
        },
        data() {
            return {
                tableData3: [
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                fileList: [
                    {
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    },
                    {
                        name: 'food2.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }
                ],
                form: {}
            };
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleSuccess(res, file, filelist) {
                console.log(res);
            },
            handleBeforeUpload(file) {
                let name = encodeURI('abcddfsfjsdfsdfskdlfjldsf');
                return axios({
                    method: 'get',
                    url: '/api/token',
                    params: {
                        key: name
                    }
                }).then(res => {
                    console.log(res);
                    let data = res.data;
                    this.domainUrl = data.domainUrl;
                    this.form = {
                        key: data.key,
                        token: data.token
                    };
                }).catch(error => console.log(error));
            }
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

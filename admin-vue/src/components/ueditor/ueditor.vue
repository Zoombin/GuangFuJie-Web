<template>
    <div>
        <vue-editor ueditor-path="/static/ueditor1_4_3_3/" @ready="editorReady"></vue-editor>
    </div>
</template>

<script type="text/ecmascript-6">
    import VueEditor from 'vue-ueditor';
    import { Message } from 'element-ui';
    import axios from 'axios';
    export default {
        data() {
            return {
                content: ''
            };
        },
        created() {
            // let query = this.$router.query;
            // console.log(query);
            this._getContent();
            console.log(this.content);
        },
        methods: {
            _getParam() {
                let path = this.$route.path;
                let pathAry = path.split('/');
                let type = pathAry[1];
                let id = pathAry[3];
                return {type, id};
            },
            _saveContent() {
                axios({
                    url: '/api/article/save',
                    method: 'post',
                    data: {
                        ...this._getParam(),
                        content: this.content
                    }
                }).then(res => {
                    if (res.data.success) {
                        Message({
                            message: '保存成功',
                            type: 'success'
                        });
                    } else {
                        Message({
                            message: res.data.msg || '出错了...',
                            type: 'warning'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    Message({
                        message: '保存失败',
                        type: 'danger'
                    });
                });
            },
            _getContent() {
                console.log(this._getParam());
                return axios({
                    url: '/api/article',
                    method: 'get',
                    params: this._getParam()
                }).then(res => {
                    this.content = res.data.data[0].content ? res.data.data[0].content : '';
                }).catch(error => {
                    console.log(error);
                });
            },
            editorReady(editorInstance) {
                let _self = this;
                console.log(_self.content);
                editorInstance.setContent(_self.content);
                editorInstance.addListener('keydown', function(type, event) {
                    if (event.ctrlKey && event.keyCode === 13) {
                        // Ctrl + Enter 进行保存
                        // console.log(editorInstance.getContent());
                        _self.$nextTick(function() {
                            _self._saveContent();
                        });
                    }
                });
                editorInstance.addListener('contentchange', function() {
                    _self.content = editorInstance.getContent();
                });
            }
        },
        components: {
            VueEditor
        }
    };
</script>
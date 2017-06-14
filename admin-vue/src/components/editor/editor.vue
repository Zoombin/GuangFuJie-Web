<template>
    <div class="editor">
        <quill-editor 
            ref="quillEditor"
            v-model="content"
            :options="options"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
            <div id="toolbar" slot="toolbar">
                <!-- Add a bold button -->
                <button class="ql-bold" title="加粗">Bold</button>
                <button class="ql-italic" title="斜体">Italic</button>
                <button class="ql-underline" title="下划线">UnderLine</button>
                <button class="ql-header" value="1" title="1号标题">Header 1</button>
                <button class="ql-header" value="2" title="2号标题">Header 2</button>
                <select class="ql-header" title="标题">
                    <option value="1"></option>
                    <option value="2"></option>
                    <option value="3"></option>
                    <option value="4"></option>
                    <option value="5"></option>
                    <option value="6"></option>
                    <option selected></option>
                </select>
                <button class="ql-indent" value="+1" title="缩进"></button>
                <button class="ql-indent" value="-1" title="缩进"></button>
                <!-- Add font size dropdown -->
                <select class="ql-size" title="字号">
                    <option value="small"></option>
                    <!-- Note a missing, thus falsy value, is used to reset to default -->
                    <option selected></option>
                    <option value="large"></option>
                    <option value="huge"></option>
                </select>

                <!-- Add subscript and superscript buttons -->
                <button class="ql-script" value="sub" title="下标"></button>
                <button class="ql-script" value="super" title="上标"></button>

                <select class="ql-color" title="文字色彩">
                    <option selected="selected"></option>
                    <option value="#e60000"></option>
                    <option value="#ff9900"></option>
                    <option value="#ffff00"></option>
                    <option value="#008a00"></option>
                    <option value="#0066cc"></option>
                    <option value="#9933ff"></option>
                    <option value="#ffffff"></option>
                    <option value="#facccc"></option>
                    <option value="#ffebcc"></option>
                    <option value="#ffffcc"></option>
                    <option value="#cce8cc"></option>
                    <option value="#cce0f5"></option>
                    <option value="#ebd6ff"></option>
                    <option value="#bbbbbb"></option>
                    <option value="#f06666"></option>
                    <option value="#ffc266"></option>
                    <option value="#ffff66"></option>
                    <option value="#66b966"></option>
                    <option value="#66a3e0"></option>
                    <option value="#c285ff"></option>
                    <option value="#888888"></option>
                    <option value="#a10000"></option>
                    <option value="#b26b00"></option>
                    <option value="#b2b200"></option>
                    <option value="#006100"></option>
                    <option value="#0047b2"></option>
                    <option value="#6b24b2"></option>
                    <option value="#444444"></option>
                    <option value="#5c0000"></option>
                    <option value="#663d00"></option>
                    <option value="#666600"></option>
                    <option value="#003700"></option>
                    <option value="#002966"></option>
                    <option value="#3d1466"></option>
                </select>

                <select class="ql-background" title="背景色">
                    <option selected="selected"></option>
                    <option value="#e60000"></option>
                    <option value="#ff9900"></option>
                    <option value="#ffff00"></option>
                    <option value="#008a00"></option>
                    <option value="#0066cc"></option>
                    <option value="#9933ff"></option>
                    <option value="#ffffff"></option>
                    <option value="#facccc"></option>
                    <option value="#ffebcc"></option>
                    <option value="#ffffcc"></option>
                    <option value="#cce8cc"></option>
                    <option value="#cce0f5"></option>
                    <option value="#ebd6ff"></option>
                    <option value="#bbbbbb"></option>
                    <option value="#f06666"></option>
                    <option value="#ffc266"></option>
                    <option value="#ffff66"></option>
                    <option value="#66b966"></option>
                    <option value="#66a3e0"></option>
                    <option value="#c285ff"></option>
                    <option value="#888888"></option>
                    <option value="#a10000"></option>
                    <option value="#b26b00"></option>
                    <option value="#b2b200"></option>
                    <option value="#006100"></option>
                    <option value="#0047b2"></option>
                    <option value="#6b24b2"></option>
                    <option value="#444444"></option>
                    <option value="#5c0000"></option>
                    <option value="#663d00"></option>
                    <option value="#666600"></option>
                    <option value="#003700"></option>
                    <option value="#002966"></option>
                    <option value="#3d1466"></option>
                </select>

                <select class="ql-align" title="对齐方式">
                    <option selected></option>
                    <option value="center"></option>
                    <option value="right"></option>
                    <option value="justify"></option>
                </select>

                <button type="button" title="图片">
                    <i class="el-icon-picture" @click="handleCustomBtnClick"></i>
                </button>
          </div>
        </quill-editor>
        <input ref="file" type="file" id="editorFile" accept="image/*" @change="handleFileChange($event)"/>
        <!--<div class="html ql-deitor" v-if="view" v-html="content"></div>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios';
    import * as utils from 'common/js/utils';
    export default {
        data() {
            return {
                content: '',
                options: {
                    modules: {
                        toolbar: '#toolbar'
                    },
                    placeholder: 'Insert an image...'
                }
            };
        },
        methods: {
            onEditorBlur(editor) {
                console.log(this.editor);
                console.log('editor blur', editor);
            },
            onEditorFocus(editor) {
                console.log('editor focus', editor);
            },
            onEditorReady(editor) {
                // console.log('editor ready', editor);
            },
            handleCustomBtnClick() {
                document.getElementById('editorFile').click();
            },
            handleFileChange(event) {
                let file = event.target.files[0];
                let formData = new FormData();
                let name = utils.getName(file.name);
                let ext = utils.getExt(file.name);
                console.log(this.editor);
                let range = this.editor.getSelection();
                this.key = name + ((new Date()).getTime() + file.lastModified) + ext;
                axios({
                    method: 'get',
                    url: '/api/token',
                    params: {
                        key: this.key
                    }
                }).then(res => {
                    if (res.status >= 200) {
                        this.token = res.data.token;
                        this.domainUrl = res.data.domainUrl;
                        formData.append('file', file);
                        formData.append('key', this.key);
                        formData.append('token', this.token);
                        return axios({
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            url: 'http://upload.qiniu.com/',
                            method: 'post',
                            data: formData
                        });
                    }
                }).then(res => {
                    if (res.status >= 200) {
                        this.editor.insertEmbed(range, 'image', `${this.domainUrl}${res.data.key}`);
                    }
                }).catch(error => console.log(error));
            }
        },
        computed: {
            editor() {
                console.log('jisuan');
                console.log(this.$refs.quillEditor.quill.getSelection);
                return this.$refs.quillEditor.quill;
            }
        },
        mounted() {
            console.log(this.editor);
        },
        created() {
            this.key = '';
            this.token = '';
            this.domainUrl = '';
        }
    };
</script>
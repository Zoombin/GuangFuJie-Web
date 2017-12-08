<template>
    <div>
        <vue-editor ueditor-path="/admin/static/ueditor1_4_3_3/" @ready="editorReady"></vue-editor>
    </div>
</template>

<script type="text/ecmascript-6">
    import VueEditor from 'vue-ueditor';
    // import { Message } from 'element-ui';
    // import axios from 'axios';
    export default {
        props: {
            content: {
                type: String,
                default: ''
            }
        },
        methods: {
            editorReady(editorInstance) {
                let _self = this;
                this.editor = editorInstance;
                // console.log(_self.content);
                editorInstance.setContent(_self.content);
                // editorInstance.addListener('keydown', function(type, event) {
                //     if (event.ctrlKey && event.keyCode === 13) {
                //         // Ctrl + Enter 进行保存
                //         // console.log(editorInstance.getContent());
                //         _self.$nextTick(function() {
                //             _self._saveContent();
                //         });
                //     }
                // });
                // editorInstance.addListener('contentchange', function() {
                    // _self.content = editorInstance.getContent();
                    // console.log('change');
                    // console.log(editorInstance.getContent());
                    // _self.$emit('contentchange', editorInstance.getContent());

                // });
            },
            getContent() {
                return this.editor.getContent();
            }
        },
        watch: {
            content() {
                this.editor.setContent(this.content);
            }
        },
        components: {
            VueEditor
        }
    };
</script>
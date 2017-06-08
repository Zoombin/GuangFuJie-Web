<template>
    <vue-editor @ready="editorReady"></vue-editor>
</template>

<script type="text/ecmascript-6">
    import VueEditor from 'vue-ueditor';
    export default {
        methods: {
            editorReady(editorInstance) {
                editorInstance.setContent('Hello World');
            }
        },
        components: {
            VueEditor
        }
    };
</script>
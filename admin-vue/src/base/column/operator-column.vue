<template>
    <div>
        <el-button v-if="showViewIcon" title="查看" @click.native="view" type="primary" icon="view" size="small"></el-button>
        <el-button title="编辑" @click.native="edit" type="primary" icon="edit" size="small"></el-button>
        <el-button v-if="showContentIcon" title="文章编辑" @click.native="editContent" type="primary" icon="document" size="small"></el-button>
        <el-button title="删除" @click.native="del" type="danger" icon="delete2" size="small"></el-button>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            options: {
                type: Object,
                default: function() {
                    return {};
                }
            },
            showContentIcon: {
                type: Boolean,
                default: false
            },
            showViewIcon: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            view() {
                this.$emit('view');
            },
            edit() {
                this.$emit('edit');
            },
            del() {
                this.$emit('del');
            },
            editContent() {
                this.$emit('editContent');
            }
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
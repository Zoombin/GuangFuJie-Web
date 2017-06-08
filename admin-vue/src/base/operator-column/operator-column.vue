<template>
    <el-table-column
        :label="options.label"
        :width="options.width"
        :prop="options.prop">
        <template scope="scope">
            <div
                @view="view(scope.$index, scope.row, scope.column, scope.store)"
                @edit="edit(scope.$index, scope.row, scope.column, scope.store)"
                @del="del(scope.$index, scope.row, scope.column, scope.store)"
            ></div>
        </template>
    </el-table-column>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            options: {
                type: Object,
                default: function() {
                    return {};
                }
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
            }
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
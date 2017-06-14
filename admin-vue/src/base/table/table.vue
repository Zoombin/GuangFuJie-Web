<template>
    <div>
        <el-table
            :data="data"
            :border="border"
            :fit="fit"
            :highlight-current-row="highLightCurrentRow"
            :default-sort="defaultSort"
        >   
            <el-table-column v-if="showSelection" width="56" type="selection"></el-table-column>
            <el-table-column label="序号" width="100" type="index"></el-table-column>
            <slot></slot>
            <el-table-column v-if="showActions" :label="actionLabel" :width="actionWidth">
                <template scope="scope">
                    <operator-column 
                        :show-content-icon="showContentIcon"
                        @view="view(scope.$index, scope.row, scope.column, scope.store)"
                        @edit="edit(scope.$index, scope.row, scope.column, scope.store)"
                        @del="del(scope.$index, scope.row, scope.column, scope.store)"
                        @editContent="editContent(scope.$index, scope.row, scope.column, scope.store)"
                    ></operator-column>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
    import OperatorColumn from 'base/column/operator-column';
    export default {
        props: {
            data: {
                type: Array,
                default: []
            },
            border: {
                type: Boolean,
                default: true
            },
            fit: {
                type: Boolean,
                default: true
            },
            highLightCurrentRow: {
                type: Boolean,
                default: false
            },
            showContentIcon: {
                type: Boolean,
                default: false
            },
            showActions: {
                type: Boolean,
                default: true
            },
            showSelection: {
                type: Boolean,
                default: true
            },
            defaultSort: {
                type: Object,
                default: function() {
                    return {};
                }
            },
            actionLabel: {
                type: String,
                default: '操作'
            },
            actionWidth: {
                type: [Number, String],
                default: 'auto'
            }
        },
        methods: {
            view(index, row, column, store) {
                // console.log(index, row, column, store);
                this.$emit('view', index, row, column, store);
            },
            edit(index, row, column, store) {
                this.$emit('edit', index, row, column, store);
            },
            del(index, row, column, store) {
                this.$emit('del', index, row, column, store);
            },
            editContent(index, row, column, store) {
                this.$emit('editContent', index, row, column, store);
            }
        },
        components: {
            OperatorColumn
        },
        created() {
            console.log(this.columns);
        }
    };
</script>
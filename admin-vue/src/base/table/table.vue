<template>
    <el-table
        :data="data"
        :border="border"
    >
        <component
            v-for="(column, index) in columns" 
            :is="column.view"
            :key="index"
            :options="column"
        >
        </component>
    </el-table>
</template>

<script type="text/ecmascript-6">
    import OperatorColumn from 'base/operator-column/operator-column';
    import BaseColumn from 'base/operator-column/base-column';
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
            columns: {
                type: Array,
                default: []
            },
            operatorCol: {
                type: Object,
                default: function() {
                    return {};
                }
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
            }
        },
        components: {
            OperatorColumn,
            BaseColumn
        },
        created() {
            console.log(this.columns);
        }
    };
</script>
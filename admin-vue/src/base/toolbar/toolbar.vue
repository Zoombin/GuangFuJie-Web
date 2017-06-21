<template>
    <div>
        <el-input v-if="showSearch" style="width: 260px;" :placeholder="placeholder" :value="searchText" @input="handleInput">
            <el-button slot="append" icon="search" @click.native="handleSearchClick"></el-button>
        </el-input>
        <div style="display: inline-block;" :style="{'margin-left': showSearch ? '30px' : 0}">
            <el-button type="primary" @click.native="handleNewClick">新建</el-button>
            <el-button type="danger" @click.native="handleBatchDelete">批量删除</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            showSearch: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: ''
            },
            searchText: {
                type: String,
                default: ''
            }
        },
        methods: {
            handleSearchClick() {
                this.$emit('search');
            },
            handleNewClick() {
                this.$emit('new');
            },
            handleBatchDelete() {
                this.$emit('batchDelete');
            },
            handleInput(val) {
                this.$emit('input', val);
            }
        }
    };
</script>
<template>
    <div>
        <el-input style="width: 260px;" placeholder="姓名/电话" v-model="val">
            <el-button slot="append" icon="search" @click.native="handleSearchClick"></el-button>
        </el-input>
        <div style="display: inline-block;margin-left: 30px;">
            <el-button type="primary" @click.native="handleNewClick">新建</el-button>
            <el-button type="danger" @click.native="handleBatchDelete">批量删除</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                val: ''
            };
        },
        methods: {
            handleSearchClick() {
                this.$emit('search', this.val);
            },
            handleNewClick() {
                this.$emit('new');
            },
            handleBatchDelete() {
                this.$emit('batchDelete');
            }
        }
    };
</script>
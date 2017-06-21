<template>
    <div>
        <m-tool-bar style="margin-bottom: 10px;"
                    @new="handleCreateNew"
                    @batchDelete="handleBatchDel"></m-tool-bar>
        <m-table
            v-loading="loading"
            :data="data"
            :action-width="300"
            @selectionChange="handleSelectionChange"
            @edit="edit"
            @del="del">
            <template v-for="(item, index) in columns">
                <el-table-column
                    v-if="!item._custom"
                    :key="item.prop"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width"
                >
                </el-table-column>
                <el-table-column 
                    v-else-if="item._view='popover-column'"
                    :key="item.prop"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width"
                >
                    <template scope="scope">
                        <popover-column :image-url="scope.row.imgSrc" text="图片"></popover-column>
                    </template>
                </el-table-column>
            </template>
        </m-table>
        <div style="text-align: center; margin-top: 15px;">
            <el-pagination v-show="(total / data.length) > 1" 
                        layout="prev, pager, next" 
                        :total="total"
                        :current-page="currentPage"
                        @current-change="handleCurrentPageChange">
            </el-pagination>
        </div>
        <el-dialog @close="onReset" :title="dialogTitle" :visible.sync="visible" :size="dialogSize">
            <el-form ref="form" :rules="rules" :model="formData" :label-width="labelWidth + 'px'">
                <el-form-item label="上传图片">
                    <m-upload filePrefix="banner-" 
                              size="1200/500"
                              :ratio="2.4"
                              :img-width="300"
                              :image-url="formData.imgUrl"
                              @domain="handleDomain"
                              @progress="handleUploadProgress"
                              @success="handleUploadSuccess"
                              @error="handleUploadError"></m-upload>
                </el-form-item>
                <el-form-item label="图片地址" prop="imgUrl">
                    <el-input readonly :value="formData.imgUrl"></el-input>
                </el-form-item>
                <el-form-item label="激活状态" prop="isActive">
                    <el-switch on-text="" off-text="" v-model="formData.isActive"></el-switch>
                </el-form-item>
                <el-form-item label="优先级" prop="sortOrder">
                    <el-slider v-model="formData.sortOrder"></el-slider>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')" :loading="isUploadingData">{{ submitText }}</el-button>
                    <el-button @click="onReset">清空</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import { Message } from 'element-ui';
    import MTable from 'base/table/table';
    import PopoverColumn from 'base/column/popover-column';
    import Banner from 'common/js/banner';
    import MUpload from 'components/upload/upload';
    import { bannerColumns } from 'common/js/config';
    // import { getBannerList } from 'api/banner';
    import MToolBar from 'base/toolbar/toolbar';
    import axios from 'axios';

    export default {
        data() {
            return {
                data: [],
                loading: true,
                isUploadingData: false,
                columns: bannerColumns,
                total: 0,
                offset: 0,
                limit: 10,
                isCreate: false,
                visible: false,
                dialogSize: 'tiny',
                labelWidth: 100,
                formData: {
                    isActive: false,
                    sortOrder: 50,
                    imgUrl: ''
                },
                rules: {
                    imgUrl: [
                        { required: true, message: '请选择图片' }
                    ]
                },
                currentId: -1
            };
        },
        computed: {
            currentPage() {
                return this.offset + 1;
            },
            dialogTitle() {
                return this.isCreate ? '新建轮播图' : '编辑轮播图';
            },
            submitText() {
                return this.isCreate ? '立即创建' : '保存';
            }
        },
        beforeCreate() {
            this.currentId = -1;
            this.domainUrl = '';
            this.currentSelectedIds = [];
        },
        created() {
            // console.log(this.$message);
            this._getList();
        },
        methods: {
            edit(index, row, col, store) {
                this.currentId = row.id;
                this.formData.isActive = row.activeState === '已激活';
                this.formData.sortOrder = row.sortOrder;
                this.formData.imgUrl = row.imgSrc;
                this.isCreate = false;
                this.visible = true;
            },
            del(index, row, col, store) {
                console.log(row.id);
                this._batchDelete(row.id);
            },
            handleBatchDel() {
                if (!this.currentSelectedIds.length) {
                    Message({
                        message: '请先勾选',
                        type: 'warning'
                    });
                    return;
                } else {
                    this._batchDelete(this.currentSelectedIds);
                }
            },
            handleSelectionChange(selection) {
                this.currentSelectedIds = selection.map(item => item.id);
                console.log(this.currentSelectedIds);
            },
            handleCurrentPageChange(pageNum) {
                this.offset = pageNum - 1;
            },
            handleCreateNew() {
                // 重置初始值，避免与edit冲突
                console.log('create reset');
                // this.formData.isActive = true;
                // this.formData.sortOrder = 50;
                // this.formData.imgUrl = '';

                this.isCreate = true;
                this.visible = true;
            },
            handleUploadProgress(event, file) {
                console.log(event);
            },
            handleUploadSuccess(response, file) {
                console.log(response);
                this.formData.imgUrl = this.domainUrl + response.key;
            },
            handleUploadError(err, file) {
                console.log(err);
            },
            handleDomain(domainUrl) {
                this.domainUrl = domainUrl;
            },
            onSubmit(formName) {
                var _self = this;
                this.$refs[formName].validate(function(valid) {
                    if (valid) {
                        // console.log('valid');
                        if (_self.isCreate) _self._putBanner();
                        else _self._editBanner();
                    } else {
                        Message({
                            message: '请检查表单',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            onReset(formName) {
                this.formData.isActive = false;
                this.formData.sortOrder = 50;
                this.formData.imgUrl = '';
                // this.$refs[formName].resetFields();
            },
            _beforeHandleSuccess() {
                this.isUploadingData = false;
                this.visible = false;
                // this.$refs.form.resetFields();
                // this.onReset();
            },
            _batchDelete(ids) {
                axios({
                    method: 'post',
                    url: '/api/banner/batchdel',
                    data: {
                        ids: ids
                    }
                }).then(res => {
                    if (res.data.success) {
                        this._getList();
                        Message({
                            message: res.data.msg,
                            type: 'success'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            _editBanner() {
                this.isUploadingData = true;
                axios({
                    method: 'post',
                    url: '/api/banner/edit',
                    data: {
                        id: this.currentId,
                        src: this.formData.imgUrl,
                        isActive: this.formData.isActive ? 1 : 0,
                        sortOrder: this.formData.sortOrder
                    }
                }).then(res => {
                    // console.log(this.formData);
                    this._beforeHandleSuccess();
                    if (res.data.success) {
                        this._updateData(res.data.data);
                        Message({
                            message: res.data.msg,
                            type: 'success'
                        });
                    }
                }).catch(error => {
                    this.isUploadingData = false;
                    console.log(error);
                });
            },
            _updateData(data) {
                data = this._normalize(data)[0];
                // console.log(this.data);
                let temp = this.data.find(item => item.id === data.id);
                Object.assign(temp, data);
            },
            _putBanner() {
                this.isUploadingData = true;
                axios({
                    method: 'post',
                    url: '/api/banner/create',
                    data: {
                        src: this.formData.imgUrl,
                        isActive: this.formData.isActive ? 1 : 0,
                        sortOrder: this.formData.sortOrder
                    }
                }).then(res => {
                    this._beforeHandleSuccess();
                    if (res.data.success) {
                        this._getList();
                        Message({
                            message: res.data.msg,
                            type: 'success'
                        });
                    }
                }).catch(error => {
                    this.isUploadingData = false;
                    console.log(error);
                });
            },
            _getList() {
                this.loading = true;
                axios({
                    method: 'get',
                    url: '/api/banner/list',
                    params: {
                        offset: this.offset,
                        limit: this.limit
                    }
                }).then(res => {
                    this.loading = false;
                    if (res.data.success) {
                        this.data = this._normalize(res.data.data.rows);
                        this.total = res.data.data.total;
                    }
                }).catch(error => {
                    console.log(error);
                    this.loading = false;
                });
            },
            _normalize(rows) {
                console.log(rows);
                return rows.map(item => {
                    item.is_active = item.is_active === 1 ? '已激活' : '未激活';
                    item.created_date = item.created_date ? item.created_date.split(' ')[0] : '';
                    return new Banner({
                        id: item.id,
                        imgSrc: item.src,
                        activeState: item.is_active,
                        sortOrder: item.sort_order,
                        createDate: item.created_date
                    });
                });
            }
        },
        watch: {
            offset() {
                this._getList();
            }
        },
        components: {
            MTable,
            MToolBar,
            MUpload,
            PopoverColumn
        }
    };
</script>



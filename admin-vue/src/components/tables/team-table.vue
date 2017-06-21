<template>
    <div>
        <m-tool-bar style="margin-bottom: 10px;"
                    @new="handleCreateNew"
                    @batchDelete="handleBatchDel">
        </m-tool-bar>
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
                    :width="item.width">
                </el-table-column>
                <el-table-column
                    v-else-if="item._view === 'popover-column'"
                    :key="item.prop"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width">
                    <template scope="scope">
                        <popover-column :image-url="scope.row.imgSrc" text="图片"></popover-column>
                    </template>
                </el-table-column>
            </template>
        </m-table>
        <div style="text-align: center; maring-top: 15px;">
            <el-pagination v-show="(total / data.length) > 1"
                    layout="prev, pager, next"
                    :total="total"
                    :current-page="currentPage"
                    @current-change="handleCurrentPageChange">
            </el-pagination>
        </div>
        <el-dialog top="5%" @close="onReset" :title="dialogTitle" :visible.sync="visible" :size="dialogSize">
            <el-form ref="form" :rules="rules" :model="formData" :label-width="labelWidth + 'px'">
                <el-form-item label="上传图片">
                    <m-upload
                        file-prefix="team-"
                        :ratio="0.6812"
                        :img-width="300"
                        size="250/367"
                        :image-url="formData.imgSrc"
                        @domain="handleDomain"
                        @progress="handleUploadProgress"
                        @success="handleUploadSuccess"
                        @error="handleUploadError"
                    ></m-upload>
                </el-form-item>
                <el-form-item label="图片地址" prop="imgSrc">
                    <el-input readonly :value="formData.imgSrc"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="formData.name" placeholder="请填写成员姓名"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="job">
                    <el-input v-model="formData.job" placeholder="请填写成员职位"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="desc">
                    <el-input type="textarea" autosize v-model="formData.desc" placeholder="不要超过65字"></el-input>
                </el-form-item>
                <el-form-item label="激活状态" prop="isActive">
                    <el-switch on-text="" off-text="" v-model="formData.isActive"></el-switch>
                </el-form-item>
                <el-form-item label="优先级" prop="sortOrder">
                    <el-slider v-model="formData.sortOrder"></el-slider>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')" :loading="isUploadingData">{{ submitText }}</el-button>
                    <el-button @click.native="onReset">清空</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import { Message } from 'element-ui';
    import MTable from 'base/table/table';
    import PopoverColumn from 'base/column/popover-column';
    import Team from 'common/js/team';
    import MUpload from 'components/upload/upload';
    import { teamColumns } from 'common/js/config';
    import MToolBar from 'base/toolbar/toolbar';
    import axios from 'axios';

    export default {
        data() {
            return {
                data: [],
                loading: true,
                isUploadingData: false,
                columns: teamColumns,
                total: 0,
                offset: 0,
                limit: 10,
                isCreate: false,
                visible: false,
                dialogSize: 'tiny',
                labelWidth: 100,
                formData: {
                    imgSrc: '',
                    name: '',
                    job: '',
                    desc: '',
                    isActive: false,
                    sortOrder: 50
                },
                rules: {
                    imgSrc: [
                        { required: true, message: '请选择图片' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名' }
                    ],
                    job: [
                        { required: true, message: '请输入职位' }
                    ],
                    desc: [
                        { required: true, message: '请输入简介' },
                        { min: 0, max: 65, message: '长度不超过65个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        computed: {
            currentPage() {
                return this.offset + 1;
            },
            dialogTitle() {
                return this.isCreate ? '新建' : '编辑成员信息';
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
            this._getList();
        },
        methods: {
            edit(index, row, col, store) {
                this.currentId = row.id;
                this.formData.isActive = row.activeState === '已激活';
                this.formData.sortOrder = row.sortOrder;
                this.formData.imgSrc = row.imgSrc;
                this.formData.name = row.name;
                this.formData.job = row.job;
                this.formData.desc = row.desc;

                this.isCreate = false;
                this.visible = true;
            },
            del(index, row, col, store) {
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
            },
            handleCurrentPageChange(pageNum) {
                this.offset = pageNum - 1;
            },
            handleCreateNew() {
                this.isCreate = true;
                this.visible = true;
            },
            handleUploadProgress(event, file) {
                console.log(event);
            },
            handleUploadSuccess(response, file) {
                this.formData.imgSrc = this.domainUrl + response.key;
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
                        if (_self.isCreate) _self._putTeam();
                        else _self._editTeam();
                    } else {
                        Message({
                            message: '请检查表单',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            onReset() {
                this.formData.imgSrc = '';
                this.formData.name = '';
                this.formData.job = '';
                this.formData.desc = '';
                this.formData.isActive = false;
                this.formData.sortOrder = 50;
            },
            _beforeHandleSuccess() {
                this.isUploadingData = false;
                this.visible = false;
            },
            _putTeam() {
                this.isUploadingData = true;
                axios({
                    method: 'post',
                    url: '/api/team/create',
                    data: {
                        src: this.formData.imgSrc,
                        isActive: this.formData.isActive ? 1 : 0,
                        sortOrder: this.formData.sortOrder,
                        name: this.formData.name,
                        job: this.formData.job,
                        desc: this.formData.desc
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
            _editTeam() {
                this.isUploadingData = true;
                axios({
                    method: 'post',
                    url: '/api/team/edit',
                    data: {
                        id: this.currentId,
                        src: this.formData.imgSrc,
                        isActive: this.formData.isActive ? 1 : 0,
                        sortOrder: this.formData.sortOrder,
                        name: this.formData.name,
                        job: this.formData.job,
                        desc: this.formData.desc
                    }
                }).then(res => {
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
                let temp = this.data.find(item => item.id === data.id);
                Object.assign(temp, data);
            },
            _batchDelete(ids) {
                axios({
                    method: 'post',
                    url: '/api/team/batchdel',
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
            _getList() {
                this.loading = true;
                axios({
                    method: 'get',
                    url: '/api/team/list',
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
            _normalize(list) {
                return list.map(item => {
                    item.is_active = item.is_active === 1 ? '已激活' : '未激活';
                    item.created_date = item.created_date ? item.created_date.split(' ')[0] : '';
                    return new Team({
                        id: item.id,
                        imgSrc: item.src,
                        activeState: item.is_active,
                        sortOrder: item.sort_order,
                        name: item.name,
                        job: item.job,
                        desc: item.desc
                    });
                });
            }
        },
        components: {
            MTable,
            PopoverColumn,
            MUpload,
            MToolBar
        }
    };
</script>
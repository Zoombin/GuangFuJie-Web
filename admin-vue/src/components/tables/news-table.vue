<template>
    <div>
        <m-tool-bar style="margin-bottom: 10px;"
                    :search-text="searchText"
                    @input="handleInput"
                    show-search
                    placeholder="请输入资讯标题"
                    @search="handleSearch"
                    @new="handleCreateNew"
                    @batchDelete="handleBatchDel"></m-tool-bar>
        <m-table 
            v-loading="loading"
            :data="data"
            :action-width="300"
            @selectionChange="handleSelectionChange"
            @view="view"
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
        <el-dialog @close="onReset" :title="dialogTitle" :visible.sync="visible" :size="dialogSize" top="8%">
            <el-form ref="form" :rules="rules" :model="formData" :label-width="labelWidth + 'px'">
                <el-form-item label="上传图片">
                    <m-upload filePrefix="news-"
                              :ratio="1.8"
                              :img-width="300"
                              size="900/500"
                              :image-url="formData.imgSrc"
                              @domain="handleDomain"
                              @progress="handleUploadProgress"
                              @success="handleUploadSuccess"
                              @error="handleUploadError"></m-upload>
                </el-form-item>
                <el-form-item label="图片地址" prop="imgSrc">
                    <el-input readonly :value="formData.imgSrc"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="formData.title" placeholder="请填写咨询标题"></el-input>
                </el-form-item>
                <el-form-item label="链接地址">
                    <el-input v-model="formData.link" placeholder="链接地址优先级高于编辑内容"></el-input>
                </el-form-item>
                <el-form-item label="激活状态" prop="isActive">
                    <el-switch on-text="" off-text="" v-model="formData.isActive"></el-switch>
                </el-form-item>
                <el-form-item label="优先级" prop="sortOrder">
                    <el-slider v-model="formData.sortOrder"></el-slider>
                </el-form-item>
                <el-form-item label="文章">
                    <ueditor :content="formData.content" @contentchange="handleContentChange"></ueditor>
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
    import News from 'common/js/news';
    import MUpload from 'components/upload/upload';
    import PopoverColumn from 'base/column/popover-column';
    import { newsColumns } from 'common/js/config';
    import Ueditor from 'components/ueditor/ueditor-2';
    import MToolBar from 'base/toolbar/toolbar';
    import axios from 'axios';

    export default {
        data() {
            return {
                data: [],
                loading: true,
                isUploadingData: false,
                columns: newsColumns,
                total: 0,
                offset: 0,
                limit: 10,
                searchText: '',
                isCreate: false,
                visible: false,
                dialogSize: 'small',
                labelWidth: 100,
                formData: {
                    imgSrc: '',
                    isActive: false,
                    sortOrder: 50,
                    title: '',
                    link: '',
                    content: ''
                },
                rules: {
                    imgSrc: [
                        { required: true, message: '请选择图片' }
                    ],
                    title: [
                        { required: true, message: '请输入标题' }
                    ]
                }
            };
        },
        computed: {
            currentPage() {
                return this.offset + 1;
            },
            dialogTitle() {
                return this.isCreate ? '新建资讯' : '编辑资讯';
            },
            submitText() {
                return this.isCreate ? '立即创建' : '保存';
            }
        },
        beforeCreate() {
            // this.searchText = '';
            this.currentId = -1;
            this.domainUrl = '';
            this.currentSelectedIds = [];
        },
        created() {
            this._getList();
        },
        methods: {
            view(index, row, col, store) {
                console.log(row.id);
            },
            edit(index, row, col, store) {
                // title: item.title,
                //         desc: item.desc,
                //         imgSrc: item.src,
                //         imgSize: item.image_size,
                //         activeState: item.is_active,
                //         sortOrder: item.sort_order,
                //         updateDate: item.update_date
                this.currentId = row.id;
                // this.formData.imgSize = row.imgSize === '大图' ? '1' : '2';
                this.formData.imgSrc = row.imgSrc;
                this.formData.isActive = row.activeState === '已激活';
                this.formData.sortOrder = row.sortOrder;
                this.formData.title = row.title;
                // this.formData.desc = row.desc;
                this.formData.link = row.link;
                this.formData.content = row.content;

                this.isCreate = false;
                this.visible = true;
                // console.log(row.id);
            },
            del(index, row, col, store) {
                // console.log(row.id);
                this._batchDelete(row.id);
            },
            // editContent(index, row, col, store) {
            //     // console.log(row.id);
            //     this.$router.push({
            //         path: '/news/editor/' + row.id
            //     });
            // },
            handleContentChange(content) {
                this.formData.content = content;
            },
            handleInput(val) {
                this.searchText = val;
            },
            handleSearch() {
                this._getList();
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
            handleCurrentPageChange(currentPage) {
                this.offset = currentPage - 1;
            },
            handleCreateNew() {
                this.isCreate = true;
                this.visible = true;
            },
            handleUploadProgress(event, file) {
                console.log(event);
            },
            handleUploadSuccess(response, file) {
                console.log(response);
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
                        if (_self.isCreate) _self._putNews();
                        else _self._editNews();
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
                // imgSize: '1',
                //     imgSrc: '',
                //     isActive: false,
                //     sortOrder: 50,
                //     title: '',
                //     desc: ''
                // this.formData.imgSize = '1';
                this.formData.imgSrc = '';
                this.formData.isActive = false;
                this.formData.sortOrder = 50;
                this.formData.title = '';
                this.formData.content = '';
                // this.formData.desc = '';
                this.formData.link = '';

                // console.log('qingkong', this.formData.content);
            },
            _beforeHandleSuccess() {
                this.isUploadingData = false;
                this.visible = false;
            },
            _batchDelete(ids) {
                axios({
                    method: 'post',
                    url: '/api/news/batchdel',
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
            _editNews() {
                this.isUploadingData = true;
                axios({
                    method: 'post',
                    url: '/api/news/edit',
                    data: {
                        id: this.currentId,
                        src: this.formData.imgSrc,
                        isActive: this.formData.isActive ? 1 : 0,
                        sortOrder: this.formData.sortOrder,
                        title: this.formData.title,
                        link: this.formData.link,
                        content: this.formData.content
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
            _putNews() {
                this.isUploadingData = true;
                axios({
                    method: 'post',
                    url: '/api/news/create',
                    data: {
                        src: this.formData.imgSrc,
                        isActive: this.formData.isActive ? 1 : 0,
                        sortOrder: this.formData.sortOrder,
                        title: this.formData.title,
                        link: this.formData.link,
                        content: this.formData.content
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
                    url: '/api/news/list',
                    params: {
                        offset: this.offset,
                        limit: this.limit,
                        search: this.searchText
                        // search: this.searchText
                    }
                }).then(res => {
                    this.loading = false;
                    if (res.data.success) {
                        this.data = this._normalize(res.data.data.rows);
                        this.total = res.data.data.total;
                    } else {
                        Message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    this.loading = false;
                });
            },
            _normalize(rows) {
                return rows.map(item => {
                    item.is_active = item.is_active === 1 ? '已激活' : '未激活';
                    // item.image_size = item.image_size === 1 ? '大图' : '小图';
                    // item.update_date = item.created_date.split(' ')[0];
                    // console.log(item);
                    return new News({
                        id: item.id,
                        title: item.title,
                        // desc: item.desc,
                        imgSrc: item.src,
                        // imgSize: item.image_size,
                        activeState: item.is_active,
                        sortOrder: item.sort_order,
                        createDate: item.created_date,
                        content: item.content === null ? '' : item.content,
                        link: item.link
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
            PopoverColumn,
            Ueditor
        }
    };
</script>



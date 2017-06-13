<template>
    <div>
        <m-tool-bar style="margin-bottom: 10px;"
                    @new="handleCreateNew"></m-tool-bar>
        <m-table
            v-loading="loading"
            :data="data"
            :action-width="300"
            @view="view"
            @edit="edit"
            @del="del">
            <el-table-column
                v-for="(item, index) in columns" 
                :key="item.prop"
                :label="item.label"
                :prop="item.prop"
                :width="item.width"
            >
            </el-table-column>
        </m-table>
        <div style="text-align: center; margin-top: 15px;">
            <el-pagination v-show="(total / data.length) > 1" 
                        layout="prev, pager, next" 
                        :total="total"
                        :current-page="currentPage"
                        @current-change="handleCurrentPageChange">
            </el-pagination>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="visible" :size="dialogSize">
            <el-form ref="form" :rules="rules" :model="formData" :label-width="labelWidth + 'px'">
                <el-form-item label="上传图片">
                    <m-upload filePrefix="banner-" 
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
                <el-form-item label="激活状态">
                    <el-switch on-text="" off-text="" v-model="formData.isActive"></el-switch>
                </el-form-item>
                <el-form-item label="优先级">
                    <el-slider v-model="formData.sortOrder"></el-slider>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">{{ submitText }}</el-button>
                    <el-button @click="onReset('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import { Message } from 'element-ui';
    import MTable from 'base/table/table';
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
                columns: bannerColumns,
                total: 0,
                offset: 0,
                limit: 10,
                isCreate: false,
                visible: false,
                dialogSize: 'tiny',
                labelWidth: 100,
                formData: {
                    isActive: true,
                    sortOrder: 50,
                    imgUrl: ''
                },
                rules: {
                    imgUrl: [
                        { required: true, message: '请选择图片' }
                    ]
                }
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
        created() {
            // console.log(this.$message);
            this._getList();
        },
        methods: {
            view(index, row, col, store) {
                console.log(row.id);
            },
            edit(index, row, col, store) {
                console.log(row.id);
            },
            del(index, row, col, store) {
                console.log(row.id);
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
                        _self._putBanner();
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

            },
            _putBanner() {
                // axios
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
                    this.data = this._normalize(res.data.data.rows);
                    this.total = res.data.data.total;
                    this.loading = false;
                }).catch(error => {
                    console.log(error);
                    this.loading = false;
                });
            },
            _normalize(rows) {
                return rows.map(item => {
                    item.is_active = item.is_active === 1 ? '已激活' : '未激活';
                    item.created_date = item.created_date.split(' ')[0];
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
            MUpload
        }
    };
</script>



<template>
    <div>
        <m-tool-bar style="margin-bottom: 10px;"
                    :search-text="searchText"
                    @input="handleInput"
                    show-search
                    placeholder="标题/区域/类型"
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
                    <m-upload filePrefix="articles-"
                              :ratio="1.8"
                              :img-width="300"
                              :image-url="formData.imgSrc"
                              @domain="handleDomain"
                              @progress="handleUploadProgress"
                              @success="handleUploadSuccess"
                              @error="handleUploadError"></m-upload>
                </el-form-item>
                <el-form-item label="封面图片地址" prop="imgSrc">
                    <el-input readonly :value="formData.imgSrc"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="formData.title" placeholder="请填写咨询标题"></el-input>
                </el-form-item>
                <el-form-item label="文章类型">
                    <el-select v-model="formData.type">
                        <el-option
                            v-for="item in typeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择地区">
                    <el-cascader
                        :options="addressOptions"
                        v-model="formData.address"
                        @active-item-change="handleAddressItemChange"></el-cascader>
                </el-form-item>
                <!-- <el-form-item label="链接地址">
                    <el-input v-model="formData.link" placeholder="链接地址优先级高于编辑内容"></el-input>
                </el-form-item> -->
                <el-form-item label="激活状态" prop="isActive">
                    <el-switch on-text="" off-text="" v-model="formData.isActive"></el-switch>
                </el-form-item>
                <!-- <el-form-item label="优先级" prop="sortOrder">
                    <el-slider v-model="formData.sortOrder"></el-slider>
                </el-form-item> -->
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
    import Article from 'common/js/Article';
    import MUpload from 'components/upload/upload';
    import PopoverColumn from 'base/column/popover-column';
    import { articlesColumns } from 'common/js/config';
    import Ueditor from 'components/ueditor/ueditor-2';
    import MToolBar from 'base/toolbar/toolbar';
    import axios from 'axios';

    export default {
        data() {
            return {
                data: [],
                loading: true,
                isUploadingData: false,
                columns: articlesColumns,
                total: 0,
                offset: 0,
                limit: 10,
                searchText: '',
                isCreate: false,
                visible: false,
                dialogSize: 'small',
                labelWidth: 140,
                addressOptions: [],
                typeOptions: [],
                formData: {
                    imgSrc: '',
                    title: '',
                    type: '',
                    address: ['0', '0', '0'],
                    isActive: false,
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
                return this.isCreate ? '新建文章' : '编辑文章';
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
            this._getProvinceList();
            this._getTypeList();
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
                // this.formData.sortOrder = row.sortOrder;
                this.formData.title = row.title;
                // this.formData.desc = row.desc;
                // this.formData.link = row.link;
                this.formData.content = row.content;
                this.formData.address = [row.provinceId, row.cityId, row.areaId];
                this.formData.type = row.typeId;

                this.isCreate = false;
                this.visible = true;
                // console.log(row.id);
            },
            del(index, row, col, store) {
                // console.log(row.id);
                this._batchDelete([row.id]);
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
            handleAddressItemChange(valary) {
                let provinceId = parseInt(valary[0], 10);
                let provinceIdx = this.addressOptions.findIndex(function(el, index) {
                    return parseInt(el.value, 10) === provinceId;
                });
                if (valary.length === 1) {
                    if (provinceId === 0) {
                        this.addressOptions[provinceIdx].children = [
                            {
                                value: '0',
                                label: '--市--',
                                children: []
                            }
                        ];
                    } else {
                        // 点击了省份
                        // this.addressOptions.
                        if (this.addressOptions[provinceIdx].children.length === 0) {
                            axios({
                                method: 'get',
                                url: '/api/address/citylist',
                                params: {
                                    provinceId
                                }
                            }).then(res => {
                                if (res.data.success) {
                                    this.addressOptions[provinceIdx].children = [{
                                        value: '0',
                                        label: '--市--',
                                        children: []
                                    }].concat(res.data.data.map((el, index) => {
                                        return {
                                            value: el.city_id,
                                            label: el.name,
                                            children: []
                                        };
                                    }));
                                } else {
                                    Message({
                                        message: res.data.msg,
                                        type: 'warning'
                                    });
                                }
                            }).catch(error => {
                                console.log(error);
                                // this.loading = false;
                            });
                        }
                    }
                } else if (valary.length === 2) {
                    let cityId = parseInt(valary[1], 10);
                    let cityIdx = this.addressOptions[provinceIdx].children.findIndex(function(el, index) {
                        return parseInt(el.value, 10) === cityId;
                    });
                    if (cityId === 0) {
                        this.addressOptions[provinceIdx].children[cityIdx].children = [{
                            value: '0',
                            label: '--区域--'
                        }];
                    } else {
                        if (this.addressOptions[provinceIdx].children[cityIdx].children.length === 0) {
                            axios({
                                method: 'get',
                                url: '/api/address/arealist',
                                params: {
                                    cityId
                                }
                            }).then(res => {
                                if (res.data.success) {
                                    this.addressOptions[provinceIdx].children[cityIdx].children = [{
                                        value: '0',
                                        label: '--区域--'
                                    }].concat(res.data.data.map((el, index) => {
                                        return {
                                            value: el.area_id,
                                            label: el.name
                                        };
                                    }));
                                } else {
                                    Message({
                                        message: res.data.msg,
                                        type: 'warning'
                                    });
                                }
                            }).catch(error => {
                                console.log(error);
                                // this.loading = false;
                            });
                        }
                    }
                }
            },
            onSubmit(formName) {
                var _self = this;
                this.$refs[formName].validate(function(valid) {
                    if (valid) {
                        if (_self.isCreate) _self._putArticle();
                        else _self._editArticle();
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
                this.formData.isActive = false;
                this.formData.title = '';
                this.formData.content = '';
                this.formData.address = ['0', '0', '0'];
            },
            _beforeHandleSuccess() {
                this.isUploadingData = false;
                this.visible = false;
            },
            _batchDelete(ids) {
                axios({
                    method: 'post',
                    url: '/api/articles/batchdel',
                    data: {
                        ids: ids,
                        project: 'guangfujie'
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
            _editArticle() {
                this.isUploadingData = true;

                axios({
                    method: 'post',
                    url: '/api/articles/edit',
                    data: {
                        id: this.currentId,
                        src: this.formData.imgSrc,
                        isActive: this.formData.isActive ? 1 : 0,
                        title: this.formData.title,
                        type: this.formData.type,
                        province: this.formData.address[0],
                        city: this.formData.address[1],
                        area: this.formData.address[2],
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
            _putArticle() {
                this.isUploadingData = true;
                axios({
                    method: 'post',
                    url: '/api/articles/create',
                    data: {
                        src: this.formData.imgSrc,
                        isActive: this.formData.isActive ? 1 : 0,
                        title: this.formData.title,
                        type: this.formData.type,
                        province: this.formData.address[0],
                        city: this.formData.address[1],
                        area: this.formData.address[2],
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
                    url: '/api/articles/list',
                    params: {
                        offset: this.offset,
                        limit: this.limit,
                        search: this.searchText,
                        project: 'guangfujie'
                        // search: this.searchText
                    }
                }).then(res => {
                    this.loading = false;
                    if (res.data.success) {
                        this.data = this._normalize(res.data.data.rows);
                        console.log(res.data.data.total);
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
            _getTypeList() {
                axios({
                    method: 'get',
                    url: '/api/articles/typelist',
                    params: {}
                }).then(res => {
                    if (res.data.success) {
                        let temp = res.data.data.map((el, index) => {
                            return {
                                value: el.id,
                                label: el.name
                            };
                        });
                        this.typeOptions = temp;
                    } else {
                        Message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            _getProvinceList() {
                axios({
                    method: 'get',
                    url: '/api/address/provincelist',
                    params: {}
                }).then(res => {
                    if (res.data.success) {
                        let temp = res.data.data.map((el, index) => {
                            return {
                                value: el.province_id,
                                label: el.name,
                                children: []
                            };
                        });
                        this.addressOptions = [{
                            value: '0',
                            label: '--省--',
                            children: [{
                                value: '0',
                                label: '--市--',
                                children: [
                                    {
                                        value: '0',
                                        label: '--区域--'
                                    }
                                ]
                            }]
                        }].concat(temp);
                    } else {
                        Message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    // this.loading = false;
                });
            },
            _normalize(rows) {
                return rows.map(item => {
                    item.is_active = item.is_active === 1 ? '已激活' : '未激活';
                    // item.image_size = item.image_size === 1 ? '大图' : '小图';
                    // item.update_date = item.created_date.split(' ')[0];
                    // console.log(item);
                    console.log(item);
                    return new Article({
                        id: item.id,
                        title: item.title,
                        // desc: item.desc,
                        imgSrc: item.image,
                        // imgSize: item.image_size,
                        address: item.addName || '全国',
                        activeState: item.is_active,
                        updateDate: item.update_date,
                        content: item.content === null ? '' : item.content,
                        provinceId: item.province,
                        cityId: item.city,
                        areaId: item.area,
                        typeId: item.type_id,
                        typeName: item.type
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



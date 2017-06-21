<template>
    <div>
        <m-table
            v-loading="loading"
            :data="data"
            :show-actions="false"
            :show-selection="false">
            <template v-for="(item, index) in columns">
                <el-table-column
                    v-if="!item._custom"
                    :key="item.prop"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width">
                </el-table-column>
                <el-table-column
                    v-else-if="item._view='switch-column'"
                    :key="item.prop"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width"
                >
                    <template scope="scope">
                        <el-switch :on-value="1" :off-value="0" on-text="ok" off-text="no" v-model="scope.row.isContact" @change="handleSwitchChange(scope)()"></el-switch>
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
    </div>
</template>

<script type="text/ecmascript-6">
    import MTable from 'base/table/table';
    import ContactUs from 'common/js/contactus';
    import { contatctUsColumns } from 'common/js/config';
    import { Message } from 'element-ui';
    import axios from 'axios';

    export default {
        data() {
            return {
                data: [],
                loading: true,
                columns: contatctUsColumns,
                total: 0,
                offset: 0,
                limit: 10
            };
        },
        computed: {
            currentPage() {
                return this.offset + 1;
            }
        },
        created() {
            this._getList();
        },
        methods: {
            handleSwitchChange(scope) {
                // console.log(val);
                // console.log(scope.row);
                let id = scope.row.id;
                let isContact = parseInt(scope.row.isContact, 10);
                let _self = this;
                return function() {
                    _self._toggleContact(id, isContact === 0 ? 1 : 0);
                };
            },
            handleCurrentPageChange(currentPage) {
                this.offset = currentPage - 1;
            },
            _toggleContact(id, isContact) {
                // console.log(isContact);
                let backContactState = isContact === 1 ? 0 : 1;
                axios({
                    method: 'post',
                    url: '/api/contactus/toggle',
                    data: {
                        id: id,
                        isContact: isContact
                    }
                }).then(res => {
                    if (res.data.success) {
                        Message({
                            message: '操作成功',
                            type: 'success'
                        });
                    } else {
                        Message({
                            message: '操作失败',
                            type: 'warning'
                        });
                        this._back(id, backContactState);
                    }
                }).catch(error => {
                    console.log(error);
                    Message({
                        message: '网络错误',
                        type: 'error'
                    });
                    this._back(id, backContactState);
                });
            },
            _back(id, isContact) {
                let data = this.data.find(item => item.id === id);
                Object.assign(data, {
                    isContact
                });
            },
            _getList() {
                this.loading = true;
                axios({
                    method: 'get',
                    url: '/api/contactus/list',
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
                    return new ContactUs({
                        id: item.id,
                        name: item.name,
                        tel: item.tel,
                        address: item.address,
                        area: item.area,
                        msg: item.msg,
                        isContact: item.is_contact,
                        createdDate: item.created_date
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
            MTable
        }
    };
</script>



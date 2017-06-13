<template>
    <div>
        <m-tool-bar style="margin-bottom: 10px;"></m-tool-bar>
        <m-table 
            :data="data"
            :action-width="300"
            v-loading="loading"
            show-content-icon
            @view="view"
            @edit="edit"
            @editContent="editContent"
            @del="del">
            <el-table-column
                v-for="(item, index) in columns" 
                :key="item.prop"
                :label="item.label"
                :prop="item.prop"
                :width="item.width">
            </el-table-column>
        </m-table>
        <div style="text-align: center; margin-top: 15px;">
            <el-pagination v-show="(total / data.length) > 1" 
                        layout="prev, pager, next" 
                        :total="total" 
                        :current-page="offset + 1"
                        @current-change="handleCurrentPageChange">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import MTable from 'base/table/table';
    import Case from 'common/js/case';
    import { caseColumns } from 'common/js/config';
    // import { getBannerList } from 'api/banner';
    import MToolBar from 'base/toolbar/toolbar';
    import axios from 'axios';

    export default {
        data() {
            return {
                data: [],
                loading: true,
                columns: caseColumns,
                total: 0,
                offset: 0,
                limit: 10
            };
        },
        computed: {
            columnProps() {
                return Case.getProps();
            },
            columnLabels() {
                return Case.getLabels();
            }
        },
        created() {
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
            editContent(index, row, col, store) {
                console.log(row.id);
            },
            handleCurrentPageChange(currentPage) {
                this.offset = currentPage - 1;
            },
            _getList() {
                this.loading = true;
                axios({
                    method: 'get',
                    url: '/api/case/list',
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
                    item.image_size = item.image_size === 1 ? '大图' : '小图';
                    // item.update_date = item.created_date.split(' ')[0];
                    return new Case({
                        id: item.id,
                        title: item.title,
                        desc: item.desc,
                        imgSrc: item.src,
                        imgSize: item.image_size,
                        activeState: item.is_active,
                        sortOrder: item.sort_order,
                        updateDate: item.update_date
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
            MToolBar
        }
    };
</script>



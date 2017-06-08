<template>
    <m-table 
        :data="data" 
        :columns="columns" 
        :operator-col="operatorCol"
        @view="view"
        @edit="edit"
        @del="del"></m-table>
</template>

<script type="text/ecmascript-6">
    import MTable from 'base/table/table';
    import axios from 'axios';
    const FILEDS_MAP = {
        id: {
            label: 'ID',
            width: 100
        },
        src: {
            label: '图片',
            width: 200
        },
        is_active: {
            label: '激活状态',
            width: 100
        },
        sort_order: {
            label: '优先级',
            width: 100
        },
        created_date: {
            label: '创建日期',
            width: 150
        }
    };

    export default {
        data() {
            return {
                data: [],
                operatorCol: {
                    label: '操作',
                    width: 'auto',
                    show: true
                }
            };
        },
        computed: {
            columns() {
                console.log(this.keys + 'keys');
                let rst = this.keys.map(key => {
                    let obj = {};
                    console.log(key);
                    if (FILEDS_MAP[key]) {
                        obj.label = FILEDS_MAP[key].label;
                        obj.width = 'auto';
                        obj.prop = key;
                        obj.view = 'BaseColumn';
                    }
                    return obj;
                });
                rst.push({
                    label: '操作',
                    width: 'auto',
                    view: 'OperatorColumn'
                });
                return rst;
            }
        },
        created() {
            this.keys = Object.keys(FILEDS_MAP);
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
            _getList() {
                axios({
                    method: 'get',
                    url: '/api/banner/list',
                    params: {
                        offset: 0,
                        limit: 10
                    }
                }).then(res => {
                    this.data = this._normalize(res.data.data.rows);
                }).catch(error => console.log(error));
            },
            _normalize(rows) {
                return rows.map(item => {
                    item.is_active = item.is_active === 1 ? '已激活' : '未激活';
                    item.created_date = item.created_date.split(' ')[0];
                    return item;
                });
            }

        },
        components: {
            MTable
        }
    };
</script>

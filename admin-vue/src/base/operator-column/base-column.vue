<template>
    <el-table-column
        :label="options.label"
        :width="options.width"
        :prop="options.prop">
    </el-table-column>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            options: {
                type: Object,
                default: function() {
                    return {};
                }
            }
        }
    };
</script>
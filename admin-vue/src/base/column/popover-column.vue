<template>
    <div>
        <el-popover trigger="click" placement="right" width="200">
            <img :src="imageUrl" style="width: 100%;"/>
            <el-tag slot="reference">{{ text }}</el-tag>
        </el-popover>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            imageUrl: {
                type: String,
                default: ''
            },
            text: {
                type: String,
                default: 'tag'
            }
        }
    };
</script>
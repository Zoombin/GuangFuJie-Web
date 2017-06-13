<template>
    <div>
        <span>{{ state ? trueText : falseText }}</span>
        <el-switch 
            v-model="state"
            on-text="ON"
            off-text="OFF"
            @change="stateChange"></el-switch>
    </div>
</template>

<script type="ecmascript-6">
    export default {
        props: {
            state: {
                type: Boolean,
                default: false
            },
            trueText: {
                type: String,
                default: ''
            },
            falseText: {
                type: String,
                default: ''
            }
        },
        methods: {
            stateChange(newValue) {
                this.$emit('change', newValue);
            }
        }
    };
</script>
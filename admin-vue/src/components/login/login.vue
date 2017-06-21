<template>
    <div class="login">
        <div class="form-wrapper">
            <el-form ref="form" label-position="top" :rules="rules" :model="formData" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native="onSubmit" :loading="isUploadingData">登录</el-button>
                    <el-button @click.native="onReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Cookies from 'js-cookie';
    import axios from 'axios';
    import { Message } from 'element-ui';
    // console.log(Cookies.get());
    export default {
        data() {
            return {
                formData: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名' }
                    ],
                    password: [
                        { required: true, message: '请输入密码' }
                    ]
                },
                isUploadingData: false
            };
        },
        methods: {
            onSubmit() {
                var _self = this;
                this.$refs.form.validate(function(valid) {
                    if (valid) {
                        _self.login();
                    } else {
                        Message({
                            message: '请检查表单',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            login() {
                axios({
                    url: '/api/user/signin',
                    method: 'post',
                    data: {
                        userName: this.formData.username,
                        password: this.formData.password
                    }
                }).then(res => {
                    if (res.data.success) {
                        Cookies.set('islogin', true);
                        this.$router.push('/banner');
                    } else {
                        Message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            onReset() {
                this.$refs.form.resetFields();
            }
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .login
        position: fixed
        top: 0
        bottom: 0
        left: 0
        right: 0
        z-index: 1000
        background: #fff
        .form-wrapper
            width: 280px
            position: absolute
            top: 50%
            left: 50%
            transform: translate3d(-50%, -50%, 0)
            padding: 20px
            border: 1px solid #f0f0f0
            border-radius: 3px
</style>
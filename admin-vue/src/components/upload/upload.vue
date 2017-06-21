<template>
    <div>
        <el-upload class="img-uploader"
                   :action="action" 
                   :data="formData"
                   :show-file-list="showFileList" 
                   :file-list="fileList"
                   :on-progress="onProgress"
                   :on-success="onSuccess"
                   :on-error="onError"
                   :before-upload="beforeUpload"
        >
            <img v-if="imageUrl" :src="imageUrl" :style="imgSty"/>
            <i v-else class="el-icon-plus" :style="iconSty"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1mb，尺寸 {{ size }}</div>
        </el-upload>
    </div>
</template>

<script type="text/ecmascript-6">
    import { guid, getExt } from 'common/js/utils';
    import { Message } from 'element-ui';
    import axios from 'axios';
    export default {
        data() {
            return {
                formData: {}
            };
        },
        props: {
            action: {
                type: String,
                default: 'http://upload.qiniu.com/'
            },
            showFileList: {
                type: Boolean,
                default: false
            },
            fileList: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            filePrefix: {
                type: String,
                default: 'upload-'
            },
            ratio: {
                type: Number,
                default: 1
            },
            imgWidth: {
                type: Number,
                default: 400
            },
            imageUrl: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: ''
            }
        },
        computed: {
            imgHeight() {
                return (1 / this.ratio) * this.imgWidth;
            },
            imgSty() {
                return {
                    width: this.imgWidth + 'px',
                    height: this.imgHeight + 'px',
                    display: 'block'
                };
            },
            iconSty() {
                return {
                    fontSize: '30px',
                    color: '#8c939d',
                    width: this.imgWidth + 'px',
                    height: this.imgHeight + 'px',
                    lineHeight: this.imgHeight + 'px',
                    textAlign: 'center'
                };
            }
        },
        methods: {
            onProgress(event, file, fileList) {
                this.$emit('progress', event, file, fileList);
            },
            onSuccess(response, file, fileList) {
                this.$emit('success', response, file, fileList);
            },
            onError(err, file, fileList) {
                this.$emit('error', err, file, fileList);
            },
            beforeUpload(file) {
                console.log(file);

                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt1M = (file.size / 1024 / 1024) <= 1;

                if (!isJPG && !isPNG) {
                    Message({
                        message: '上传图片只能是 PNG/JPG 格式!',
                        type: 'warning'
                    });
                    return false;
                }

                if (!isLt1M) {
                    Message({
                        message: '上传图片大小不能超过 1mb!',
                        type: 'warning'
                    });
                    return false;
                }


                let ext = getExt(file.name);
                let id = guid();
                let key = this.filePrefix + id + ext;
                return axios({
                    method: 'get',
                    url: '/api/token',
                    params: {
                        key: key
                    }
                }).then(res => {
                    let data = res.data;
                    console.log(data);
                    this.domainUrl = data.domainUrl;
                    this.$emit('domain', this.domainUrl);
                    this.formData = {
                        key: data.key,
                        token: data.token
                    };
                }).catch(error => console.log(error));
            }
        }
    };
</script>
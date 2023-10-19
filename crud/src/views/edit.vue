<template>
  <div>

    <van-nav-bar
      title="修改信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div style="display: flex;justify-content: center;margin-top: 20px;">
      <van-form @submit="updateUser">
        <van-field
          name="uploader"
          label="头像">
          <template #input>
            <van-uploader
              v-model="fileList"
              :max-count="1"
              :after-read="afterRead"
              result-type="dataUrl"
              :deletable="false"
            >
            <van-image round width="100" height="100" :src="userData.avatar" />
            </van-uploader>
          </template>
        </van-field>
        <van-field
          v-model="userData.nickname"
          name="昵称"
          label="昵称"
          placeholder="昵称"
        />
        <van-field 
          v-model="userData.sex"
          label="性别">
          <template #input>
            <van-radio-group v-model="userData.sex" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="0">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field 
          v-model="userData.signature"
          name="签名"
          label="签名"
          placeholder="签名"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>

  </div>
</template>

<script>
import { uploadAvatar, getUserByName, updateUser } from "../http/api";
import { Toast } from 'vant';

export default {
  name: "My",
  data() {
    return {
      fileList: [],
      userData: {},
      avatarFile: {}
    };
  },
  created() {
    getUserByName(localStorage.getItem("username")).then((res) => {
      this.userData = res.data.data[0]
      console.log(this.userData);
    });
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const formData = new FormData();
      Object.keys(file).forEach((key) => {
        formData.append(key, file[key]);
      });
      formData.append("id", this.userData.id);
      uploadAvatar(formData).then((res) => {
        console.log(res);
        this.avatarFile = file
        this.userData.avatar = "http://localhost:8080/api/user/picSrc/" + res.data.data
      });
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    updateUser() {
      updateUser(this.userData).then(res => {
        console.log(res);
        if(res.data.code == 200) {
          Toast.success(res.data.msg);
          // 发送修改头像请求
          
        }
      })
    }
  },
};
</script>

<style>
</style>

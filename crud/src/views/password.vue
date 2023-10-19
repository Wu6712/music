<template>
  <div>

    <van-nav-bar
      title="修改密码"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="main">
    <div class="block">
      <van-form @submit="modPass" class="form">
        <van-field
          class="field"
          v-model="password"
          name="原密码"
          label="原密码"
          placeholder="请填写原密码"
          :rules="[{ required: true }]"
        />
        <van-field
          class="field"
          v-model="newpassword"
          type="password"
          name="新密码"
          label="新密码"
          placeholder="请填写新密码"
          :rules="[{ required: true }]"
        />
        <van-field
          class="field"
          v-model="repassword"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="请填写确认密码"
          :rules="[{ required: true }]"
        />
        <div style="margin: 16px">
          <van-button
            round
            block
            native-type="submit"
            style="background: #d4237a; color: #fff"
            >修改</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
  </div>
</template>

<script>
import { getUserByName,modPassword } from "../http/api";
import { Toast } from "vant";

export default {
  name: "Password",
  data() {
    return {
      username: "",
      password: "",
      newpassword: "",
      repassword: "",
    };
  },
  created() {
    getUserByName(localStorage.getItem("username")).then((res) => {
      console.log(res);
      this.username = localStorage.getItem("username");
    });
  },
  methods: {
    modPass(values) {
      if (this.newpassword == this.repassword) {
        modPassword({ username: this.username, password: this.password, newpassword: this.newpassword }).then(
          (res) => {
            console.log(res);
            if (res.status == 200) {
              this.$router.push({ name: "login" });
              Toast.success("修改成功");
            }else{
              Toast.fail('修改失败')
            }
          }
        );
      } else {
        Toast.fail("两次密码不一致");
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    }
  },
};
</script>

<style>
.main {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
}

.block {
  width: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
}

.form {
  width: 90%;
}

.field {
  color: white;
  background-color: rgba(0, 0, 0, 0);
}
</style>

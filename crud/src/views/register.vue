<template>
  <div class="main">
    <div class="block">
      <van-form @submit="register" class="form">
        <van-field
          class="field"
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="请填写用户名"
          :rules="[{ required: true }]"
        />
        <van-field
          class="field"
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请填写密码"
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
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { register } from "../http/api";
import { Toast } from "vant";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      repassword: "",
    };
  },
  methods: {
    register(values) {
      if (this.password == this.repassword) {
        register({ username: this.username, password: this.password }).then(
          (res) => {
            console.log(res);
            if (res.status == 200) {
              this.$router.push({ name: "login" });
              Toast.success("注册成功");
            }
          }
        );
      } else {
        Toast.fail("两次密码不一致");
      }
    },
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

<template>
  <div class="main">
    <div class="block">
      <van-form @submit="login" class="form">
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
        <div style="margin: 16px">
          <van-button
            round
            block
            native-type="submit"
            style="background: #d4237a; color: #fff"
            >登录</van-button
          >
        </div>
        <div
          style="margin: 16px; font-size: 10px; text-align: center"
          @click="register"
        >
          还没有账号?立即注册
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { login } from "../http/api";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login(values) {
      login({ username: this.username, password: this.password }).then(
        (res) => {
          console.log(res);
          if (res.data.status == 200) {
            localStorage.setItem("username",this.username)
            this.$router.push({ name: "index" });
          }
        }
      );
    },
    register() {
      this.$router.push({ name: "register" });
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

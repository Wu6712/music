<template>
  <div>
    <div class="center">
      <van-image round width="100" height="100" :src="user.avatar" />
    </div>
    <div class="text">{{ username }}</div>
    <van-grid>
      <van-grid-item icon="play-circle-o" text="本地音乐" />
      <van-grid-item icon="down" text="下载管理" />
      <van-grid-item icon="service-o" text="我的电台" />
      <van-grid-item icon="star-o" text="我的收藏" />
    </van-grid>
    <van-cell center  title="修改信息" icon="edit" to="edit"/>
    <van-cell center  title="修改密码" icon="edit" to="password"/>
    <van-cell center  title="创作者中心" icon="edit" />
    <van-cell center  title="听歌识曲" icon="play-circle-o" />
    <van-cell center  title="音乐闹钟" icon="clock-o" />
    <van-cell center  title="音乐云盘" icon="idcard" />
    <van-cell center  title="定时停止" icon="clock-o" />
    <van-cell center  title="扫一扫" icon="scan" />

    <van-button @click="logout" type="danger" size="large" round style="margin-top: 10px;">退出登录</van-button>

  </div>
</template>

<script>
import { getUserByName } from "../http/api";

export default {
  name: "My",
  data() {
    return {
      username: "",
      user: [],
    };
  },
  created() {
    getUserByName(localStorage.getItem("username")).then((res) => {
      console.log(res);
      this.username = localStorage.getItem("username");
      this.user = res.data.data[0];
    });
  },
  methods: {
    logout() {
      localStorage.removeItem("username")
      this.$router.push({ name: "login" });
    }
  },
};
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.text {
  text-align: center;
  margin-top: 20px;
}
</style>

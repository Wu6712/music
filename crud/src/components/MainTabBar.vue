<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/index" activeColor="purple">
        <img slot="item-icon" src="~assets/img/tabbar/index.png" alt="" />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/index_s.png"
          alt=""
        />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/music" activeColor="purple">
        <img slot="item-icon" src="~assets/img/tabbar/music.png" alt="" />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/music_s.png"
          alt=""
        />
        <div slot="item-text">音乐</div>
      </tab-bar-item>
      <tab-bar-item path="/my" activeColor="purple">
        <img slot="item-icon" src="~assets/img/tabbar/my.png" alt="" />
        <img slot="item-icon-active" src="~assets/img/tabbar/my_s.png" alt="" />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/tabbar/TabBar";
import TabBarItem from "components/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style>
</style>

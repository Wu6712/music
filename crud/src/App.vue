<template>
  <div id="app">
    <router-view />
    <main-tab-bar v-if="show"></main-tab-bar>
  </div>
</template>

<script type="module">
import MainTabBar from "components/MainTabBar";

export default {
  name: "App",
  data() {
    return {
      show: true,
    };
  },
  components: {
    MainTabBar,
  },
  watch: {
    $route() {
      if (
        this.$route.path === "/login" ||
        this.$route.path === "/play" ||
        this.$route.path === "/temp" ||
        this.$route.path === "/register" ||
        this.$route.path === "/edit" ||
        this.$route.path === "/password"||
        this.$route.path === "/search"
      ) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
  },
};
</script>

<style>
@import "assets/css/base";
</style>

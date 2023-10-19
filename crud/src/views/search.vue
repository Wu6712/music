<template>
  <div>
    <van-cell
      v-for="(item, index) in musics"
      :key="index"
      :title="item.name"
      @click="goPlay(item.id)"
    />
  </div>
</template>

<script>
import { getMusicListFuzzy } from "../http/api";

export default {
  name: "Search",
  data() {
    return {
      musics: [],
    };
  },
  created() {
    getMusicListFuzzy(this.$route.query.value).then((res) => {
      this.musics = res.data.data;
    });
  },
  methods: {
    goPlay(id) {
      this.$router.push({ name: "play", query: { id: id } });
    },
  },
};
</script>

<style>
</style>

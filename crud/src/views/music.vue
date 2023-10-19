<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      background="#d4237a"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />

    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img
          class="image_width_100"
          v-lazy="image.link"
        />
      </van-swipe-item>
    </van-swipe>
    <div>古典</div>
    <div v-for="(item,index) in musics" :key="index">
      <div v-if="item.type == 0">
        <van-cell
          :key="index"
          :title="item.name"
          @click="goPlay(item.id)"
        />
      </div>
    </div>
    <div>流行</div>
    <div v-for="(item,index) in musics" :key="index">
      <div v-if="item.type == 1">
        <van-cell
          :key="index"
          :title="item.name"
          @click="goPlay(item.id)"
        />
      </div>
    </div>
    <div>古风</div>
    <div v-for="(item,index) in musics" :key="index">
      <div v-if="item.type == 2">
        <van-cell
          :key="index"
          :title="item.name"
          @click="goPlay(item.id)"
        />
      </div>
    </div>
    <div>说唱</div>
    <div v-for="(item,index) in musics" :key="index">
      <div v-if="item.type == 3">
        <van-cell
          :key="index"
          :title="item.name"
          @click="goPlay(item.id)"
        />
      </div>
    </div>
    
  </div>
</template>

<script>
import { getBannerList, getMusicList, getMusicListFuzzy } from "../http/api";

export default {
  name: "Music",
  data() {
    return {
      value: "",
      images: [],
      musics: [],
    };
  },
  created() {
    getBannerList().then((res) => {
      console.log(res.data);
      this.images = res.data.data;
    });
    getMusicList().then((res) => {
      console.log(res.data);
      this.musics = res.data.data;
    });
  },
  methods: {
    goPlay(id) {
      this.$router.push({ name: "play", query: { id: id } });  //路由到以play为名字的界面
    },
    onSearch(value){

      if(value === '') {
        getMusicList().then((res) => {
        console.log(res.data);
        this.musics = res.data.data;
        })
      } else {
        getMusicListFuzzy(value).then(res => {
          console.log(res);
          this.musics = res.data.data;
        })
      }
    }
  },
};
</script>

<style>
.image_width_100 {
  width: 100%;
  height: 172.68px
}
</style>

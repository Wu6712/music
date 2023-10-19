<template>
  <div>
    <div class="news">
      <div v-for="(item,index) in news" :key="item.id">
      <div class="block">
        <div class="mt10"></div>
        <div class="title">{{ item.name }}</div>
        <div class="mt10"></div>
        <div style="display:flex;">
          <img class="ml10" v-show="index % 2 == 0" style="width: 40vw" :src="item.link" alt="" />
          <div class="ml10 mr10">{{ item.content }}</div>
          <img class="mr10" v-show="index % 2 != 0" style="width: 40vw" :src="item.link" alt="" />
        </div>
        <div class="mt10"></div>
        <div style="background:#eee;height:10px"></div>
      </div>
    </div>
    </div>
    <div class="music">
      <div class="music__main">
        <div
          :class="['music__main__cover', isPlay ? 'active' : '']"
          @click="play"
        >
          <img src="~assets/img/mix/note.jpg" />
        </div>
        <div class="music__main__timeBar">
          <div class="time">
            <span>{{ realMusicTime }}</span>
            <span>{{ totalMusicTime }}</span>
          </div>
          <div class="bar" ref="bar" @click="handClickBar">
            <div class="bar__slid" ref="slid" @click="handClickBar"></div>
          </div>
        </div>
      </div>
      <div class="music__btn" style="margin-right: 20px">
        <van-icon name="audio" @click="switchMusic" />
      </div>
      <div class="music__mask"></div>
      <audio ref="music" :src="musicOne"></audio>
    </div>
  </div>
</template>

<script>
import { getNewsList, getMusicList } from "../http/api";
export default {
  data() {
    return {
      isPlay: false,
      realMusicTime: "00:00",
      totalMusicTime: "00:00",
      musics: [],
      musicOne: "",
      news: [],
    };
  },
  created() {
    getMusicList().then((res) => {
      console.log(res.data);
      this.musics = res.data.data;
      this.musicOne = res.data.data[0].link;
    });
    getNewsList().then((res) => {
      console.log(res.data);
      this.news = res.data.data;
    });
  },
  mounted() {
    this.watchMusicTime();
  },
  methods: {
    play() {
      if (this.music.paused) {
        this.music.play();
        this.isPlay = true;
      } else {
        this.music.pause();
        this.isPlay = false;
      }
    },
    // 处理时间
    handlMusicTime() {
      //用秒数来显示当前播放进度
      let timeDisplay = Math.floor(this.music.currentTime); //获取实时时间
      //分钟
      let minute = parseInt(timeDisplay / 60);
      if (minute < 10) {
        minute = "0" + minute;
      }
      //秒
      let second = Math.round(timeDisplay % 60);
      if (second < 10) {
        second = "0" + second;
      }
      this.realMusicTime = minute + ":" + second;
    },
    // 处理进度条
    handMusicBar() {
      let slid = this.$refs.slid;
      let duration = this.music.duration;
      let x = ((this.music.currentTime / duration) * 100).toFixed(2) + "%";
      slid.style.width = x;
    },
    // 处理点击进度条事件
    handClickBar(e) {
      const barTotalWidth = this.bar.offsetWidth; // bar 总宽度
      const rect = e.target.getBoundingClientRect(); // 元素右边距离页面边距的距离 返回上下左右
      let length = e.pageX - rect.left;
      this.music.currentTime = (length / barTotalWidth) * this.music.duration; // 计算播放时间 位置百分比*总时间
      this.$nextTick(() => {
        this.music.play();
        this.isPlay = true;
      });
    },
    // 切换歌曲
    switchMusic() {
      this.isPlay = false;
      this.musicOne = this.musics[Math.floor(Math.random() * 5)].link;
      this.music.load();
      // 文件下载完毕，如果不用等到全部下载完毕，可以用canplay事件
      this.music.addEventListener("canplaythrough", () => {
        this.music.play();
        this.isPlay = true;
      });
    },
    //使用事件监听方式捕捉事件
    watchMusicTime() {
      this.music = this.$refs.music;
      this.bar = this.$refs.bar;
      this.music.addEventListener(
        "timeupdate",
        () => {
          this.handlMusicTime();
          this.$nextTick(() => {
            this.handMusicBar();
          });
        },
        false
      );
      // 播放完毕
      this.music.addEventListener("ended", () => {
        this.switchMusic(); // 自动播放
      });
      // 捕获音频文件已准备完毕
      // 当媒体文件可以播放的时候会触发oncanplay事件,也可以用oncanplay
      this.music.oncanplaythrough = () => {
        let time = this.music.duration;
        //分钟
        let minutes = parseInt(time / 60);
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        //秒
        let seconds = Math.round(time % 60);
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        this.totalMusicTime = minutes + ":" + seconds;
      };
    },
  },
};
</script>

<style lang="less">
@keyframes musicRotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.news{
  padding-bottom: 100px;
}

.block {
  text-align: center;
  font-size: 13px;
}

.title{
  font-size:16;font-weight:700
}

.mt10{
  margin-top:10px
}

.ml10{
  margin-left: 10px;
}

.mr10{
  margin-right: 10px;
}

.music {
  width: 100%;
  // margin: 0 auto;
  border-radius: 15px;
  position: fixed;
  bottom: 49px;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
  &__main {
    display: flex;
    &__cover {
      width: 25px;
      height: 25px;
      overflow: hidden;
      border-radius: 50%;
      background-color: #dddddd;
      cursor: pointer;
      animation: musicRotate 10s linear infinite;
      animation-play-state: paused; // 暂定动画
      img {
        width: 100%;
        height: 100%;
      }
      &.active {
        animation-play-state: running; // 运行动画
      }
    }
    &__timeBar {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding-left: 20px;
      box-sizing: border-box;
      .time {
        display: flex;
        justify-content: space-between;
        color: #fff;
        span {
          font-size: 12px;
          line-height: 1;
        }
      }
      .bar {
        height: 8px;
        background-color: #fbfbfb;
        border-radius: 8px;
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        &__slid {
          position: absolute;
          left: 0;
          top: 0;
          background-color: #e24d80;
          height: 100%;
          width: 0;
          transition: width 0.3s;
        }
      }
    }
  }
  &__btn {
    position: absolute;
    right: 30px;
    top: 10px;
    i {
      font-size: 18px;
      color: #fff;
      cursor: pointer;
    }
  }
  &__mask {
    background-image: url("~assets/img/mix/note.jpg");
    z-index: -2;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(15px);
    opacity: 1;
    transition: all 0.8s;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    &::before {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: -1;
      content: "";
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
}
</style>

<template>
  <div>

    <van-nav-bar
      title="音乐"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <div class="container">
    <div class="title">{{ audioList[current].name }}</div>
    <div class="cartoon" ref="rotate">
      <img src="~assets/img/mix/note.jpg" alt="" />
    </div>
    <div class="wrip">
      <div class="progress_box">
        <van-slider
          v-model="currentTime"
          :max="duration"
          @change="sliderPlay"
          @input="sliderStop"
          @mousedown.native="isChange = true"
          @mouseup.native="isChange = false"
        />
      </div>
      <div class="multimedia_box">
        <div class="time">
          <span>{{ transTime(currentTime) }}</span>
          <span> / </span>
          <span>{{ transTime(duration) }}</span>
        </div>
      </div>
    </div>
    <div class="music_bottom">
      <svg
        @click="prev"
        t="1690166493287"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1421"
        width="40"
        height="40"
      >
        <path
          d="M206 865h-38c-30.928 0-56-25.072-56-56V216c0-30.928 25.072-56 56-56h38c30.928 0 56 25.072 56 56v593c0 30.928-25.072 56-56 56z m168.686-386.191l422.304-303.4c32.294-23.201 77.282-15.83 100.484 16.464A72 72 0 0 1 911 233.883v559.053c0 39.764-32.235 72-72 72a72 72 0 0 1-39.95-12.1L376.288 570.877c-25.73-17.16-32.677-51.93-15.517-77.66a56 56 0 0 1 13.915-14.408z"
          fill="#2c2c2c"
          p-id="1422"
        ></path>
      </svg>
      <svg
        @click="play(true)"
        v-if="!isPlay"
        t="1690166766816"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1269"
        width="40"
        height="40"
      >
        <path
          d="M505.6 1016C235.2 1016 14.4 795.2 14.4 524.8S233.6 32 505.6 32s491.2 220.8 491.2 491.2-220.8 492.8-491.2 492.8z m0-920C268.8 96 76.8 288 76.8 524.8c0 235.2 192 427.2 427.2 427.2s427.2-192 427.2-427.2C932.8 288 740.8 96 505.6 96z"
          fill="#2c2c2c"
          p-id="1270"
        ></path>
        <path
          d="M408 737.6c-4.8 0-9.6-1.6-14.4-3.2-11.2-4.8-17.6-16-17.6-28.8V318.4c0-11.2 6.4-22.4 17.6-28.8 11.2-4.8 22.4-4.8 33.6 1.6l289.6 193.6c9.6 6.4 14.4 16 14.4 27.2s-4.8 20.8-14.4 27.2L425.6 732.8c-4.8 3.2-11.2 4.8-17.6 4.8z m32-358.4v267.2L641.6 512l-201.6-132.8z"
          fill="#2c2c2c"
          p-id="1271"
        ></path>
      </svg>
      <svg
        @click="play(false)"
        v-else
        t="1690166784615"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1453"
        width="40"
        height="40"
      >
        <path
          d="M512 1003.2C243.2 1003.2 22.4 784 22.4 513.6 22.4 244.8 243.2 25.6 512 25.6s489.6 219.2 489.6 489.6C1001.6 784 780.8 1003.2 512 1003.2z m0-913.6C278.4 89.6 86.4 280 86.4 513.6s192 425.6 425.6 425.6 425.6-190.4 425.6-425.6S745.6 89.6 512 89.6z"
          fill="#2c2c2c"
          p-id="1454"
        ></path>
        <path
          d="M425.6 692.8c-17.6 0-32-14.4-32-32V377.6c0-17.6 14.4-32 32-32s32 14.4 32 32v283.2c0 17.6-14.4 32-32 32zM598.4 692.8c-17.6 0-32-14.4-32-32V377.6c0-17.6 14.4-32 32-32s32 14.4 32 32v283.2c0 17.6-14.4 32-32 32z"
          fill="#2c2c2c"
          p-id="1455"
        ></path>
      </svg>
      <svg
        @click="next"
        t="1690166480463"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1238"
        width="40"
        height="40"
      >
        <path
          d="M817 160h38c30.928 0 56 25.072 56 56v593c0 30.928-25.072 56-56 56h-38c-30.928 0-56-25.072-56-56V216c0-30.928 25.072-56 56-56zM648.314 546.191l-422.304 303.4c-32.294 23.201-77.282 15.83-100.484-16.464A72 72 0 0 1 112 791.117V232.064c0-39.764 32.235-72 72-72a72 72 0 0 1 39.95 12.1l422.762 281.959c25.73 17.16 32.677 51.93 15.517 77.66a56 56 0 0 1-13.915 14.408z"
          fill="#2c2c2c"
          p-id="1239"
        ></path>
      </svg>
    </div>
    <div>
      <audio
        @ended="overAudio"
        :src="audioList[current].link"
        ref="audio"
        controls
      ></audio>
    </div>
    </div>
  </div>
</template>
 
<script>
import { getMusicOne, getMusicList } from "../http/api";

export default {
  name: "Play",
  components: {},
  data() {
    return {
      current: 0,
      isPlay: false, //播放状态
      duration: 0, //进度条最大值
      currentTime: 0, //进度条当前值
      timer: "", //定时器
      isChange: false, //是否正在被拖动
      audioList: [],
    };
  },
  created() {
    getMusicOne(this.$route.query.id).then((res) => {
      console.log(this.$route.query.id);
      this.current = this.$route.query.id - 1;
    }),
      getMusicList().then((res) => {
        console.log(res.data  );
        setTimeout(() => {
          res.data.data.forEach((ele) => {
            ele.isTrue = false;
          });
          this.audioList = res.data.data;
          this.$nextTick(() => {
            //获取音乐总时长
            this.getDuration();
          });
        }, 500);
      });
  },
  methods: {
    // 获取总播放时长
    getDuration() {
      let audio = this.$refs.audio;
      audio.oncanplay = () => {
        this.duration = this.$refs.audio.duration;
      };
    },
    //正在被拖动时改变当前播放值
    sliderStop() {
      if (this.isChange) {
        clearInterval(this.timer);
        let audio = this.$refs.audio;
        audio.pause();
        this.isPlay = false;
      }
    },
    //继续播放
    sliderPlay(value) {
      let audio = this.$refs.audio;
      audio.currentTime = value;
      this.play(true);
      this.isChange = false;
    },
    //播放按钮
    play(flag = this.isPlay) {
      this.audioList[this.current].isTrue = flag;
      clearInterval(this.timer);
      if (this.duration === 0) return;
      let audio = this.$refs.audio;
      if (flag) {
        audio.play();
        this.isPlay = true;
        this.$refs.rotate.style.animationPlayState = "running";
        this.timer = setInterval(() => {
          if (audio.ended || audio.paused) {
            //暂停或者结束清除定时器
            (this.isPlay = false), clearInterval(this.timer);
          }
          this.currentTime = audio.currentTime;
        }, 500);
      } else {
        audio.pause();
        this.isPlay = false;
        this.$refs.rotate.style.animationPlayState = "paused";
      }
    },
    next() {
      if (this.current >= this.audioList.length - 1) return (this.current = 0);
      this.play(false);
      this.current += 1;
      this.$nextTick(() => {
        this.play(true);
      });
    },
    prev() {
      if (this.current <= 0) return (this.current = this.audioList.length - 1);
      this.play(false);
      this.current -= 1;
      this.$nextTick(() => {
        this.play(true);
      });
    },
    overAudio() {
      this.next();
    },
    /**
     * 音频播放时间换算
     * @param {number} value - 音频当前播放时间，单位秒
     */
    transTime(time) {
      let duration = parseInt(time);
      let minute = parseInt(duration / 60);
      let sec = (duration % 60) + "";
      let isM0 = ":";
      if (minute === 0) {
        minute = "00";
      } else if (minute < 10) {
        minute = "0" + minute;
      }
      if (sec.length === 1) {
        sec = "0" + sec;
      }
      return minute + isM0 + sec;
    },
    onClickLeft() {
      this.$router.go(-1)
    }
  },
};
</script>
 
<style lang="scss" scoped>
@keyframes musicRotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

audio {
  display: none;
}

.container {
  height: 100vh;
  background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
}

.music_bottom {
  width: 100%;
  bottom: 20px;
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.title {
  text-align: center;
}

.cartoon {
  margin-top: 30px;
  margin-left: calc(50% - 100px);
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.4);
  animation: musicRotate 12s linear infinite;
  animation-play-state: paused;
  img {
    width: 100%;
    height: 100%;
  }
}

.wrip {
  width: 80%;
  margin-left: 10%;
  position: fixed;
  bottom: 80px;

  .progress_box {
    width: 100%;
    height: 50%;
  }

  .multimedia_box {
    height: 50%;
    margin-top: 10px;
    display: flex;
    justify-content: center;

    .time {
      color: #bfbfbf;
      font-size: 15px;
    }
  }
}
</style>
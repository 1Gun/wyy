<template>
  <div id="fotter">
    <!-- <aplayer :music="music"/> -->
    <!-- <div>{{music.title}}</div> -->
    <!-- <audio src="someaudio.wav" ref="audio" autoplay>您的浏览器不支持 audio 标签。</audio> -->
    <img :src="musicList.img" alt="" style="width: 60px; height: 60px" />
    <div class="music">
      <span>{{ musicList.name }}</span>
      <audio
        id="audio"
        ref="audio"
        controls
        controller
        loop
        autoplay
        preload
        style="width: 400px; height: 40px"
        @ended="audios()"
      ></audio>
    </div>

    <div class="kuang">
      <div class="kkk"></div>
    </div>
    <!-- <yanziPlayer v-if="flg" :musicList.sync="musicList"></yanziPlayer> -->
    <!-- <Music :ifg="flg" :msg="musicList"> </Music> -->
  </div>
</template>
<script>
// import "yanzi_player/lib/yanzi_player.css"; // 引入基本样式
// import yanziPlayer from "yanzi_player/lib/yanzi_player.umd.min.js"; // 引入核心文件
import lyrics from "../js/geci";
export default {
  data() {
    return {
      musicList: {},
      flg: false,
    };
  },
  components: {
    // Aplayer,
    // yanziPlayer,
  },
  methods: {
    audios() {
      // this.$refs.audio.currenTime=0
      var conp = document.querySelector(".kkk");
        lyrics.lyticsEnd(conp); // 重置对象
        lyrics.parse(this.$store.state.musicList.lrc, conp); // 解析歌词  this.lyrics 代表歌词数据
        lyrics.addcontent(conp); // 向元素容器中添加歌词内容
        // conp.style.position = "relative";
        // conp.style.overflow = "auto";
        // conp.style.width = 300 + "px";
        // conp.style.height = 300 + "px";
        lyrics.gundong(conp); // 歌词滚动函数
    },
  },
  watch: {
    "$store.state.musicList.src": {
      handler: function () {
        var conp = document.querySelector(".kkk");
        lyrics.lyticsEnd(conp); // 重置对象
        lyrics.parse(this.$store.state.musicList.lrc, conp); // 解析歌词  this.lyrics 代表歌词数据
        lyrics.addcontent(conp); // 向元素容器中添加歌词内容
        // conp.style.position = "relative";
        // conp.style.overflow = "auto";
        // conp.style.width = 300 + "px";
        // conp.style.height = 300 + "px";
        lyrics.gundong(conp); // 歌词滚动函数
        this.musicList = this.$store.state.musicList;
        this.$refs.audio.src = this.$store.state.musicList.src;
        this.$notify({
          title: "提示",
          message: "正在播放" + this.$store.state.musicList.name,
          duration: 5000,
        });
      },
      // deep: true,
    },

    // "$store.state.musicList"() {
    //   // alert(this.$store.state.img)
    //   console.log("接收成功");
    //   this.$refs.audio.src = this.$store.state.musicList.src;
    //   this.$notify({
    //     title: "提示",
    //     message: "正在播放" + this.$store.state.name,
    //     duration: 5000,
    //   });
    //   // console.log('sas');
    //   // this.$refs.audio.play()
    // },
  },
};
</script>

<style scoped>
.active {
  color: burlywood;
}
* {
  margin: 0;
  padding: 0;
  /* position: relative; */
}
.music {
  display: flex;
  padding-left: 20px;
  flex-direction: column;
}
#fotter {
  display: flex;
  align-items: center;
  width: 90%;
  left: 10%;
  position: absolute;
  bottom: 0px;
  background-color: #f9f9f9;
  /* border: 1px solid green; */
  /* background-color: green; */
}
.kkk {
  /* border: 1px solid red; */
  position: relative;
  height: 60px;
}
.kuang {
  overflow: hidden;
  position: absolute;
  right: 15px;
}
</style>
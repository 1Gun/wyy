<template>
  <div id="fotter">
    <audio src="someaudio.wav" ref="audio" autoplay>您的浏览器不支持 audio 标签。</audio>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  created() {
    this.musicList = this.$store.state.musicList;
  },
  methods: {
    open2() {
       
    }
  },
  computed: {
    f1() {
      return this.$store.state.musicList;
    },
  },
  watch: {
    f1() {
      console.log('sas');
      this.$refs.audio.src=localStorage.getItem('gqurl')
       this.$notify({
          title: '提示',
          message: '播放成功',
          duration: 0
        });
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

#fotter {
  width: 90%;
  left: 10%;
  position: fixed;
  bottom: 0px;
  background-color: #f9f9f9;
  /* border: 1px solid green; */
  /* background-color: green; */
}
</style>
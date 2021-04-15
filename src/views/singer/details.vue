<template>
  <div id="details">
    <!-- <div class="background">
      <img :src="details.cover" width="100%" height="100%" alt="" />
    </div> -->
    <div class="top">
      <div class="img">
        <img :src="details.cover" alt="" />
      </div>
      <div class="title">
        <div style="display: flex">
          <div class="biaoqian">歌手</div>
          <h4 style="font-size: 20px">{{ details.name }}</h4>
        </div>
        <div>单曲数：12</div>
        <div>专辑数：12</div>
        <div>MV数：12</div>
        <div class="jj" @click="open()">简介：{{ details.briefDesc }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Loading } from "element-ui";
export default {
  data() {
    return {
      details: [],
      //   imgSrc:require('/assets/avatar.jpg')
    };
  },
  created() {
    var that = this;
    this.axios({
      method: "get",
      url: "/artist/detail",
      params: { id: this.$route.query.id },
    }).then(function (res) {
      if (res.data.code == 200) {
        console.log(res);
        that.details = res.data.data.artist;
      }
    });
  },
  methods: {
    open() {
      this.$alert(this.details.briefDesc, "歌曲详情", {
        confirmButtonText: "确定",
      });
    },
  },
};
</script>
<style scoped>
/* .background {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
} */
#details {
  width: 100%;
  /* border: 1px solid red; */
  margin: 0 auto;
}
.top {
  display: flex;
  padding-top: 10px;
  font-size: 12px;
}
.img img {
  width: 100%;
  height: 180px;
}
.img {
  width: 15%;
}
.title {
  width: 85%;
  margin-left: 10px;
  /* color: white; */
}
.jj {
  overflow: hidden;
  width: 80%;
  height: 50px;
  cursor: pointer;
}
.biaoqian {
  width: 40px;
  height: 20px;
  border: 1px solid red;
  text-align: center;
  line-height: 20px;
  color: red;
}
.title div {
  margin-top: 8px;
}
.title div:first-child {
  margin: 0;
}
</style>

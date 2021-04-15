<template>
  <div id="video">
    <div class="vleft">
      <div class="title">
        <div>MV</div>
        <div>{{title}}</div>
      </div>
      <div>
        <video :src="url" controls="controls" style="width:100%;margin-top:10px;">
          您的浏览器不支持 video 标签。
        </video>
      </div>
    </div>
    <div class="vright"></div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            url:'',
            title:'',
        }
    },
    created(){
      var that = this;
      console.log("加载视频播放");
      this.list = [];
      this.axios({
        method: "get",
        url: "/mv/url",
        params: {id:this.$route.query.id},
      }).then(function (res) {
        if (res.data.code == 200) {
          console.log(res);
          that.url=res.data.data.url
          that.title=that.$route.query.name
        }
      });
    }
};
</script>
<style scoped>
#video {
  width: 90%;
  margin: 0 auto;
  /* border: 1px solid red; */
  display: flex;
}
.vleft {
  width: 70%;
  /* border: 1px solid red; */
}
.vright {
  width: 30%;
  /* border: 1px solid blue; */
}
.title {
  display: flex;
}
.title div:first-child {
  width: 40px;
  height: 20px;
  /* border: 1px solid red; */
  text-align: center;
  line-height: 20px;
  color: red;
}
</style>

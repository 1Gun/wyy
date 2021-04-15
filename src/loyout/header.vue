<template>
  <div id="header" @click="sshow=false">
    <yanziPlayer v-if="isRouterAlive" :musicList.sync="musicList"></yanziPlayer>
    <div class="tops">
      <div class="top">
        <div></div>
        <div></div>
        <div @click="quan()"></div>
      </div>
      <div class="updown">
        <i class="el-icon-arrow-left" @click="shang()"></i>
        <i class="el-icon-arrow-right" @click="xia()"></i>
      </div>
      <div class="d_input">
        <el-input
          suffix-icon="el-icon-search"
          placeholder="请输入内容"
          @click.stop.native="xianshi()"
          v-model="ips"
          @keyup.enter.native.stop="sousuo()"
        ></el-input>
      </div>
    </div>
    <div class="tops">
      <div class="d_img">
        <div class="user" @click.stop="show = !show">
          <img :src="avatar" alt="" />
          <span>{{ name }}</span>
        </div>
        <transition name="fade">
          <login v-if="show"></login>
        </transition>
      </div>

      <div class="toolbar">
        <i class="el-icon-setting"></i>
        <i class="el-icon-eleme"></i>
        <i class="el-icon-s-platform"></i>
      </div>
    </div>
    <div class="sousuo" v-if="sshow">
      <div style="padding-left:20px;">搜索历史 <i class="el-icon-delete"></i></div>
      <div class="title" v-for="(lists,index) in list" :key="lists.id" @click="tiaozhuan(lists.searchWord)">
        <div>{{index+1}}</div>
        <div>
          <span>                      {{lists.searchWord}}           {{lists.score}}           <img :src="lists.iconUrl" v-if="lists.iconUrl" alt=""> </span>
          <span style="color:#d3c6a6;">{{lists.content}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import login from "@/components/login";
import "yanzi_player/lib/yanzi_player.css"; // 引入基本样式
import yanziPlayer from "yanzi_player/lib/yanzi_player.umd.min.js"; // 引入核心文件
export default {
  data() {
    return {
      show: false,
      sshow: false,
      avatar: "",
      ips:'',
      name: "",
      // isRouterAlive: false,
      // musicList: [{ src: "", author: "", image: "", lrc: "", name: "" }],
      list: [],
    };
  },
  props:['musicList','isRouterAlive'],
  components: {
    login,
    yanziPlayer
  },
  created() {
    this.avatar = localStorage.getItem("u_img");
    this.name = localStorage.getItem("user");
  },
  methods: {
     tiaozhuan(name){
       this.$router.push({name:'sousuo',query:{key:name}})
     },
 quan(){
        let element = document.documentElement;
        // let element = document.getElementById('con_lf_top_div');//设置后就是   id==con_lf_top_div 的容器全屏
          if (this.fullscreen) {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            }
          } else {
            if (element.requestFullscreen) {
              element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
              element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
              // IE11
              element.msRequestFullscreen();
            }
          }
          this.fullscreen = !this.fullscreen;
 
      },
    shang(){
      this.$router.go(-1)
    },
    xia(){
      this.$router.go(1)
    },
    sousuo(){
      // /cloudsearch
      var that=this
      // if(this.$route.path=='/sousuo'){
      // this.$router.go(0)
      // }else{
      this.$router.push({
        name:'sousuo',
        query:{key:that.ips}
      })
      // }
      this.sshow=false
      console.log(this.$route.path);
      // this.axios({
      //     method: "post",
      //     url: "/cloudsearch",
      //     params:{keywords:that.ips}
      //   }).then(function (res) {
      //     console.log(res);
      //   });
    },
    login() {
      this.show = false;
    },
    xianshi() {
      var that=this
      this.sshow = true;
      if (!JSON.parse(localStorage.getItem("sousuo"))) {
        this.axios({
          method: "post",
          url: "/search/hot/detail",
        }).then(function (res) {
          console.log(res);
          that.list = res.data;
          localStorage.setItem("sousuo", JSON.stringify(res.data.data));
        });
      }else{
        that.list=JSON.parse(localStorage.getItem('sousuo'))
      }
    },
  },
};
</script>
 
<style scoped>
@import "../style/c_index.css";
.d_img {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.sousuo {
  width: 300px;
  font-size: 12px;
  height: 400px;
  border: 1px solid #ccc;
  background-color: white;
  z-index: 1;
  position: absolute;
  top: 7%;
  left: 26%;
  overflow: auto;
}
.sousuo img{
  width: 15px;
  height: 15px;
}
.title{
  width: 90%;
  height: 40px;
  margin: 0 auto;
  /* border: 1px solid red; */
  display: flex;
  cursor: pointer;
  margin-top: 10px;
}
.title:first-child{

}
.sousuo div div:first-child {
  width: 30px;
  /* border: 1px solid blue; */
  text-align: center;

}
.sousuo div div:last-child {
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border: 1px solid red; */
}
.sousuo div:first-child {
  height: 35px;
  line-height: 35px;
}
.toolbar {
  width: 50%;
  height: 100%;
  /* border: 1px solid royalblue; */
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.login {
  width: 300px;
  height: 400px;
  /* border: 1px solid red; */
  position: absolute;
  background-color: white;
  z-index: 1;
  top: 7%;
  /* display: none; */
  left: 64%;
}
.user img {
  width: 40px;
  border-radius: 40px;
  height: 40px;
}
.user {
  width: 150px;
  overflow: hidden;
  height: 40px;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: space-around;
}
* {
  margin: 0;
  padding: 0;
}
#header {
  width: 100%;
  height: 7%;
  /* border: 1px solid red; */
  display: flex;
  background-color: #f9f9f9;
}
.tops {
  width: 50%;
  height: 100%;
  display: flex;
  /* border: 1px solid red; */
}
.top {
  width: 200px;
  height: 100%;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.updown {
  width: 200px;
  height: 100%;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.updown{
  cursor: pointer;
}
.d_input {
  width: 200px;
  height: 100%;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.top div {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  /* border: 1px solid red; */
}
.top div:first-child {
  background-color: #ed655a;
}
.top div:nth-child(2) {
  background-color: #e0c04c;
}
.top div:last-child {
  background-color: #72be47;
}
</style>
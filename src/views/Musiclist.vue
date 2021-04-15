<template>
  <div id="musiclist">
    <!-- <aplayer autoplay
  :music="{
    title: 'secret base~君がくれたもの~',
    artist: 'Silent Siren',
    src: 'http://m7.music.126.net/20210417131440/2e7c340367692b522023defe0a3c35ef/ymusic/525a/5359/0059/e0b8c076d2d3e07893f873b23fb37e33.mp3',
    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
  }"
/> -->
    <!-- <Headerx :musicList="musicList" :isRouterAlive="isRouterAlive"></Header> -->
    <!-- <yanziPlayer v-if="isRouterAlive" :musicList.sync="musicList"></yanziPlayer> -->
    <div class="top">
      <div class="avatar">
        <img :src="xiangqing.coverImgUrl" alt="" />
      </div>
      <div class="gdxq">
        <div class="xq1">
          <div class="kuang">歌单</div>
          <div>{{ xiangqing.name }}</div>
        </div>
        <div class="xq2">
          <img src="../assets/avatar.jpg" alt="" />
          <span>网易云音乐</span>
          <span>创建时间：{{ time }}</span>
        </div>
        <div class="xq3">
          <div>播放全部</div>
          <div>收藏</div>
          <div>分享</div>
        </div>
        <div class="xq4" @click="open()">
          标签:<br />{{ xiangqing.description }}...
        </div>
      </div>
      <div style="width: 9%"></div>
      <div class="bottom">
        <div class="xq5">
          <div>歌曲数<br />40万</div>
          <div style="border-left: 1px solid #ccc">播放数<br />40万</div>
        </div>
      </div>
    </div>
    <div>
      <el-menu class="el-menu-demo" mode="horizontal" :default-active="moren">
        <el-menu-item index="1" @click="tiaozhuan(1)">歌曲列表</el-menu-item>
        <el-menu-item index="2" @click="tiaozhuan(2)">评论</el-menu-item>
        <el-menu-item index="3" @click="tiaozhuan(3)">收藏者</el-menu-item>
      </el-menu>
    </div>
    <div v-show="vshow">
      <!-- <template> -->
      <el-table border :data="xlist" style="width: 100%" @row-click="url">
        <el-table-column prop="id" label="id" width="220px"> </el-table-column>
        <el-table-column label="操作" width="200">
          <i class="el-icon-star-off"></i>
        </el-table-column>
        <el-table-column prop="name" label="音乐标题" width="200">
        </el-table-column>
        <el-table-column prop="ar[0].name" label="歌手" width="200">
          <!-- {{ar[1].name}} -->
        </el-table-column>
        <el-table-column prop="time" label="创建时间" width="200">
        </el-table-column>
        <el-table-column prop="" label="操作" width="200">
          <i class="el-icon-circle-plus-outline"></i>
        </el-table-column>
      </el-table>
      <!-- </template> -->
    </div>
    <div v-show="vshow2">
      <h3>精彩评论</h3>
      <div class="comments">
        <div class="c_list" v-for="(lists, index) in tcomments" :key="index">
          <div class="l_list">
            <img
              style="width: 70px; height: 70px"
              :src="lists.user.avatarUrl"
              alt=""
            />
          </div>
          <div class="r_list">
            <div>
              <span style="color: #8ad3ff">{{ lists.user.nickname }}</span>
              {{ lists.content }}
            </div>
            <div>{{ lists.time }}</div>
          </div>
        </div>
      </div>

      <h3>最新评论</h3>
      <div class="comments">
        <div class="c_list" v-for="(lists, index) in comments" :key="index">
          <div class="l_list">
            <img
              style="width: 70px; height: 70px"
              :src="lists.user.avatarUrl"
              alt=""
            />
          </div>
          <div class="r_list">
            <div>
              <span style="color: #8ad3ff">{{ lists.user.nickname }}</span>
              {{ lists.content }}
            </div>
            <div>{{ lists.time }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="vshow3">3</div>
    <!-- <button @click="sasa()">sasa</button> -->
  </div>
</template>
<script>
// import Header from '../loyout/header'
import format from "../js/date.js";
// import Aplayer from 'vue-aplayer'
import { Loading } from "element-ui";
// import footer from "../loyout/footer.vue"
// import "yanzi_player/lib/yanzi_player.css"; // 引入基本样式
// import yanziPlayer from "yanzi_player/lib/yanzi_player.umd.min.js"; // 引入核心文件
export default {
  components: {
    // Aplayer
    // Header,
    // yanziPlayer,
  },
  methods: {
    sasa() {
      this.$store.state.musicList = !this.$store.state.musicList;
    },
    open() {
      this.$alert(this.xiangqing.description, "歌曲详情", {
        confirmButtonText: "确定",
      });
    },
    tiaozhuan(id) {
      switch (id) {
        case 1:
          this.vshow = true;
          this.vshow2 = false;
          this.vshow3 = false;
          break;
        case 2:
          this.vshow = false;
          this.vshow2 = true;
          this.vshow3 = false;
          break;
        case 3:
          this.vshow = false;
          this.vshow2 = false;
          this.vshow3 = true;
          break;
      }
    },
    url(val) {
      var that = this;
      that
        .axios({
          method: "get",
          url: "/song/detail",
          params: { ids: val.id },
        })
        .then(function (res) {
          that.$store.state.musicList.name = res.data.songs[0].name;
          that.$store.state.musicList.img = res.data.songs[0].al.picUrl;
        });
        that
        .axios({
          method: "get",
          url: "/lyric",
          params: { id: val.id },
        })
        .then(function (res) {
          console.log(res);
          that.$store.state.musicList.lrc=res.data.lrc.lyric
        });
      this.axios({
        method: "get",
        url: "/song/url",
        params: { id: val.id },
      }).then(function (res) {
        // console.log(res)

        // that.isRouterAlive = false;
        // that.$nextTick(() => (that.isRouterAlive = true));
        // that.musicList[0].src = res.data.data[0].url;
        that.$store.state.musicList.src = res.data.data[0].url;
        localStorage.setItem("gqurl", res.data.data[0].url);
      });
    },
  },
  data() {
    return {
      musicList: [{ src: "", author: "", image: "", lrc: "", name: "" }], //歌曲信息list
      list: [], //歌曲list
      xiangqing: [], //歌单详情
      index: 1,
      mid: "",
      str: "",
      xlist: [],
      shijian: [],
      time: "",
      msg: "",
      vshow: true,
      vshow2: false,
      comments: [],
      tcomments: [],
      vshow3: false,
      moren:'1',
    };
  },
  created() {
    var that = this;
    let loadingInstance = Loading.service();
    this.axios({
      method: "get",
      url: "/playlist/detail",
      params: { id: that.$route.query.id },
    }).then(function (res) {
      // console.log(res);  当前歌单详情
      var shuzu = [];
      var i = 0;
      that.xiangqing = res.data.playlist;
      that.time = format(that.xiangqing.createTime, "YYYY-MM-DD HH:mm:ss");
      that.list = res.data.privileges;
      for (let item of res.data.privileges) {
        shuzu[i] = item.id;
        if (i == 99) {
          break;
        }
        i++;
        //   console.log(item)
      }
      console.log("榜单详情接入成功");
      var str = shuzu.toString();
      that.str = str;
      // console.log(that.str)
      that
        .axios({
          method: "get",
          url: "/song/detail",
          params: { ids: that.str },
        })
        .then(function (res) {
          var i = 0;
          // console.log(res);
          console.log("歌曲详情接入成功");
          that.xlist = res.data.songs;
          for (let item of res.data.songs) {
            that.xlist[i].time = format(item.publishTime, "YYYY-MM-DD");
            i++;
          }
          // console.log(that.xlist)
        });
    });

    this.axios({
      method: "get",
      url: "/comment/playlist",
      params: { id: that.$route.query.id },
    }).then(function (res) {
      // console.log(res);
      var a = 0;
      that.comments = res.data.comments;
      that.tcomments = res.data.hotComments;
      for (let item of res.data.hotComments) {
        that.tcomments[a].time = format(item.time, "YYYY-MM-DD");
        a++;
      }
      // console.log(res.data.hotComments[0]);
    });

    this.axios({
      method: "get",
      url: "/playlist/detail/dynamic",
      params: { id: that.$route.query.id },
    }).then(function () {
      //   console.log(res);
      console.log("歌单详情动态接入成功");
      loadingInstance.close();
    });
  },
};
</script>

<style scoped>
h3 {
  margin-top: 10px;
  margin-bottom: 10px;
}
.comments {
  /* border: 1px solid red; */
}
.c_list {
  display: flex;
  margin-top: 20px;
  margin-left: 10px;
}
.comments .c_list:nth-child(1) {
  margin-top: 0;
}
.r_list {
  width: 90%;
  height: 70px;
  /* border: 1px solid blue; */
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  font-size: 12px;
}
.r_list div {
  margin-left: 20px;
}
#musiclist {
  width: 90%;
  margin: 0 auto;
  /* border: 1px solid red; */
}
.top {
  width: 100%;
  margin-top: 10px;
  /* justify-content: space-between; */
  display: flex;
}
.avatar img {
  width: 200px;
  height: 200px;
}
.el-table td {
  cursor: pointer;
}
.kuang {
  width: 40px;
  height: 20px;
  font-size: 10px;
  font-weight: bold;
  color: red;
  text-align: center;
  line-height: 20px;
  border: 1px solid red;
}
.gdxq {
  margin-left: 20px;
}
.xq1 {
  display: flex;
  font-weight: bold;
}
.xq2 {
  display: flex;
  /* font-weight: bold; */
  font-size: 12px;
  align-items: center;
  margin-top: 10px;
}
.xq2 img {
  width: 30px;
  height: 30px;
  border-radius: 15px;
}
.xq3 {
  display: flex;
  font-size: 12px;
  margin-top: 10px;
}
.xq4 {
  display: flex;
  font-size: 12px;
  width: 500px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 10px;
}
.xq5 {
  position: relative;
  right: 0;
  display: flex;
  white-space: nowrap;
  font-size: 12px;
  margin-top: 10px;
}
.xq3 div {
  width: 120px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  margin-left: 10px;
}
.xq3 div:first-child {
  margin-left: 0;
  border: 0;
  background-color: #e63d3f;
  color: white;
}
.bottom {
  margin-left: 35%;
}
</style>
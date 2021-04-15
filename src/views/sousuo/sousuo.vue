<template>
  <div id="sousuo">
    <div>
      <el-menu class="el-menu-demo" mode="horizontal" :default-active="moren">
        <el-menu-item index="1" @click="tiaozhuan(1, 1)">单曲</el-menu-item>
        <el-menu-item index="2" @click="tiaozhuan(2, 100)">歌手</el-menu-item>
        <el-menu-item index="3" @click="tiaozhuan(3, 10)">专辑</el-menu-item>
        <el-menu-item index="4" @click="tiaozhuan(4, 1014)">视频</el-menu-item>
        <el-menu-item index="5" @click="tiaozhuan(5, 1006)">歌词</el-menu-item>
        <el-menu-item index="6" @click="tiaozhuan(6, 1000)">歌单</el-menu-item>
        <el-menu-item index="7" @click="tiaozhuan(7, 1009)"
          >声音主播</el-menu-item
        >
        <el-menu-item index="8" @click="tiaozhuan(8, 1002)">用户</el-menu-item>
      </el-menu>
    </div>
    <el-table
      v-if="vshow[0]"
      border
      :data="list"
      style="width: 100%"
      @row-click="url"
    >
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
    </el-table>

    <div class="top" v-if="vshow[1]">
      <div
        class="content"
        v-for="lists in slist"
        :key="lists.id"
        @click="tiaozhuans(1,lists.id,'')"
      >
        <img :src="lists.img1v1Url" alt="" />
        <span>{{ lists.name }}</span>
      </div>
    </div>
    <div class="top" v-if="vshow[2]">
      <div
        class="content"
        v-for="lists in album"
        :key="lists.id"
        @click="tiaozhuans()"
      >
        <img :src="lists.picUrl" alt="" />
        <span>{{ lists.name }}</span>
        <span>{{ lists.artist.name }}</span>
      </div>
    </div>
    <div class="top" v-if="vshow[3]">
      <div
        class="content"
        v-for="(lists, index) in audio"
        :key="index"
        @click="tiaozhuans(3,lists.vid,lists.title)"
      >
        <img :src="lists.coverUrl" alt="" />
        <span>{{ lists.title }}</span>
        <span>{{ lists.creator[0].userName }}</span>
        <span v-if="lists.creator[1]">{{ lists.creator[1].userName }}</span>
      </div>
    </div>
    <div class="top" v-if="vshow[5]">
      <div
        class="content"
        v-for="(lists, index) in playlist"
        :key="index"
        @click="tiaozhuans(5, lists.id)"
      >
        <img :src="lists.coverImgUrl" alt="" />
        <span>{{ lists.name }}</span>
        <span>by:{{ lists.creator.nickname }}</span>
      </div>
    </div>
    <div class="top" v-if="vshow[7]">
      <div
        class="content"
        v-for="(lists, index) in user"
        :key="index"
        @click="tiaozhuans()"
      >
        <img :src="lists.avatarUrl" alt="" />
        <span>{{ lists.nickname }}</span>
        <span>{{ lists.signature }}</span>
      </div>
    </div>
    <div style="height: 30px"></div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      list: [],
      moren: "1",
      vshow: [true, false, false, false, false, false, false, false],
      slist: [],
      album: [],
      audio: [],
      user: [],
      playlist: [],
    };
  },
  activated() {
    this.initPage();
  },
  created() {
    var that = this;
    console.log();
    this.axios({
      method: "post",
      url: "/cloudsearch",
      params: { keywords: this.$route.query.key },
    }).then(function (res) {
      // console.log(res);
      that.list = res.data.result.songs;
      // var i = 0;
      // for (let item of res.data.result.songs) {
      //   that.list[i].time = that.formatDate(656566);
      //   console.log(item);
      //   i++;
      // }
    });
  },
  methods: {
    tiaozhuans(id, type,title) {
      switch (id) {
        case 1:
          console.log(type);
          this.$router.push({name:'details',query:{id:type}})
          break;
        case 3:
          console.log(type);
          this.$router.push({ name: "video", query: { id: type,name:title} });
          break;
        case 5:
          this.$router.push({ name: "musiclist", query: { id: type } });
          break;
      }
    },
    tiaozhuan(id, type) {
      var that = this;
      switch (id) {
        case 1:
          this.axios({
            method: "post",
            url: "/cloudsearch",
            params: { keywords: this.$route.query.key, type: type },
          }).then(function (res) {
            that.list = res.data.result.songs;
          });
          this.vshow.forEach((item, index) => {
            this.vshow[index] = false;
          });
          Vue.set(this.vshow, 0, 1);
          break;
        case 2:
          this.axios({
            method: "post",
            url: "/cloudsearch",
            params: { keywords: this.$route.query.key, type: type },
          }).then(function (res) {
            // console.log(res);
            that.slist = res.data.result.artists;
          });
          this.vshow.forEach((item, index) => {
            this.vshow[index] = false;
          });
          Vue.set(this.vshow, 1, 1);
          break;
        case 3:
          this.axios({
            method: "post",
            url: "/cloudsearch",
            params: { keywords: this.$route.query.key, type: type },
          }).then(function (res) {
            // console.log(res);
            that.album = res.data.result.albums;
          });
          this.vshow.forEach((item, index) => {
            this.vshow[index] = false;
          });
          Vue.set(this.vshow, 2, 1);
          break;
        case 4:
          this.axios({
            method: "post",
            url: "/cloudsearch",
            params: { keywords: this.$route.query.key, type: type },
          }).then(function (res) {
            console.log(res);
            that.audio = res.data.result.videos;
          });
          this.vshow.forEach((item, index) => {
            this.vshow[index] = false;
          });
          Vue.set(this.vshow, 3, 1);
          break;
        case 6:
          this.axios({
            method: "post",
            url: "/cloudsearch",
            params: { keywords: this.$route.query.key, type: type },
          }).then(function (res) {
            // console.log(res);
            that.playlist = res.data.result.playlists;
          });
          this.vshow.forEach((item, index) => {
            this.vshow[index] = false;
          });
          Vue.set(this.vshow, 5, 1);
          break;
        case 8:
          this.axios({
            method: "post",
            url: "/cloudsearch",
            params: { keywords: this.$route.query.key, type: type },
          }).then(function (res) {
            // console.log(res);
            that.user = res.data.result.userprofiles;
          });
          this.vshow.forEach((item, index) => {
            this.vshow[index] = false;
          });
          Vue.set(this.vshow, 7, 1);
          break;
      }
    },
    url(val) {
      var that = this;
      that
        .axios({
          method: "get",
          url: "/lyric",
          params: { id: val.id },
        })
        .then(function (res) {
          // console.log(res);
          that.$store.state.musicList.lrc = res.data.lrc.lyric;
        });
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
      this.axios({
        method: "get",
        url: "/song/url",
        params: { id: val.id },
      }).then(function (res) {
        // console.log(val);
        // that.isRouterAlive = false;
        // that.$nextTick(() => (that.isRouterAlive = true));
        // that.musicList[0].src = res.data.data[0].url;
        that.$store.state.musicList.src = res.data.data[0].url;
        localStorage.setItem("gqurl", res.data.data[0].url);
      });
    },
  },
  watch: {
    $route(to, from) {
      this.$router.go(0);
      console.log(to, from);
    },
  },
};
</script>
<style scoped>
.abc {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
}
.abc li {
  cursor: pointer;
}
.top {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
}
.content {
  width: 150px;
  margin-top: 10px;
  cursor: pointer;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  font-size: 12px;
  /* white-space: nowrap; */
  overflow: hidden;
  align-items: center;
}
.top img {
  width: 120px;
  height: 120px;
  border-radius: 10px;
}
#sousuo {
  width: 90%;
  margin: 0 auto;
}
.sings {
  /* border: 1px solid red; */
}
</style>
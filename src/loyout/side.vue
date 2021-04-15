<template>
  <div id="side">
    <el-row class="tac">
      <el-col :span="20">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="1" @click="path(1)"> 
            <i class="el-icon-service"></i>
            <span slot="title">个性推荐</span>
          </el-menu-item>
          <!-- <template v-for="lists in list">
          <el-menu-item :index="lists.id" :key="lists.id">
            <i :class="lists.icon"></i>
            <span slot="title">{{lists.title}}</span>
          </el-menu-item>  
      </template>   -->

          <el-menu-item index="2" @click="path(2)">
            <i class="el-icon-notebook-2"></i>
            <span slot="title" >歌单</span>
          </el-menu-item>
          <el-menu-item index="3" @click="path(3)">
            <i class="el-icon-s-data"></i>
            <span slot="title">排行榜</span>
          </el-menu-item>
          <el-menu-item index="4" @click="path(4)">
            <i class="el-icon-s-custom"></i>
            <span slot="title">歌手</span>
          </el-menu-item>
          <el-menu-item index="5" @click="path(5)">
            <i class="el-icon-video-camera"></i>
            <span slot="title">MV</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-position"></i>
            <span slot="title">最新音乐</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { id: 2, title: "歌单", icon: "el-icon-notebook-2" },
        { id: 3, title: "排行榜", icon: "el-icon-s-data" },
        { id: 4, title: "歌手", icon: "el-icon-s-custom" },
        { id: 5, title: "MV", icon: "el-icon-video-camera" },
        { id: 6, title: "最新音乐", icon: "el-icon-position" },
      ],
    };
  },
  methods: {
    path(id) {
      switch (id) {
        case 1:
          this.$router.push("/");
          break;
        case 2:
          this.$router.push("/playlists");
          break;
          case 3:
          this.$router.push("/list");
          break;
          case 4:
          this.$router.push("/sindex");
          break;
          case 5:
          this.$router.push("mindex");
          break;
      }
    },
  },
};
</script>

<style scoped>
.el-menu{
  
        background-color: #f9f9f9;
}
* {
  margin: 0;
  padding: 0;
}
#side {
  width: 10%;
  height: 93%;
        background-color: #f9f9f9;
  /* border: 1px solid blue; */
  /* text-align: center; */
}
.tac {
  /* padding-left: 20px; */
  width: 180px;
}
</style>
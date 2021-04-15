<template>
  <div id="sindex">
    <ul class="yul">
      <li v-for="list in yuzhong" :key="list.id" @click="selects(list.area)">
        {{ list.name }}
      </li>
    </ul>
    <ul class="cul">
      <li v-for="lists in classs" :key="lists.id">{{ lists.name }}</li>
    </ul>
    <ul class="abc">
      <li v-for="lists in screening" :key="lists.id">{{ lists.name }}</li>
    </ul>
    <div class="top">
      <div class="content" v-for="lists in list" :key="lists.id" @click="tiaozhuan(lists.id)">
        <img :src="lists.img1v1Url" alt="" />
        <span>{{lists.name}}</span>
      </div>
    </div>
    <div style="height:30px;">
  </div>
  </div>
  
</template>
<script>
import { Loading } from "element-ui";
export default {
  data() {
    return {
      list:[],
      screening: [
        { id: 0, name: "热门:", type: 1 },
        { id: 27, name: "A", type: "a" },
        { id: 1, name: "B", type: "b" },
        { id: 2, name: "C", type: "c" },
        { id: 3, name: "D", type: "d" },
        { id: 4, name: "E", type: "e" },
        { id: 5, name: "F", type: "f" },
        { id: 6, name: "G", type: "g" },
        { id: 7, name: "H", type: "h" },
        { id: 8, name: "I", type: "i" },
        { id: 9, name: "J", type: "j" },
        { id: 10, name: "K", type: "k" },
        { id: 11, name: "L", type: "l" },
        { id: 12, name: "M", type: "m" },
        { id: 13, name: "N", type: "n" },
        { id: 14, name: "O", type: "o" },
        { id: 15, name: "P", type: "p" },
        { id: 16, name: "Q", type: "q" },
        { id: 17, name: "R", type: "r" },
        { id: 18, name: "S", type: "s" },
        { id: 19, name: "T", type: "t" },
        { id: 20, name: "U", type: "u" },
        { id: 21, name: "V", type: "v" },
        { id: 22, name: "W", type: "w" },
        { id: 23, name: "X", type: "x" },
        { id: 24, name: "Y", type: "y" },
        { id: 25, name: "Z", type: "z" },
        { id: 26, name: "#", type: 0 },
      ],
      classs: [
        { id: 0, name: "全部:", area: -1 },
        { id: 1, name: "男歌手", area: 1 },
        { id: 2, name: "女歌手", area: 2 },
        { id: 3, name: "乐队", area: 3 },
      ],
      yuzhong: [
        { id: 0, name: "全部:", area: -1 },
        { id: 1, name: "华语", area: 7 },
        { id: 2, name: "欧美", area: 96 },
        { id: 3, name: "日本", area: 8 },
        { id: 4, name: "韩国", area: 16 },
        { id: 5, name: "日本", area: 8 },
        { id: 6, name: "其他", area: 0 },
      ],
    };
  },
  created(){
      var loadingInstance = Loading.service();
      var that = this;
    //   let loadingInstance = Loading.service();
      console.log("切换歌单分类成功");
      this.list = [];
      this.axios({
        method: "get",
        url: "/artist/list",
        params: {area:-1,limit:32},
      }).then(function (res) {
        if (res.data.code == 200) {
          console.log(res);
          that.list = res.data.artists;
          loadingInstance.close();
        }
      });
  },
  methods: {
    tiaozhuan(id){
      this.$router.push({name:'details',query:{id:id}})
    },
    selects(id) {
      var loadingInstance = Loading.service();
      var that = this;
    //   let loadingInstance = Loading.service();
      console.log("切换歌单分类成功");
      this.list = [];
      this.axios({
        method: "get",
        url: "/artist/list",
        params: {area:id,limit:32},
      }).then(function (res) {
        if (res.data.code == 200) {
          console.log(res);
          that.list = res.data.artists;
          loadingInstance.close();
        }
      });
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
img{
    width: 150px;
    height: 120px;
    border-radius: 10px;
}
#sindex {
  width: 90%;
  /* border: 1px solid red; */
  margin: 0 auto;
  overflow: auto;
}
.cul {
  display: flex;
  margin-top: 10px;
}
.yul {
  display: flex;
}
.cul li {
  width: 100px;
  cursor: pointer;
}
.yul li {
  width: 100px;
  cursor: pointer;
}
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
  flex-direction: column;margin-left: 10px;
  align-items: center;
}
</style>

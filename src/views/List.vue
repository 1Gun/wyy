<template>
  <div id="list">
    <h4 style="padding-top: 20px">全球榜</h4>
    <div class="top">
      <div
        class="flex"
        v-for="(lists, index) in list"
        :key="index"
        @click="xiangqing(lists.id)"
      >
        <img class="t_img" :src="lists.coverImgUrl" alt="" />
        <span>{{ lists.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
// import { Loading } from "element-ui";
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    xiangqing(id) {
    //   var that = this;
    //   this.axios({
    //     method: "get",
    //     url: "/playlist/detail",
    //     params: {id:id},
    //   }).then(function (res) {
    //     console.log(res);
    //     // that.list = res.data.list;
    //     console.log("榜单详情接入成功");
    //   });
      this.$router.push({name:'musiclist',query:{id:id}})
    },
  },
  created() {
    var that = this;
    this.axios({
      method: "get",
      url: "/toplist",
      params: {},
    }).then(function (res) {
      console.log(res);
      that.list = res.data.list;
      console.log("排行榜接入成功");
    });
  },
};
</script>

<style scoped>
#list {
  width: 90%;
  /* border: 1px solid red; */
  margin: 0 auto;
}
.top {
  widows: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.t_img {
  width: 230px;
  height: 250px;
  margin-top: 20px;
  /* border: 1px solid red; */
}
.flex {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
</style>
<template>
  <div id="mv">
    <h3>全部MV</h3>
    <hr />
    <ul class="yul">
      <li v-for="list in yuzhong" :key="list.id" @click="selects(list.name)">
        {{ list.name }}
      </li>
    </ul>
    <ul class="cul">
      <li v-for="lists in classs" :key="lists.id">{{ lists.name }}</li>
    </ul>
    <ul class="abc">
      <li v-for="lists in screening" :key="lists.id">{{ lists.name }}</li>
    </ul>
    <div class="mv">
      <div
        class="content"
        v-for="(lists, index) in list"
        :key="index"
        @click="tiaozhuan(lists.id, lists.name)"
      >
        <img :src="lists.cover" alt="" />
        <span>{{ lists.name }}</span>
        <span>{{ lists.artistName }}</span>
      </div>
    </div>
    <div style="margin-top: 20px; float: right">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="500"
        @current-change="fenye"
      >
      </el-pagination>
    </div>
    <div style="height: 100px"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      screening: [
        { id: 0, name: "排序:", type: 1 },
        { id: 27, name: "上升最快", type: "a" },
        { id: 1, name: "最热", type: "b" },
        { id: 2, name: "最新", type: "c" },
      ],
      classs: [
        { id: 0, name: "分类:", area: -1 },
        { id: 1, name: "全部", area: 1 },
        { id: 2, name: "官方版", area: 2 },
        { id: 3, name: "原声", area: 3 },
        { id: 4, name: "现场版", area: 3 },
        { id: 5, name: "网易出品", area: 3 },
      ],
      yuzhong: [
        { id: 0, name: "全部:", area: -1 },
        { id: 1, name: "内地", area: 7 },
        { id: 2, name: "港台", area: 96 },
        { id: 3, name: "欧美", area: 8 },
        { id: 4, name: "韩国", area: 16 },
        { id: 5, name: "日本", area: 8 },
      ],
    };
  },
  created() {
    var that = this;
    this.axios({
      method: "get",
      url: "/mv/all",
      params: { limit: 12 },
    }).then(function (res) {
      console.log(res);
      that.list = res.data.data;
    });
  },
  methods: {
    fenye(id) {
        var ids
        if(id==1){
            ids=0
        }else{
            ids=12*id
        }
      // that.list=[];
      var that = this;
      this.axios({
        method: "get",
        url: "/mv/all",
        params: {offset:ids,limit:12},
      }).then(function (res) {
        console.log("分页成功");
        console.log(res)
        that.list = res.data.data;
      });
    },
    tiaozhuan(id, name) {
      this.$router.push({ name: "video", query: { id: id, name: name } });
    },
    selects(id) {
      var that = this;
      //   let loadingInstance = Loading.service();
      console.log("切换MV分类成功");
      this.list = [];
      this.axios({
        method: "get",
        url: "/mv/all",
        params: { area: id, limit: 12 },
      }).then(function (res) {
        if (res.data.code == 200) {
          console.log(res);
          that.list = res.data.data;
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
img {
  width: 150px;
  height: 120px;
  border-radius: 10px;
}
#mv {
  width: 90%;
  /* border: 1px solid red; */
  margin: 0 auto;
  overflow: auto;
}
h3 {
  margin-bottom: 5px;
}
.content {
  width: 280px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  /* border: 1px solid red; */
}

.mv img {
  width: 100%;
}
.mv {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: space-between;
}
.cul {
  display: flex;
  margin-top: 10px;
}
.abc {
  display: flex;
  margin-top: 10px;
}
.abc li {
  cursor: pointer;
  width: 100px;
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
</style>

<template >
  <div id="playlist" @click="shows = false">
    <div class="select" @click.stop="shows = !shows">
      {{ title }} <i class="el-icon-arrow-down"></i>
    </div>
    <div class="ul">
      <ul>
        <li
          v-for="lists in rlist"
          :key="lists.name"
          @click="fenlei(lists.name)"
        >
          {{ lists.name }}
        </li>
      </ul>
    </div>
    <div class="top">
      <div class="content">
        <div
          v-for="(lists, index) in list"
          :key="index"
          class="contents"
          :title="lists.copywriter"
          @click="tiaozhuan(lists.id)"
        >
          <img :src="lists.coverImgUrl" alt="" />
          <div class="t_bottom">{{ lists.name }}</div>
        </div>
      </div>
    </div>
    <div class="selectkuang" v-if="shows">
      <div style="width: 97%; margin: 0 auto">
        <h4 class="hh4">全部歌单分类</h4>
        <hr />
      </div>
      <div style="width: 90%; margin: 0 auto">
        <div class="quanbu" @click="fenlei('全部')">全部歌单</div>

        <div class="t_div">
          <div class="x_top">
            <div class="xqkuang">
              <div>
                <template v-for="(xxfenleis, index) in xxfenlei">
                  <div :key="index" v-if="index == 0" class="t_xq">
                    <i class="el-icon-menu"></i>{{ xxfenleis }}
                  </div>
                </template>
              </div>
            </div>
            <div class="xqkuang2">
              <template v-for="(subs, index) in sub">
                <div
                  v-if="subs.category == 0"
                  :key="index"
                  class="xq"
                  @click.stop="fenlei(subs.name)"
                >
                  <span>{{ subs.name }}</span>
                </div>
              </template>
            </div>
          </div>

          <div class="x_top">
            <div class="xqkuang">
              <div>
                <template v-for="(xxfenleis, index) in xxfenlei">
                  <div :key="index" v-if="index == 1" class="t_xq">
                    <i class="el-icon-menu"></i>{{ xxfenleis }}
                  </div>
                </template>
              </div>
            </div>
            <div class="xqkuang2">
              <template v-for="(subs, index) in sub">
                <div
                  v-if="subs.category == 1"
                  :key="index"
                  class="xq"
                  @click.stop="fenlei(subs.name)"
                >
                  <span>{{ subs.name }}</span>
                </div>
              </template>
            </div>
          </div>
          <div class="x_top">
            <div class="xqkuang">
              <div>
                <template v-for="(xxfenleis, index) in xxfenlei">
                  <div :key="index" v-if="index == 2" class="t_xq">
                    <i class="el-icon-menu"></i>{{ xxfenleis }}
                  </div>
                </template>
              </div>
            </div>
            <div class="xqkuang2">
              <template v-for="(subs, index) in sub">
                <div
                  v-if="subs.category == 2"
                  :key="index"
                  class="xq"
                  @click.stop="fenlei(subs.name)"
                >
                  <span>{{ subs.name }}</span>
                </div>
              </template>
            </div>
          </div>
          <div class="x_top">
            <div class="xqkuang">
              <div>
                <template v-for="(xxfenleis, index) in xxfenlei">
                  <div
                    :key="index"
                    v-if="index == 3"
                    class="t_xq"
                    @click.stop="fenlei(subs.name)"
                  >
                    <i class="el-icon-menu"></i>{{ xxfenleis }}
                  </div>
                </template>
              </div>
            </div>
            <div class="xqkuang2">
              <template v-for="(subs, index) in sub">
                <div
                  v-if="subs.category == 3"
                  :key="index"
                  class="xq"
                  @click.stop="fenlei(subs.name)"
                >
                  <span>{{ subs.name }}</span>
                </div>
              </template>
            </div>
          </div>
          <div class="x_top">
            <div class="xqkuang">
              <div>
                <template v-for="(xxfenleis, index) in xxfenlei">
                  <div :key="index" v-if="index == 4" class="t_xq">
                    <i class="el-icon-menu"></i>{{ xxfenleis }}
                  </div>
                </template>
              </div>
            </div>
            <div class="xqkuang2">
              <template v-for="(subs, index) in sub">
                <div
                  v-if="subs.category == 4"
                  :key="index"
                  class="xq"
                  @click.stop="fenlei(subs.name)"
                >
                  <span>{{ subs.name }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;float:right;">
    <el-pagination background layout="prev, pager, next" :total="500" @current-change="fenye()">
    </el-pagination>
    </div>
    <div style="height:100px;">

    </div>
  </div>
</template>
<script>
import { Loading } from "element-ui";
export default {
  data() {
    return {
      title: "全部",
      rlist: [],
      list: [],
      xxfenlei: [],
      sub: [],
      updatetime:[],
      shows: false,
    };
  },
  methods: {
    show() {},
    fenye(){
      // that.list=[];
      var that=this
      this.axios({
      method: "get",
      url: "/top/playlist/highquality",
      params:{before:that.updatetime,limit:10}
    }).then(function (res) {
      console.log("分页成功");
      // console.log(res)
      that.list = res.data.playlists;
      that.updatetime = res.data.playlists[res.data.playlists-1]
    });
    },
    tiaozhuan(id){
      this.$router.push({name:'musiclist',query:{id:id}})
    },
    fenlei(id) {
      var that = this;
      // this.title=id
      let loadingInstance = Loading.service();
      console.log("切换歌单分类成功");
      this.list = [];
      this.axios({
        method: "get",
        url: "/top/playlist/highquality",
        params: { cat: id },
      }).then(function (res) {
        if (res.data.code == 200) {
          // console.log(res);
          that.list = res.data.playlists;
          loadingInstance.close();
        }
      });
    },
  },
  beforeCreate() {
    let loadingInstance = Loading.service({});
    var that = this;
    //歌单全部分类
    this.axios({
      method: "post",
      url: "/playlist/catlist",
    }).then(function (res) {
      // console.log(res);
      that.xxfenlei = res.data.categories;
      that.sub = res.data.sub;
      // console.log(that.sub)
    });
    //热门分类
    this.axios({
      method: "get",
      url: "/playlist/hot",
    }).then(function (res) {
      if (res.data.code == 200) {
        // console.log(res);
        that.rlist = res.data.tags;
      }
    });
    //首页歌单推荐
    this.axios({
      method: "get",
      url: "/top/playlist/highquality?limit=20",
    }).then(function (res) {
      console.log("首页推荐成功");
      that.list = res.data.playlists;
      that.updatetime = res.data.playlists[res.data.playlists-1]
    });
    loadingInstance.close();
  },
};
</script>

<style scoped>
.t_div {
  width: 98%;
  /* border: 1px solid red; */
  margin: 10px auto 0;
}
.x_top {
  display: flex;
}
.xqkuang {
  width: 30%;
  /* border: 1px solid red; */
  line-height: 30px;
}
.xq {
  width: 60px;
  height: 30px;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
}
.xqkuang2 {
  width: 70%;
  /* border: 1px solid red; */
  flex-wrap: wrap;
  font-size: 10px;
  white-space: nowrap;
  display: flex;
}
.quanbu {
  width: 100%;
  height: 30px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  line-height: 30px;
  border: 1px solid #ccc;
}
.hh4 {
  margin-top: 5px;
  margin-bottom: 5px;
}
#playlist {
  /* border: 1px solid red; */
  width: 90%;
  margin: 0 auto;
}
ul {
  list-style: none;
  display: flex;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  height: 50px;
}
.selectkuang {
  width: 450px;
  height: 300px;
  border: 1px solid #ccc;
  position: absolute;
  overflow: auto;
  top: 9%;
  background-color: white;
}
.select {
  width: 100px;
  height: 30px;
  border: 1px solid #ccc;
  background: white;
  line-height: 30px;
  text-align: center;
  margin-top: 20px;
  border-radius: 10px;
  cursor: pointer;
}
.ul {
  width: 800px;
  /* border: 1px solid red; */
  margin-top: 20px;
}

.top {
  width: 100%;
  margin: 0 auto;
  height: 90%;
  /* border: 1px solid red; */
}
.top span:first-child {
  font-weight: bold;
}
.content {
  width: 100%;
  /* border: 1px solid red; */
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
}
li {
  cursor: pointer;
}
.contents {
  cursor: pointer;
}
.contents {
  width: 230px;
  /* border: 1px solid red; */
  margin-top: 20px;
}
.content div img {
  width: 230px;
  height: 230px;
}
.content div div:last-child {
  width: 100%;
  /* border: 1px solid black; */
}
</style>
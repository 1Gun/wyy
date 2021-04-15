<template>
  <div id="indexs">
    <Carouse :msg="banner"></Carouse>
    <div class="top">
      <span>推荐歌单</span>
      <div class="content">
        <div
          v-for="lists in list"
          :key="lists.id"
          class="contents"
          :title="lists.copywriter"
          @click="open(lists.id)"
        >
          <img :src="lists.picUrl" alt="" />
          <div class="t_bottom">{{ lists.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Carouse from "@/components/Carouse";
import { Loading } from 'element-ui';
export default {
  data() {
    return {
      list: [],
      banner: [],
    };
  },
  components: {
    Carouse,
  },
  methods:{
    open(id){
      this.$router.push({name:'musiclist',query:{id:id}})
    }
  },
  created() {
    var that = this;
    let loadingInstance = Loading.service();
    if (JSON.parse(localStorage.getItem("playlist"))) {
      this.list = JSON.parse(localStorage.getItem("playlist"));
    } else {
      this.axios({
        method: "post",
        url: "/personalized",
        params: { limit: 10 },
      }).then(function (res) {
        //   console.log(res);
        that.list = res.data.result;
        localStorage.setItem("playlist", JSON.stringify(res.data.result));
      });
    }
    if (JSON.parse(localStorage.getItem("banner"))) {
      this.banner = JSON.parse(localStorage.getItem("banner"));
    } else {
      this.axios({
        method: "post",
        url: "/banner",
        params: { type: 0 },
      }).then(function (res) {
        // console.log(res);
        that.banner = res.data.banners;
        localStorage.setItem("banner", JSON.stringify(res.data.banners));
      });
    }
    if(localStorage.getItem('uid')==''){
        this.axios({
            method: "get",
            url: "/user/account",
            params: {},
          }).then(function (res) {
            console.log(res);
            localStorage.setItem('user',res.data.profile.nickname)
            localStorage.setItem('u_img',res.data.profile.avatarUrl)
          })
          
      }
        loadingInstance.close();
  },
};
</script>
<style scoped>
#index {
  width: 90%;
  margin: 10px auto 10px;
}
 .contents{cursor:pointer } 
 li{
   cursor:pointer 
 }
.top {
  width: 90%;
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

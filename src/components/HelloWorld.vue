<template>
  <div class="warp">
    <div class="top"></div>
    <div class="ceontent" :style="'height:' + this.curHeight + 'px'">
      <div class="left"></div>
      <div class="right">
        <div class="banner"></div>
        <div class="list-box">
          <div class="list">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="list">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>

    <div class="foot"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      curHeight: 0,
    };
  },
  mounted() {
    this.beforeMount();
  },
  methods: {
    //获取屏幕高度
    beforeMount() {
      var h =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.curHeight = h - 106;
      console.log(this.curHeight);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.warp{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.top {
  width: 100%;
  height: 50px;
  border: 1px solid #f00;
}
.foot {
  width: 100%;
  height: 50px;
  border: 1px solid skyblue;
}
.ceontent {
  width: 100%;
  display: flex;
  align-content: center;
}
.left {
  width: 10%;
  border: 1px solid #000;
}
.right {
  width: 90%;
  border: 1px solid #0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.banner {
  width: 90%;
  height: 300px;
  border: tan 1px solid;
}
.list-box {
  width: 90%;
  min-height: 300px;
  border: 1px solid slateblue;
  display: flex;
  flex-direction: column;
}
.list {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: tomato 1px solid;
}
.list div {
  width: 240px;
  height: 240px;
  border: 1px solid slategray;
}
</style>

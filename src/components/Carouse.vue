<template>
    <div id="index">
        <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="banners in msg" :key="banners.id">
      <img :src="[banners.imageUrl+'?param=500y200']" alt="">
    </el-carousel-item>
    <!-- <el-carousel-item>
      <img src="@/assets/banner (2).jpeg" alt="">
    </el-carousel-item>
    <el-carousel-item>
      <img src="@/assets/banner (3).jpeg" alt="">
    </el-carousel-item>
    <el-carousel-item>
      <img src="@/assets/banner (4).jpeg" alt="">
    </el-carousel-item> -->
  </el-carousel>
    </div>
</template>
<script>
export default{
  data(){
    return{

    }
  },
  props:['msg']
}
</script>

<style scoped>
    
</style>
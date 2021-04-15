<template>
  <div id="app">
      <Header></Header>
      <Side></Side>
      <Article></Article>
      <Footer></Footer>  
  </div>
</template>
<script>
  import Header from "@/loyout/header";
  import Side from "@/loyout/side";
  import Footer from "@/loyout/footer";
  import Article from "@/loyout/article";
  export default {
      components:{
        Header,
        Side,
        Footer,
        Article
      },
  }
</script>
<style>
  *{
    margin: 0;
    padding: 0;
  }
  #app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  /* border: 1px solid red; */
  position: relative;
}
</style>



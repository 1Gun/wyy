<template>
  <div class="login">
    <h2>登录</h2>
    <div>
      <el-input v-model="name" placeholder="账号" ref="name"></el-input>
    </div>
    <div>
      <el-input v-model="pass" placeholder="密码" ref="pass"></el-input>
    </div>
    <el-button type="primary" plain @click="login()">登录</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      pass: "",
    };
  },
  computed(){
    
  },
  methods: {
    login() {
      var that = this;
      this.axios({
        method: "get",
        url: "/login/cellphone",
        params: { phone: this.name, password: this.pass },
      }).then(function (res) {
        console.log(res);
        if (res.status == 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem('u_img',res.data.profile.avatarUrl)
          localStorage.setItem("uid", res.data.account.id);
          localStorage.setItem("cookie", res.data.cookie);
          that.$notify({
            title: "成功",
            message: "这是一条成功的提示消息",
            type: "success",
          });
        }
      });
      
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}
</style>
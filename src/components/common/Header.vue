<template>
  <el-header style="height: 40px; background-color: #41B6E6;">
    <el-row>
      <el-col :span="20">
          <el-link :href='"/search"' :underline="false">
            <span style="color:white;font-size:17px; line-height: 40px;">
              汉典中医知识系统
            </span>
          </el-link>
      </el-col>
      <el-col :span="2">
        <div>
          <el-link type="text" style="color:white;font-size:17px; line-height: 40px;"  @click="handleSignup">注册</el-link>
        </div>
      </el-col>
      <el-col :span="2">
        <div>
          <el-link style="color:white; font-size:17px; line-height: 40px; " @click="handleLogin">登录</el-link>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
    name:"Header",
    data () {
      return {
        userinfo:{},
      }
    },
    methods:{
      // 登出
      /*
      logout: function () {
        var _this = this; //这条语句是防止this指向当前函数,这样赋值_this就指向vm对象了
        this.$confirm("确认退出吗?", "提示", {type: "warning"})
          .then(() => {
            sessionStorage.removeItem("userinfo");
            _this.$router.push("/login");
          })
          .catch(() => {});
      }
      */
     handleSignup(){
       this.$router.push({ path: '/signup' })
     },
     handleLogin(){
       this.$router.push({ path: '/login' })
     },
    },
    
    created () {
        this.userinfo = JSON.parse((sessionStorage.getItem("userinfo")))
    }
}
</script>
<style lang="scss" scoped>
</style>

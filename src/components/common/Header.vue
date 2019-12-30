<template>
  <el-header class="header">
    <el-row>
      <el-col :span="10">
          <el-link :href='"/home"' :underline="false">
            <span style="color:white;font-size:17px; line-height: 40px;">
              汉典中医知识系统
            </span>
          </el-link>
      </el-col>
      <el-col v-if="!userinfo" :span="10" class="userinfo">
        <el-col :span="5" class="userinfo-inner">
          <div>
            <el-link type="text" style="text-align: right;padding-right: 5px;float: right;"  @click="handleSignup">注册</el-link>
          </div>
        </el-col>
        <el-col :span="5" class="userinfo-inner">
          <div>
            <el-link type="text" style="text-align: right;padding-right: 5px;float: right;" @click="handleLogin">登录</el-link>
          </div>
        </el-col>
      </el-col>
      <el-col v-else :span="10" class="userinfo">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <img src="@/assets/bg1.jpg" />
            <!-- {{userinfo.user_name}} -->
            测试
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item @click.native="dialogVisible=true" icon="el-icon-user"  style="width:80px">账户信息</el-dropdown-item> -->
            <!-- <el-dropdown-item  @click.native="changePassword" icon="fa fa-cog">修改密码</el-dropdown-item> -->
            <!-- <el-dropdown-item divided @click.native="logout" icon="fa fa-power-off">退出登录</el-dropdown-item> -->
            <el-dropdown-item icon="fa fa-cog">修改密码</el-dropdown-item>
            <el-dropdown-item divided  icon="fa fa-power-off">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
        console.log("header的userinfo",this.userinfo)
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/vars";
  .header {
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color: #fff;

    .userinfo {
      text-align: right;
      padding-right: 5px;
      float: right;

      .userinfo-inner {
        cursor: pointer;
        color: #fff;

        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }

    .logo {
      height: 60px;
      font-size: 17px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;

      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
    }
}
</style>

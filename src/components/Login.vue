<template>
  <div>
    <h1 class="main-title">
      <i class="fa fa-envira" style="color:green"></i>
      汉典中医知识系统
    </h1>
    <hr class="my-hr" :style="{ background: (showLogin?'#409EFF':'#C16050')}">

    <!-- <transition name="fade"
                enter-active-class="animated fadeInUp"
                leave-active-class="animated fadeOutUp"> -->
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px"
                v-if="showLogin" class="login-container">
          <h2 class="title">系统登录</h2>
          <el-form-item prop="email">
            <el-input type="text" v-model="loginForm.email" @keyup.enter.native="handleSubmit"
                      auto-complete="off" placeholder="账号" suffix-icon="fa fa-user"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" @keyup.enter.native="handleSubmit"
                      auto-complete="off" placeholder="密码" suffix-icon="fa fa-lock"></el-input>
          </el-form-item>
          <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;border-radius:2px" @click="handleSubmit" :loading="logining">登录
            </el-button>
          </el-form-item>
        </el-form>

  </div>
</template>

<script>
import { apiLogin } from '@/api/api-common'
export default {
  data () {
    return {
      showLogin:true,
      logining: false,
      loginForm: {
        email: '',
        password: ''
      },
      resetForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    handleSubmit (ev) {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.logining = true
          var params = { email: this.loginForm.email, password: this.loginForm.password }
          apiLogin(params).then(res => {
            this.logining = false
            if (res.code !== 200) {
              this.$message({message: res.msg + ' 密码或用户名错误',type: 'error'})
            }
            else
            {
              this.$message({message: '登录成功',type: 'success'})
              // apiHome(params)
              //   .then( (home_res)=> {
              //     // sessionStorage 这一行务必写在跳转页面前面!!!!!! 注意使用JSON.stringify()
              //     sessionStorage.setItem('userinfo', JSON.stringify(home_res.data.userinfo))
              //     this.$router.push({ path: '/home' })
              //   }).catch()
              // console.log(res.user)
              sessionStorage.setItem('userinfo', JSON.stringify(res.user.email))
              this.$router.push({ path: '/home' })
            }
          })

        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
}
}
</script>

<style lang="scss" scoped>
$color-login: #409EFF;
$color-reset: #C16050;
  .main-title {
    text-align: center;
    margin: 10px auto;
    // margin: 150px 20px 20px 20px;
    // font-family: Helvetica, Tahoma, Arial, "Heiti SC", "Microsoft YaHei", sans-serif;
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: lighter;
    color:black
  }
  .my-hr {
    width: 400px; height: 2px; border: none;
    background: $color-login;
    margin-bottom: 20px
  }
  .my-font {
    font-size: 15px;
    font-weight: lighter;
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .my-ul {
    text-align:center;
    padding-left:0px;
    list-style-type:none;
    .my-li {
      margin-top: 9px;
      margin-bottom: 9px;
    }
  }
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 10px auto 0px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .title {
      margin: 0px auto 20px auto;
      font-weight: lighter;
      text-align: center;
      color: $color-login;
    }

    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
  .bottom-bar {
    -webkit-border-radius: 5px;
    border-radius: 0px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 0px auto;
    width: 350px;
    padding: 5px 35px 5px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    background:$color-login;
    .el-button--text {
      color:white;
      padding-block-start:0px;
      padding-block-end:0px;
    }
    .left {
      text-align:left;
    }
    .right {
      text-align:right;
    }
  }
.el-button--btn-send {
    background:$color-reset;
    border:1px solid $color-reset
}
</style>

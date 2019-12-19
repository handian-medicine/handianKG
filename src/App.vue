<template>
  <div id="app">
    <transition name="fade"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}

</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    // font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-family: "PingFangSC-Light", Tahoma, Arial, "SimSun", "Microsoft Yahei", sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  #app {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgb(250,250,250)
  }

  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .toolbar {
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0px;

    .el-form-item {
      margin-bottom: 10px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  //dialog头部样式
  .my-dialog {
    .el-dialog {
      border-radius:12px;
    }
    .el-dialog__title {
      color:#f2f2f2;
    };
    .el-dialog__header {
      // margin: 0px auto 40px auto;
      background-color: cornflowerblue;
      font-size:1.5em;
      border-radius:12px 12px 0 0;
    };
    .el-form-item__label {
      color:cornflowerblue;
      font-weight:600;

    }
    .el-icon-close:before{
      color:black;
    }
    .el-checkbox {
        margin-right: 10px
    }
    .el-radio {
        margin-right: 12px
    }
  }

  .el-button {
    font-weight: 400
  }
</style>

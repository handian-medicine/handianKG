<template>

<el-row class="container" justify="center">
  <el-row justify="center">
    <Header @headerEvent="ret=>(collapsed=ret)"></Header>
  </el-row>
  <br>

  <el-row :gutter="20">
    <el-col :span="16">
      <div class="grid-content bg-purple">
        名词
        <ul>
          <li>属性1</li>
          <li>属性2</li>
          <li>属性3</li>
        </ul>
        <img src="@/assets/bg1.jpg" class="image">
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">
        相关名词
        <ul>
          <li>名词1</li>
          <li>名词2</li>
          <li>名词3</li>
        </ul>
      </div>
    </el-col>
    <!-- <el-col :span="6"><div class="grid-content bg-purple"></div></el-col> -->
    <!-- <el-col :span="6"><div class="grid-content bg-purple"></div></el-col> -->
</el-row>
</el-row>

</template>

<script>
import {apiHome} from '@/api/api-common'
import {apiTermContent} from '@/api/api-common';

export default {
    name:"Term",
    components:{Header},
    data () {
        return {
            userinfo:{},
            wenxian: "",
            collapsed: true,
        }
    },
    methods: {
        // 退出登录
        logout: function () {
          var _this = this; //这条语句是防止this指向当前函数,这样赋值_this就指向vm对象了
          this.$confirm("确认退出吗?", "提示", {
            type: "warning"
          })
            .then(() => {
              _this.$router.push("/login");
            })
            .catch(() => {});
        },
        collapse: function() {
          this.collapsed = !this.collapsed;
        }
    },
    created () {
    }
}
</script>

<style scoped lang="scss">
@import "../assets/styles/vars";

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .header {
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color: #fff;

    .userinfo {
      text-align: right;
      padding-right: 35px;
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

      .txt {
        color: #fff;
      }
    }

    .logo-width {
      width: $aside-width;
    }

    .logo-collapse-width {
      width: 60px;
    }

  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .image {
    width: 100%;
    display: block;
  }
}
</style>

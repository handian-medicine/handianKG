<template>

<el-row class="container" justify="center">
  <el-row justify="center">
    <Header @headerEvent="ret=>(collapsed=ret)"></Header>
  </el-row>
  <br>
  <el-row justify="center">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="汉典药品文献检索" >
        <el-input v-model="literature" @keyup.enter.native="search('literature',literature)">
          <el-button slot="append" icon="el-icon-search" @click="search('literature',literature)"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="医学名词检索" >
        <el-input v-model="term" @keyup.enter.native="search('term',term)">
          <el-button slot="append" icon="el-icon-search" @click="search('term',term)"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="中医方剂检索" >
        <el-input v-model="prescription" @keyup.enter.native="search('prescription',prescription)">
          <el-button slot="append" icon="el-icon-search" @click="search('prescription',prescription)"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="中药材检索" >
        <el-input v-model="tcm" @keyup.enter.native="search('tcm',tcm)">
          <el-button slot="append" icon="el-icon-search" @click="search('tcm',tcm)"></el-button>
        </el-input>
      </el-form-item>
      <!-- <el-button type="primary" icon="el-icon-search" size="small" @click="searchPatient">查询</el-button> -->
    </el-form>
  </el-row>
</el-row>

</template>

<script>
import Header from '@/components/common/Header'
import {apiEnterSearch} from '@/api/api-common'


export default {
    name:"Search",
    components:{Header},
    data () {
        return {
            form:{},
            literature:'',
            term:'',
            prescription:'',
            tcm:''
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
              _this.$router.push("/home");
            })
            .catch(() => {});
        },
        search (key,value) {
          // alert("hello:"+key + ":"+value)
          this.$router.push("/explaination?class=" + key + "&search=" + value);
        }
    },
    created () {
      apiEnterSearch().then(res => {
          if (res.msg == 'ok') {
              // this.literature = res.data
              console.log('hello')
          } else {
              // alert('请先登录')
              this.$router.push("/login")
          }
      })
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

    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }

  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;

    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }

    .menu-expanded {
      flex: 0 0 $aside-width;
      width: $aside-width;

      .el-menu {
        /*打补丁的方式解决左侧菜单宽度显示不全*/
        width: 100% !important;
      }

      .el-submenu .el-menu-item {
        min-width: 0px !important;
      }
    }

    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;

      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }

        .breadcrumb-inner {
          float: right;
        }
      }

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>

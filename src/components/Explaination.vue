<template>

<el-row class="container" justify="center">
  <el-row justify="center">
    <Header @headerEvent="ret=>(collapsed=ret)"></Header>
  </el-row>
  <br>

  <el-row :gutter="20">
    <el-col :span="14" style="padding-left:20px">
      <div class="grid-content bg-purple">
        <h3>{{this.$route.query.search}}</h3>
        <ul>
          <li>属性1</li>
          <li>属性2</li>
          <li>属性3</li>
        </ul>
        <img src="@/assets/bg1.jpg" class="image">
      </div>
    </el-col>
    <el-col :span="9">
      <div>
        <h3>相关文献</h3>
        <ul v-if="literatures!=''">
          <li>{{literatures[0].name}}</li>
          <li>{{literatures[1].name}}</li>
          <li>{{literatures[2].name}}</li>
          <li>{{literatures[3].name}}</li>
        </ul>
        <ul v-else></ul>
      </div>
    </el-col>
    <!-- <el-col :span="6"><div class="grid-content bg-purple"></div></el-col> -->
    <!-- <el-col :span="6"><div class="grid-content bg-purple"></div></el-col> -->
</el-row>
</el-row>

</template>

<script>
import Header from '@/components/common/Header'
import {apiTermContent} from '@/api/api-common';

import {apiLiteratureSearch} from '@/api/api-common'
import {apiPrescriptionSearch} from '@/api/api-common'
import {apiTcmSearch} from '@/api/api-common'
import {apiTermSearch} from '@/api/api-common'
export default {
    name:"Explaination",
    components:{Header},
    data () {
        return {
            explaination: "",
            literatures:[],
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
    },
    created () {
      var search_func = {
            "literature":apiLiteratureSearch,
            "prescription":apiPrescriptionSearch,
            "tcm":apiTcmSearch,
            "term":apiTermSearch,
      }
      var params = {search:this.$route.query.search}
      console.log("搜索项目：",params)
      if (this.$route.query.class == 'literature') {
        apiLiteratureSearch(params).then(res => {
          this.literatures = res.data
        })
      } else {
        search_func[this.$route.query.class](params).then(res => {
          this.explaination = res.data.data
          this.literatures = []
        })
      }
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

  .image {
    width: 100%;
    display: block;
  }
}
</style>

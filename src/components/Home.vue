<template>

<el-row class="container" justify="center">
  <el-row justify="center">
    <Header @headerEvent="ret=>(collapsed=ret)"></Header>
  </el-row>
  <el-row >
    <h2 style="text-align: center;">汉典荣誉出品中成药</h2>
  </el-row>
  <el-row >
  <el-row>
    <el-col :span="5" v-for="(val, index) in product_list" :key="index" :offset="1">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="'http://'+val.pic_url" class="image">
        <div style="padding: 14px;">
          <el-link :href='"/recommend?id=" + val.neo_id' :underline="false">{{val.name}}</el-link>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <h3 style="text-align: center;">
      <el-button type="primary" icon="el-icon-search" @click='$router.push("/search")'>更多搜索</el-button>
    </h3>
  </el-row>
  <div class="pic-bottom">
    <img src="../assets/shezhenpic.jpg" style="height:100px;width:100px">
  </div>

  </el-row>

</el-row>
</template>

<script>
import {apiProductList} from '@/api/api-common'
import Header from '@/components/common/Header'

export default {
    name:"Home",
    components:{Header},
    data () {
        return {
            userinfo:{},
            wenxian: "",
            collapsed: true,
            product_list:null,
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
    mounted () {
        apiProductList().then(res=>{
            // for (var i = 0;i < res.data.length;i++){
            //   this.product_list[i] = res.data[i].name
            // }
            this.product_list = res.data
            console.log('产品列表',this.product_list)
            }).catch()
    },
    created () {
      this.userinfo = JSON.parse((sessionStorage.getItem("userinfo")))
    }
}
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 195px;
    height: 145px;
    display: block;
  }
.pic-bottom {
    width:100px;
    float:right;
    position:fixed;
    right:0px;
    bottom:0px;
}
</style>

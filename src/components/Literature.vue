<template>
<el-row class="container" justify="center">

  <el-row justify="center">
    <Header @headerEvent="ret=>(collapsed=ret)"></Header>
  </el-row>
  <el-row >
    <h2 style="text-align: center;">汉典荣誉出品中成药</h2>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
    </el-col>
    <el-col :span="12">
      <h2>{{literature_content.title}}</h2>
      <p>摘要：{{literature_content.summary}}</p>
      <p>作者：{{literature_content.author}}</p>
      <p><img src="@/assets/bg1.jpg" class="image" style="width:100%; height:400px;"></p>
    </el-col>
  </el-row>


</el-row>
</template>

<script>
import Header from '@/components/common/Header'
import {apiLiteratureContent} from '@/api/api-common';

export default {
name:"Literature",
    components:{Header},
    data () {
        return {
            userinfo:{},
            wenxian: "",
            collapsed: true,
            // literature_url:'',
            // literature_name:'',
            literature_content:''
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
        },

    },
    created() {
      // var params = {url:this.$route.query.url}
      // this.literature_url = this.$route.query.url
      // this.literature_name = this.$route.query.name
      var params = {url:this.$route.query.url}
      console.log(params)
      apiLiteratureContent(params).then(res=>{
          this.literature_content = res.data
          console.log('hello',this.literature_content)
      }).catch()
    },
}
</script>




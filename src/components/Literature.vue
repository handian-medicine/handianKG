<template>
<el-row class="container" justify="center">

  <el-row justify="center">
    <Header @headerEvent="ret=>(collapsed=ret)"></Header>
  </el-row>
  <el-row >
    <h2 style="text-align: center;">汉典荣誉出品中成药</h2>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="16">
      <h3>{{literature_content.title}}</h3>
      <p>摘要：{{literature_content.summary}}</p>
      <p>作者：{{literature_content.author}}</p>
      <!-- <iframe class="pdf-viewer" src="/static/test.pdf" style="width:100%; height:400px;"> -->
      <iframe class="pdf-viewer" :src="literature_content.download_url" style="width:100%; height:400px;">
        <!-- 放到src文件夹下有问题 -->
        <!-- <pdf src="/static/test.pdf"></pdf> -->
      </iframe>
    </el-col>
    <el-col :span="8">
      <h3>相关文献</h3>
      <ul v-for="item in literature" :key="item.name">
        <li><el-link :href='"/literature?url=" + item.url + "&name=" + item.name + "&id=" + $route.query.id' :underline="false">{{item.name}}</el-link></li>
      </ul>
    </el-col>
  </el-row>


</el-row>
</template>

<script>
import pdf from 'vue-pdf'
import Header from '@/components/common/Header'
import {apiLiteratureContent} from '@/api/api-common';
import {apiProductLiterature} from '@/api/api-common';

export default {
name:"Literature",
    components:{pdf,Header},
    data () {
        return {
            userinfo:{},
            wenxian: "",
            collapsed: true,
            literature_content:'',
            literature:{}
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
    created() {

      var params = {url:this.$route.query.url}
      apiLiteratureContent(params).then(res=>{
          this.literature_content = res.data
          console.log('hello',this.literature_content)
      }).catch()

      var params2 = {id:this.$route.query.id}
      apiProductLiterature(params2).then(res=>{
          if (res.msg == 'ok') {
              this.literature = res.data
              console.log('走到这里',this.literature)
          } else {
              this.$router.push("/login")
          }
        }).catch()
    },
}
</script>




<template>
<el-row class="container" justify="center">

  <el-row justify="center">
    <Header @headerEvent="ret=>(collapsed=ret)"></Header>
  </el-row>
  <el-row>
    <h2 style="text-align: center;">汉典荣誉出品中成药</h2>
  </el-row>
  <el-row :gutter="1">
    <el-col :span="15">
        <div id="main" style="width:100%; height:600px;"></div>
        <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
    </el-col>
    <el-col :span="8">
      相关文献
      <ul v-for="item in literature" :key="item.name">
        <!-- <li><el-link href="/literature" :underline="false">{{item.name}}</el-link></li> -->
        <li><el-link :href='"/literature?url=" + item.url + "&name=" + item.name + "&id=" + id' :underline="false">{{item.name}}</el-link></li>
        <!-- <li><el-link :href="item.url" :underline="false">{{item.name}}</el-link></li> -->
      </ul>
    </el-col>
  </el-row>



</el-row>
</template>
<script>
import {apiProductGraph} from '@/api/api-common';
import {apiProductLiterature} from '@/api/api-common';
import Header from '@/components/common/Header'
import echarts from 'echarts'

export default {
    name:"Recommend",
    components:{Header},
    data () {
        return {
            literature:{},
            num:1,
            data:[],
            links:[],
            categories:[],
            id:''
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
        handleChange(value) {
          console.log(value);
          this.drawCharts(value)
        },
        drawCharts (page_num) {
          var params = {
            id:this.$route.query.id,
            page:page_num
            }
          apiProductGraph(params).then(res=>{
            if (res.data != undefined) { //
              this.data = res.data.data
              this.links = res.data.links
              // 类似python里的map函数
              this.links = this.links.map(o=>{
                  return {source:String(o.start),target:String(o.end),rel:String(o.rel)}
                });
              var en2cn = {
                  'HandianProduct': '汉典产品',
                  'Literature': '文献',
                  'Prescription': '药方',
                  'Term': '医学名词',
                  'Guijing': '归经',
                  'TCM': '中药名',
                  'Xingwei': '性味',
                  'Author': '作者',
              }
              this.data = this.data.map(o=>{
                  //获取所有的类别,并转换为中文
                  if (JSON.stringify(this.categories).indexOf(JSON.stringify(en2cn[o.label]))==-1){
                      this.categories.push({name:en2cn[o.label]})
                  }
                  return {
                    id:String(o.id),
                    name:String(o.name),
                    category:en2cn[o.label],
                    symbolSize:30,
                    draggable: "true"}
              });
              console.log("看这里links", this.links)
              console.log("看这里data", this.data)
              console.log("看这里categories",this.categories)
              this.chartGraph = echarts.init(document.getElementById('main'))
              this.chartGraph.setOption({
                  title: {
                            text: '中医知识图谱',
                            top: "top",
                            left: "left",
                            textStyle: {
                                // color: '#f7f7f7'
                            }
                  },
                  tooltip: {},
                  legend:{
                        // selectedMode: 'single',
                        data: this.categories.map(function (a) {
                            return a.name;
                        }),
                        icon: 'circle',
                        type: 'scroll',
                        orient: 'vertical',
                        left: 10,
                        top: 20,
                        bottom: 20,
                        itemWidth: 10,
                        itemHeight: 10
                  },
                  animation: false,
                  series : [
                      {
                          name: '知识图谱',
                          type: 'graph',
                          layout: 'force',
                          data: this.data,
                          links: this.links,
                          categories: this.categories,
                          roam: true,
                          label: {
                              normal: {
                                  position: 'right',
                                  show: true,
                                  formatter: function (x) {return x.data.name;}
                              }
                          },
                          force: {
                              edgeLength:[90,200], // 调节节点中间的连线长度
                              repulsion: 200
                          }
                      }
                  ]
              }) //setOption
              this.chartGraph.on('click',{dataType: 'node'},function (params){
                // id: (...)
                // name: (...)
                // category: (...)
                // symbolSize: (...)
                // draggable: (...)
                  console.log('点击目标:'+ params.data.category)
              })
            } else {
              console.log('请先登录')
            }
          }).catch();//apiProductGraph
        }// drawCharts
    },
    mounted: function () {
      this.drawCharts(1)
    },
    // updated: function () {
    //   this.drawCharts()
    // },
    created () {
      this.id = this.$route.query.id
      var params = {id:this.id}
      console.log(params)
      apiProductLiterature(params).then(res=>{
          if (res.msg == 'ok') {
              this.literature = res.data
              console.log('hello',this.literature)
          } else {
              this.$router.push("/login")
          }
      }).catch()
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
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

<template>
<el-row class="container" justify="center">

  <el-row justify="center">
    <Header @headerEvent="ret=>(collapsed=ret)"></Header>
  </el-row>
  <el-row>
    <h2 style="text-align: center;">汉典荣誉出品中成药</h2>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="20">
        <div id="main" style="width:100%; height:400px;"></div>
    </el-col>

  </el-row>
  <el-col :span="12">
      相关文献
      <ul v-for="item in literature" :key="item.name">
        <!-- <li><el-link href="/literature" :underline="false">{{item.name}}</el-link></li> -->
        <li><el-link :href='"/literature?url=" + item.url + "&name=" + item.name' :underline="false">{{item.name}}</el-link></li>
        <!-- <li><el-link :href="item.url" :underline="false">{{item.name}}</el-link></li> -->
      </ul>
    </el-col>


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
            // userinfo:{},
            wenxian: "",
            collapsed: true,
            literature:{},
            // literature_url:[],
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
        drawCharts () {
          var params = {id:this.$route.query.id}
          apiProductGraph(params).then(res=>{
              var data = []
              var links = []
              data = res.data.data
              links = res.data.links
              // 类似python里的map函数
              var links = links.map(o=>{
                  return {source:String(o.start),target:String(o.end),rel:String(o.rel)}
                });
              console.log("看这里",links)
              this.chartGraph = echarts.init(document.getElementById('main'))
              this.chartGraph.setOption(
                {
                  // 图的标题
                  title: {
                      text: 'ECharts 关系图'
                  },
                  // 提示框的配置
                  tooltip: {
                      formatter: function (x) {return x.data.des;}
                  },
                  // animationEasingUpdate: false,
                  animationDurationUpdate: 0,
                  animationEasingUpdate: 'quinticInOut',
                  // 工具箱
                  toolbox: {
                      // 显示工具箱
                      show: true,
                      feature: {
                          mark: {show: true},
                          // 还原
                          restore: {show: true},
                          // 保存为图片
                          saveAsImage: {show: true}
                      }
                  },
                  legend:[
                    {selectedMode: 'single',}
                  ],
                  series:[
                    {
                      type: 'graph', // 类型:关系图
                      layout: 'force', //图的布局，类型为力导图
                      symbolSize: 40, // 调整节点的大小
                      roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                      force: {
                          repulsion: 2500,
                          edgeLength: [10, 50]
                      },
                      draggable: true,
                      lineStyle: { // edge的线样式
                          normal: {
                              width: 2,
                              color: '#4b565b',
                          }
                      },
                      edgeSymbol: ['circle', 'arrow'],
                      edgeSymbolSize: [2, 10],
                      edgeLabel: { //edge标签样式
                          normal: {
                              textStyle: {
                                  fontSize: 10
                              },
                              show: true,
                              formatter: function (x) {return x.data.rel;}
                          }
                      },
                      label: { //node标签样式
                          normal: {
                              show: true,
                              textStyle: {},
                              formatter: function (x) {return x.data.name;}
                          },
                      },
                      // 数据
                      // data: [
                      //   {
                      //     id:0,
                      //     name: 'node01',
                      //     des: 'nodedes01',
                      //     symbolSize: 50,
                      //   }
                      // ],
                      // links: [
                      //   {
                      //     source: '0',
                      //     target: '1',
                      //     aa: 'link01',
                      //     des: 'link01des'
                      //   },
                      data: data,
                      links: links,
                    }
                  ]
                }
              ) //setOption
          }).catch();//apiProductGraph
        }// drawCharts
    },
    mounted: function () {
      this.drawCharts()
    },
    // updated: function () {
    //   this.drawCharts()
    // },
    created () {
      var params = {id:this.$route.query.id}
      console.log(params)
      apiProductLiterature(params).then(res=>{
          // for (var i = 0;i < res.data.length;i++){
          //     this.literature[i] = res.data[i].name
          // }
          this.literature = res.data
          console.log('hello',this.literature)
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

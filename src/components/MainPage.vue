<template>
  <el-row class="container">
    <!-- 头部栏 -->
    <Header @headerEvent="ret=>(collapsed=ret)" title="多囊卵巢综合征"></Header>
    <el-col :span="24" class="main">
      <!-- 侧边栏 -->
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-未折叠-->
        <!-- $route.path表示当前路径 -->
        <!--router参数:是否使用 vue-router 的模式,启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleopen"
          @close="handleclose"
          @select="handleselect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
          v-show="!collapsed">
          <template v-for="item in routes[0].children">
            <el-menu-item
              v-if="!item.leaf"
              :key="item.name"
              :index="item.path">
              <i :class="item.iconCls"></i>
              {{item.name}}
            </el-menu-item>
          </template>
        </el-menu>
        <!-- 导航菜单-折叠 -->
        <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
          <li v-for="item in routes[0].children" :key="item.name" class="el-submenu item">
            <!-- 单级菜单 -->
            <template>
                <div
                  class="el-submenu__title"
                  style="height: 56px;line-height: 56px;padding: 0 20px;"
                  :class="$route.path===item.path?'is-active':''"
                  @click="$router.push(item.path)">
                  <el-tooltip class="item" effect="dark" placement="right">
                    <div slot="content">{{item.name}}</div>
                    <i :class="item.iconCls"></i>
                  </el-tooltip>
                </div>
            </template>
          </li>
        </ul>
      </aside>
      <!-- 显示内容 -->
      <section class="content-container">
          <!-- 面包屑breadcrumb -->
          <el-col :span="24" class="breadcrumb-container">
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <!-- 内容 -->
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import Header from '@/components/common/Header'
export default {
  name:'MainPage',
  components:{Header},
  data() {
    return {
      sysName: "中医妇科临床流调数据中心",
      collapsed: true,
      sysUserName: "",
    };
  },
  computed: {
    // 关于v-for v-if，data里未定义的变量遍历使用计算属性。否则使用v-for v-if配合使用
    routes: function() {
      return this.$router.options.routes.filter(function(item) {
        return item.name == '多囊卵巢综合征';
      });
      // return this.$router.options.routes.filter(function(item) {
      //   return !item.hidden;
      // });
    },
    // 利用闭包实现计算属性传参。 从当前route中取出符合条件的子路由
    routeChildren: function(route) {
      return function(route) {
        return route.children.filter(function(child) {
          return !child.hidden;
        });
      };
    }
  },
  methods: {
    getUserInfo() {
      this.$refs['userInfo'].$emit("getUserEvent")
    },
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {
      // console.log('handleopen');
    },
    handleclose() {
      // console.log('handleclose');
    },
    handleselect: function(a, b) {},
    // 退出登录
    logout: function() {
      var _this = this; //这条语句是防止this指向当前函数,这样赋值_this就指向vm对象了
      this.$confirm("确认退出吗?", "提示", {type: "warning"})
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    // 折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  },
  mounted() {
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      console.log(user);
      this.sysUserName = user.email || "";
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/vars";

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;

    aside {
      flex: 0 0 $aside-width;
      width: $aside-width;
      .el-menu {
        height: 100%;
      }

      .collapsed {
        width: 60px;

      .item {
          position: relative;
        }

        .submenu {
          position: absolute;
          top: 0;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }

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
          float: right;
          color: #475669;
        }

        .breadcrumb-inner {
          float: left;
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

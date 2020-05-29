<template>
    <div class="page-container">
        <el-container>
            <el-aside width="auto">
                <!-- 侧边栏组件 -->
                <Aside :collapse="collapse"/>
            </el-aside>

            <el-container>
                <el-header>
                    <!-- 头部组件 -->
                    <Header @updataCollapse="updataCollapse"/>
                </el-header>

                <el-main>
                  <!-- 面包屑组件 --> 
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="(item, index) in routerInfo" :key="index">
                      {{item}}
                    </el-breadcrumb-item>
                  </el-breadcrumb>

                  <!-- 展示子页面 -->
                  <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
// 导入组件
import Aside from "../components/Aside";
import Header from "../components/Header";

export default {
    data(){
        return {
          //默认为展开
           collapse: false
           ,routerInfo:[{
     a:'商品'
           },{b:'liebiao '}]
        }
    },

    methods: {
      //点击修改值
        updataCollapse(){
          this.collapse = !this.collapse;
        }
    },

    // 注册组件
    components: {
        Aside,
        Header
    },

    computed: {
      // 监听路由的变化，返回meta
      rrouterInfo(){
        const arr = this.$route.matched.map(v => {
          return v.meta;
        })
        return  arr;
      }
    }
}
</script>

<style>
  .el-header{
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    position: relative
  }
  
  .el-main {
    background-color: #E9EEF3;
  }
  
  /* 首页布局的高度需要修改为100% */
  .page-container > .el-container {
    position:absolute;
    width:100%;
    top:0; 
    bottom:0;     
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
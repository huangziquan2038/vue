<template>
  <!--  default-active：当前激活的菜单
  collapse: 菜单的展开收缩-->
  <el-menu
    default-active="1-1"
    class="el-menu-vertical-demo"
    background-color="#001529"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="collapse"
  >
    <el-submenu v-for="(item, index) in menus" :key="index" :index="`${index+1}`">
       <!-- 自定义模板 -->
      <template slot="title">
        <i :class="item.name"></i>
        <span>{{item .name}}</span>
      </template>
<!-- 渲染菜单的子选项 -->
      <el-menu-item
        v-for="(subItem,subIndex) in item.children"
        :key="subIndex"
        :index="`${index+1}-${subIndex+1}`">
        <router-link :to="subItem.src">{{subItem.name}}</router-link>
        </el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      menus: [
        {
          icon: "el-icon-goods",
          name: "购物商城",
          children: [
            { name: "商品管理", src: "/admin/goods-list" },
            { name: "栏目管理", src: "/admin/goods-list" }
          ]
        },
        {
          icon: "el-icon-service",
          name: "会员管理",
          children: [{ name: "会员列表", src: "/admin/account-list" }]
        }
      ]
    };
  },
  // 在单文件组件中可以用对象来声明
  props: {
    collapse: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    
  }
};
</script>
<style>
/* 
    el-menu-vertical-demo el-menu
    el-menu-vertical-demo el-menu--collapse el-menu 
    */
/* 对比完后收起会多出一个class为 el-menu--collapse */
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu {
  border-right: none;
}
.el-menu-vertical-demo {
  height: 100%;
}

.el-menu a {
  color: inherit;
  text-decoration: none;
}
</style>
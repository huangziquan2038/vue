import Vue from 'vue'
import App from './App.vue'
//引入element-ui
import ElementUI from 'element-ui'
//引入饿了吗样式
import 'element-ui/lib/theme-chalk/index.css'
// 1.引入axios
import axios from 'axios';

//1引入路由
import VueRouter from "vue-router"

//引入组件
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import GoodsList from "./pages/GoodsList"
import GoodsAdd from "./pages/GoodsAdd"
import GoodsEdit from "./pages/GoodsEdit"
import store from "./store"
//2注册路由 配置路由
Vue.use(VueRouter)
const routes = [
  { path: "/login", component: Login, meta: "登录" },
  {
    path: "/admin", component: Admin, meta: "后台管理",
    children: [{ path: "goods-list", component: GoodsList, meta: "商品列表" },
     { path: "goods-add", component: GoodsAdd, meta: "新增商品" },
     { path: "goods-edit", component: GoodsEdit, meta: "新增商品" }]
  }]
//3创建路由对象
const router = new VueRouter({ routes })

//注册饿了吗
Vue.use(ElementUI);
// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  // 把store绑定到根实例
  store,
  router: router,
  render: h => h(App),
}).$mount('#app')

import Vuex from "vuex"
import Vue from  "vue"

//注册组件
Vue.use(Vuex)

const store = new Vuex.Store({
    //就是data一样 保存数据
    state:{
        user:{
          // 因为必须要登录才能获取的数据
          username: localStorage.getItem("username") || "",
          realname: localStorage.getItem("realname") || "",    

        }

    },
    // 修改state的值，属性的是函数
    mutations:{
        // 函数中有一个参数就是state（也就是data）
        // 第二个参数是传递过来的参数
        setUser(state,user){
            state.user=user;
        }

    },
    // 处理异步数据，用法个mutation是一样的
    actions: {}

});
//暴露到外面可用
export default store;
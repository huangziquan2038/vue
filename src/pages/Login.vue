<template>
  <el-row type="flex" class="container" justify="center">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <div class="title">登录</div>
      <!-- prop指定规则查找 -->
      <el-form-item label="账号" prop="uname">
        <el-input v-model="form.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="upwd">
        <el-input v-model="form.upwd" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    //获取表单数据
    return {
      form: {
        uname: "",
        upwd: ""
      },
      rules: {
        uname: [{ required: true, message: "请输入账号", trigger: "blur" }],
        upwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    onSubmit() {
      //调用表单认证
      this.$refs.form.validate(valid => {
        //验证不通过直接返回
        if (!valid) return;
        //发起请求
        this.$axios({
          url: "http://localhost:8899/admin/account/login",
          method: "POST",
          data: this.form,
          //处理跨域的参数
          withCredentials: true
        }).then(res => {
          const { status, message } = res.data;
          //解构的数据用于判断登录是否成功
          if (status == 0) {
            // 成功跳转首页
            this.$router.push("/admin");
            this.$store.commit("setUser", {
              username: message.uname,
              realname: message.realname
            });
          } else {
            //失败谈信息
            this.$message({
              message: message,
              type: "success"
            });
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.form {
  width: 150px;
  margin-top: 10%;
}
.title {
  text-align: center;
}
</style>
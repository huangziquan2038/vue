<template>
    <el-row type="flex" justify="space-between" align="middle">
        <i class="el-icon-back" @click="handleClick"></i>
        <div>
            admin 超级管理员 <span>退出</span>
        </div>
    </el-row>
</template>
<script>
export default {
    methods:{
        handleClick(){
        this.$emit("updataCollapse")
    }
    }
    
}
</script>
<style>

</style>
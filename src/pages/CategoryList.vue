<template>
    <div>
        <!-- 列表顶部 -->
        <el-row type="flex" justify="space-between" align="middle" class="tooltip">
            <el-col>
                <el-button>新增</el-button>
                <el-button>删除</el-button>
            </el-col>
        </el-row>

        <!-- 内容列表 -->
        <!-- data是数据
            show-checkbox:是否显示多框
            default-expand-all: 默认展开
         -->

        <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false">

        <!-- scoped.row 每一行的数据，一般是一个对象 -->
        <!-- data表示每一行的数据 -->
        <!-- node是每一行的节点,也可以访问到每一行数据 -->
        <span class="custom-tree-node" slot-scope="{data}">

            <span>{{ data.title }}</span>
            
            <span>
                <!-- $event事件处理函数获取输入框的值
                data整行数据 -->
                <input size="mini" class="input" :value="data.sort_id" @blur="handleBlur($event, data)"/>
            </span>
            
            <el-button
                type="text"
                size="mini">
                编辑
            </el-button>
        </span>
        </el-tree>
    </div>

</template>

<script>
  let id = 1000;

  export default {
    data() {
    //   const data = [{
    //     id: 1,
    //     label: '一级 1',
    //     children: [{
    //       id: 4,
    //       label: '二级 1-1',
    //     }]
    //   }];
      return {
        data: []
      }
    },

    methods: { 
        // 失去焦点时候编辑商品数据（排序）
        // event事件对象
        // data是整行的数据
        handleBlur(event, data){
            data = {
                ...data,
                id: data.category_id,
                sort_id: event.target.value//获取input输入框的值
            }

            // 调用编辑的接口
            this.$axios({
                url: `/admin/category/edit/${data.id}`,
                method: "POST",
                data,
                 // 处理跨域请求的参数
                withCredentials: true
            }).then(res => {
                const {message} = res.data;

                this.$message({
                    message,
                    type: "success"
                })
            })
        }
    },

    mounted(){
        // 获取分类的数据
        // 请求分类数据
        this.$axios({
            url: "/admin/category/getlist/goods"
        }).then(res => {
            // message是分类的数据
            const {message} = res.data;

            // 简单的列表展示
            // this.data = message;

            // 判断是否有子选项的分类


            // 使用递归的方式实现-----------------------------------------------
            let arr = [];

            // 递归函数，循环判断是否有子选项
            function loop(arr,item){
                // 循环当前数组
                arr.forEach(v => {
                    // 当子选项的parent_id和arr中某个栏目的category_id相等的话，
                    // 就认为是他的子选项
                    if(v.category_id == item.parent_id){
                        // 是否有children
                        if(!v.children){
                            v.children = [];
                        }

                        v.children.push(item);
                        return;
                    }
                    // 如果上面的循环找不到父元素，并且当前的元素还有子选项，继续往选项中查找
                    if(v.children){
                        loop(v.children, item);
                    }
                });
            }

            message.forEach(v => {
                // 是否是顶级
                if(v.parent_id === 0){
                    // 如果是顶级栏目，直接把栏目添加到arr第一层
                    arr.push(v)
                }else{
                    // 如果不是顶级，交给递归函数去判断是哪一个栏目的子选项
                    loop(arr, v);
                }
            })
            this.data = arr;

            console.log(arr)
            // ---------------------------------------------------------------
        });

    }
  };
</script>
<style lang="less" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .input{
        width:42px;
        height:18px;
        line-height:18px;
  }
</style>

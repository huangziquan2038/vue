<template>
  
  <div>
    <!-- 列表顶部 -->
    <el-row type="flex" justify="space-between" align="middle" class="tooltip">
      <el-col>
        <!-- //点击跳转到新增页面 -->
        <el-button @click="$router.push(`/admin/goods-add`)">新增</el-button>
        <el-button @click="handleMoreDelete">删除</el-button>
      </el-col>
      <!-- 区分 v-model 双向修改数据  v-bink 可简写 ： 修改src   事件简写@ -->
        <el-input placeholder="请输入内容" class="input-with-select" v-model="searchValue">
          <!-- 点击搜索 -->
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
    </el-row>
     <!-- 商品的列表 -->
        <!-- data：date ，name，address 是一个数组，表格的数据 -->
      <el-table
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange">
      <!-- 允许多选 -->
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="标题" width="250">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl" class="goods-img" />
            <p>{{scope.row.title}}</p>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column prop="categoryname" label="类型" width="180"></el-table-column>

      <el-table-column prop="market_price" label="价格" width="180"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>

          <!-- scope.row是单前行的数据 -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- size-change: 修改条数触发 -->
        <!-- current-change: 切换到当前页的事件  -->
        <!-- current-page：默认当前的页数 -->
        <!-- page-sizes条数选择的下拉数据 -->
        <!-- page-size：默认条数 -->
        <!-- layout是布局 -->
        <!-- total 表示总条数 -->
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[2, 4, 8, 16]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
        </el-pagination>

  </div>
</template>

<script>
export default {
    data() {
      return {
        tableData: [],
        ids: [],

        // 默认条数
        pageSize: 4,
        // 当前的页面
        pageIndex: 1,
        // 总条数
        totalCount: 0,
        // 输入框的值
        searchValue: ""
      }
    },

    methods: {
        // 修改条数的事件，val是条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
        },

        // 当前页的事件，val当前是多少页
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.getList();
        },

        // 点击搜索按钮时候触发
        handleSearch(){
           this.getList();
        },

        // 多选选择时候触发
        handleSelectionChange(val) {
            var ids = val.map(v => {
                return v.id
            });
            // 提供删除多个时候的接口参数
            this.ids = ids;
        },

        // 获取列表的数据
        getList(){
            // 请求商品列表数据
            this.$axios({
                url: `/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`
            }).then(res => {
                const {message, totalcount} = res.data;
                this.tableData = message;
                // 赋值给总条数
                this.totalCount = totalcount;
            });
        },

        // row当前行的数据，是一个对象
        handleEdit(row) {
            this.$router.push(`/admin/goods-edit/${row.id}`);
        },
        
        // 删除单行数据
        handleDelete(row) {
            // 获取到id
            const id = row.id

            // 询问是否删除
            this.$confirm('是否删除').then(() => {
                // 确定按钮触发
                //调用删除接口
                this.$axios({
                    url: `/admin/goods/del/${id}`,
                    // 处理跨域请求的参数
                    withCredentials: true
                }).then(res => {
                    const { message} = res.data;
                    // 删除成功后的提示
                    this.$message({
                        type: "success",
                        message
                    });
                    // 刷新数据列表
                    this.getList();
                })
            })
        },

        // 删除多个
        handleMoreDelete(){

           const id = this.ids.join(",");

            // 询问是否删除
            this.$confirm('是否删除').then(() => {
                // 确定按钮触发
                //调用删除接口
                this.$axios({
                    url: `/admin/goods/del/${id}`,
                    // 处理跨域请求的参数
                    withCredentials: true
                }).then(res => {
                    const { message} = res.data;
                    // 删除成功后的提示
                    this.$message({
                        type: "success",
                        message
                    });
                    // 刷新数据列表
                    this.getList();
                })
            })
        }
    },

    mounted(){
        this.getList();
    }
}
</script>


<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.tooltip {
  margin: 20px 0;
}

.goods-img {
  width: 64px;
  margin-right: 10px;
}
</style>
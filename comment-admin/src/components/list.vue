<!-- ******************************************
*  Author : niuzz niuzz@hotmail.com
*  Created On : Mon Apr 09 2018
******************************************* -->
<template>
  <div class="wrap clearfix">
    <el-input v-model='search' placeholder='输入留言内容' class='search'>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-table :data='tableData' border>
      <el-table-column label='提交时间' prop='createTime' width='200'></el-table-column>
      <el-table-column label='项目名称' prop='caseName' width='200'></el-table-column>
      <el-table-column label='用户名' prop='userName' width='200'></el-table-column>
      <el-table-column label='留言内容' prop='content'></el-table-column>
      <el-table-column label='操作'>
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-success" circle @click="updateStatus(scope.row, type=1)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="updateStatus(scope.row, type=0)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      tableData: [
        {
          createTime: '2018-10-11',
          caseName: 'IBM全球大会',
          userName: '小喵',
          content: '大会办的不错'
        },
        {
          createTime: '2018-10-11',
          caseName: 'IBM全球大会',
          userName: '小喵',
          content: '大会办的不错'
        },
        {
          createTime: '2018-10-11',
          caseName: 'IBM全球大会',
          userName: '小喵',
          content: '大会办的不错'
        }
      ]
    }
  },
  created () {
    this._getData(1)
  },
  methods: {
    _getData (page) {
    },
    updateStatus (row, type) {
      console.log(type)
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap {
    width: 100%;
    height: 100%;
    background: #2c3e50;
    padding-top: 60px;
    .el-table {
      margin: 20px;
    }
    .search {
      width: 200px;
      float: left;
      margin: 0 0 20px 20px;

    }
  }
  .clearfix::after {
      content: ".";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
</style>

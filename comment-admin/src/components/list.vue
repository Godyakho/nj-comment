<!-- ******************************************
*  Author : niuzz niuzz@hotmail.com
*  Created On : Mon Apr 09 2018
******************************************* -->
<template>
  <div class="wrap clearfix">
    <el-row>
      <el-col :span='3' :offset="1">
          <el-input v-model='search' placeholder='输入留言内容' class='search'>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
      </el-col>
      <el-col :span='3' :offset="1">
        <el-button type='primary' @click="$router.push('/chat')" style="float: left">chat 测试</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="1" :span='20'>
          <el-table :data='tableData' border>
          <el-table-column label='提交时间' prop='createTime' width='200'></el-table-column>
          <el-table-column label='项目名称' prop='caseName' width='200'></el-table-column>
          <el-table-column label='用户名' prop='userName' width='200'></el-table-column>
          <el-table-column label='留言内容' prop='content'></el-table-column>
          <el-table-column label='操作' width='200'>
            <template slot-scope="scope">
              <el-button type="success" icon="el-icon-success" circle @click="updateStatus(scope.row, type=1)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="updateStatus(scope.row, type=0)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
      ],
      search: ''
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
    padding-top: 60px;
    .el-row {
      margin-bottom: 20px;
    }
  }
</style>

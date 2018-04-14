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
      <el-col :span="6">
        <el-select v-model="casenameSelectVal" placeholder="请选择项目大会">
          <el-option
            v-for="item in casenameSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span='3' :offset="1">
        <el-button type='primary' @click="$router.push('/chat')" style="float: left">chat 测试</el-button>
      </el-col>
       <el-col :span='3' :offset="1">
        <el-button type='primary' @click="caseBox = true" style="float: left">添加活动</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :offset="1" :span='20'>
          <el-table :data='tableData' border>
          <el-table-column label='提交时间' prop='createtime' width='200'></el-table-column>
          <el-table-column label='项目名称' prop='casename' width='200'></el-table-column>
          <el-table-column label='用户名' prop='username' width='200'></el-table-column>
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

    <el-dialog title="添加活动" :visible.sync="caseBox" width="30%" center>
      <el-input v-model="caseVal" placeholder="请输入活动名称"></el-input>
       <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="MeetAdd">确定</el-button>
      <el-button type="" @click="caseBox=false">取消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
import { CreateCase, GetComment, GetCase } from '@/api/request'

export default {
  data () {
    return {
      caseBox: false,
      caseVal: '',
      casenameSelectVal: '',
      tableData: [
        // {
        //   createTime: '2018-10-11',
        //   caseName: 'IBM全球大会',
        //   userName: '小喵',
        //   content: '大会办的不错'
        // }
      ],
      search: '',
      casenameSelect: [
        {
          label: 'IBM大会',
          value: 'IBM大会'
        }
      ]
    }
  },
  created () {
    this._getData()
    this._getCase()
  },
  methods: {
    MeetAdd () {
      let msg = {
        casename: this.caseVal
      }
      if (!this.caseVal) {
        alert('输入内容')
      } else {
        CreateCase(msg).then(res => {
          if (res.data.code === 1000) {
            console.log(res)
            this.caseBox = false
          } else {
            console.log(res)
          }
        })
      }
    },
    _getCase () {
      GetCase().then(res => {
        console.log('获取活动', res)
      })
    },
    _getData (page) {
      GetComment().then(res => {
        if (res.data.code === 1000) {
          console.log(res.data.data.list)
          this.tableData = res.data.data.list
        } else {
          console.log('暂无评论', res)
        }
      })
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

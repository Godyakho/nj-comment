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
        <el-select v-model="casenameSelectVal" @change="_getCase (casenameSelectVal)" placeholder="请选择项目大会">
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
    <el-pagination background :current-page.sync="currentPage" :page-size="10" @current-change="handelPageChange" layout="prev, pager, next,total" :total="sum"></el-pagination>
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
import { CreateCase, GetComment, GetCase, UpdateComment } from '@/api/request'

export default {
  data () {
    return {
      sum: 0,
      currentPage: 0,
      caseBox: false,
      caseVal: '',
      casenameSelectVal: '',
      tableData: [],
      search: '',
      casenameSelect: [],
      nowcid: 2
    }
  },
  created () {
    GetCase().then(res => {
      this.casenameSelectVal = res.data.data[0].value
      this.casenameSelect = res.data.data
      this._getData()
    })
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
            GetCase().then(res => {
              this.casenameSelect = res.data.data
            })
            this.caseBox = false
          } else {
            alert(res)
          }
        })
      }
    },
    _getCase (casename) {
      let msg = {
        casename: casename
      }
      GetCase(msg).then(res => {
        this.currentPage = 1
        this.nowcid = res.data.data.id
        var Dmsg = {
          cid: this.nowcid
        }
        this._getData(Dmsg)
      })
    },
    _getData (msg) {
      GetComment(msg).then(res => {
        if (res.data.code === 1000) {
          console.log('获取评论', res)
          this.tableData = res.data.data.list
          this.sum = res.data.data.sum
        } else {
          this.tableData = []
          console.log('暂无评论', res)
          this.sum = 0
        }
      })
    },
    updateStatus (row, type) {
      let msg = {
        comid: row.id,
        status: type
      }
      UpdateComment(msg).then(res => {
        if (res.data.code === 1000) {
          this.$socket.emit('chat', [row.username, row.content, row.casename])
          var newdata = {
            cid: this.nowcid,
            page: this.currentPage
          }
          GetComment(newdata).then(res => {
            if (res.data.code === 1000) {
              console.log('获取评论', res)
              this.tableData = res.data.data.list
              this.sum = res.data.data.sum
            } else {
              if (this.currentPage - 1 > 0) {
                this._getData({
                  cid: this.nowcid,
                  page: this.currentPage - 1
                })
              } else {
                this.tableData = []
                console.log('暂无评论', res)
                this.sum = 0
              }
            }
          })
          console.log('更改成功', res)
        } else {
          console.log('更改失败', res)
        }
      })
    },
    handelPageChange (val) {
      this.currentPage = val
      let msg = {
        cid: this.nowcid,
        page: val
      }
      this._getData(msg)
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

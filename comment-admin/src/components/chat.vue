<!-- ******************************************
*  Author : niuzz niuzz@hotmail.com
*  Created On : Wed Apr 11 2018
******************************************* -->
<template>
  <div class="wrap">
    <el-row>
      <el-col :span='10'>
        <el-input v-model='text' placeholder='请输入'>
          <el-button type='primary' icon="el-icon-success" slot="append" @click="send">
            发送消息
          </el-button>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">

import { CreateComment, CreateUser } from '@/api/request'

export default {
  data () {
    return {
      username: '',
      casename: 'IBM大会',
      text: ''
    }
  },
  methods: {
    send () {
      const msg = {
        username: this.username,
        casename: this.casename,
        content: this.text
      }
      CreateComment(msg).then(res => {
        if (res.data.code === 1000) {
          console.log('发送评论', res)
        } else {
          console.log('发送评论失败', res)
        }
      })
      // this.$socket.emit('chat', msg)
    }
  },
  created: function () {
    this.username = '游客' + Math.floor(Math.random() * 100000)
    let msg = {
      username: this.username,
      casename: this.casename
    }
    CreateUser(msg).then(res => {
      if (res.data.code === 1000) {
        console.log('添加用户', res)
      }
    })
    this.$options.sockets.chat = (data) => {
      console.log('组件监听', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  margin-top: 60px;
}
</style>

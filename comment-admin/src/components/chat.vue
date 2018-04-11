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
export default {
  data () {
    return {
      text: ''
    }
  },
  methods: {
    send () {
      const msg = {
        username: '大碴子',
        casename: 'IBM全球大会0410',
        content: this.text
      }
      this.$socket.emit('chat', msg)
    }
  },
  created: function () {
    this.$options.sockets.chat = (data) => {
      console.log('组件监听', data)
      // const tmpData = {
      // ...data.user,
      // msg: data.msg,
      // time: data.time
      // }
      // this.$data.list.push(tmpData)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  margin-top: 60px;
}
</style>

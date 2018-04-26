<!-- ******************************************
*  Author : niuzz niuzz@hotmail.com
*  Created On : Wed Apr 11 2018
******************************************* -->
<template>
  <div class="wrap">
    <div>{{casename}},{{username}}</div>
    <div class="chatctn"></div>
    <div class="chatinput">
        <el-input v-model='text' placeholder='请输入'>
          <el-button  type='primary' icon="el-icon-success" slot="append" @click="send">
            发送消息
          </el-button>
        </el-input>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { CreateComment, CreateUser, GetComment } from '@/api/request'

export default {
  data () {
    return {
      username: '',
      casename: '大渣子',
      nowcid: 16,
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
      if (this.text === '') {
        alert('请输入内容')
        return
      }
      CreateComment(msg).then(res => {
        if (res.data.code === 1000) {
          alert('发送成功')
          this.text = ''
          console.log('发送评论', res)
        } else {
          console.log('发送评论失败', res)
        }
      })
    },
    getChatRecord (msg) {
      GetComment(msg).then(res => {
        if (res.data.code === 1000) {
          res.data.data.list.forEach(item => {
            if (
              item.casename === this.casename &&
              item.username === this.username
            ) {
              var line1 = document.createElement('div')
              line1.style = 'width: 100%;float: right'
              var nick1 = document.createElement('p')
              nick1.style =
                'text-align: right;word-wrap: break-word;color: green;'
              nick1.innerHTML = item.casename + ':'
              var ctn1 = document.createElement('p')
              ctn1.style =
                'text-align: right; word-wrap: break-word; width: 100%;text-indent:2rem'
              ctn1.innerHTML = item.content
              line1.appendChild(nick1)
              line1.appendChild(ctn1)
              document.getElementsByClassName('chatctn')[0].appendChild(line1)
            } else {
              var line2 = document.createElement('div')
              line2.style = 'width: 100%;float: right'
              var nick2 = document.createElement('p')
              nick2.style = 'text-align: left;word-wrap: break-word;color: red;'
              nick2.innerHTML = item.username + ':'
              var ctn2 = document.createElement('p')
              ctn2.style =
                'text-align: left; word-wrap: break-word; width: 100%;text-indent:2rem'
              ctn2.innerHTML = item.content
              line2.appendChild(nick2)
              line2.appendChild(ctn2)
              document.getElementsByClassName('chatctn')[0].appendChild(line2)
            }
            document.getElementsByClassName('chatctn')[0].scrollTop = 10000
          })
        }
      })
    }
  },
  created () {
    this.$options.sockets.res = res => {
      console.log('组件监听', res)
      if (res[2] === this.casename && res[0] === this.username) {
        var line1 = document.createElement('div')
        line1.style = 'width: 100%;float: right'
        var nick1 = document.createElement('p')
        nick1.style = 'text-align: right;word-wrap: break-word;color: green;'
        nick1.innerHTML = res[0] + ':'
        var ctn1 = document.createElement('p')
        ctn1.style =
          'text-align: right; word-wrap: break-word; width: 100%;text-indent:2rem'
        ctn1.innerHTML = res[1]
        line1.appendChild(nick1)
        line1.appendChild(ctn1)
        document.getElementsByClassName('chatctn')[0].appendChild(line1)
      } else {
        var line2 = document.createElement('div')
        line2.style = 'width: 100%;float: right'
        var nick2 = document.createElement('p')
        nick2.style = 'text-align: left;word-wrap: break-word;color: red;'
        nick2.innerHTML = res[0] + ':'
        var ctn2 = document.createElement('p')
        ctn2.style =
          'text-align: left; word-wrap: break-word; width: 100%;text-indent:2rem'
        ctn2.innerHTML = res[1]
        line2.appendChild(nick2)
        line2.appendChild(ctn2)
        document.getElementsByClassName('chatctn')[0].appendChild(line2)
      }
    }
    if (!sessionStorage.getItem('username')) {
      this.username = '游客' + Math.floor(Math.random() * 100000)
      let msg = {
        username: this.username,
        casename: this.casename
      }
      CreateUser(msg).then(res => {
        if (res.data.code === 1000) {
          console.log('添加用户', res)
          sessionStorage.setItem('username', res.data.data.user.username)
        }
      })
    } else {
      this.username = sessionStorage.getItem('username')
    }
    let RecordMsg = {
      cid: this.nowcid,
      status: 1,
      limit: 10000
    }
    this.getChatRecord(RecordMsg)
  }
}
</script>

<style  scoped>
.wrap {
  width: 80%;
  margin: 0 auto;
  margin-top: 60px;
}
.chatctn {
  margin: 20px auto;
  width: 50%;
  height: 400px;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: scroll;
}
.chatinput {
  width: 50%;
  margin: 0 auto;
}
.line1 {
  width: 100%;
  float: left;
}
.line2 {
  width: 100%;
  float: right;
}
.nickname1 {
  text-align: left;
  word-wrap: break-word;
  color: red;
}
.nickname2 {
  text-align: right;
  word-wrap: break-word;
  color: green;
}
.ctn1 {
  text-align: left;
  word-wrap: break-word;
  width: 100%;
}
.ctn2 {
  text-align: right;
  word-wrap: break-word;
  width: 100%;
}
.fl {
  text-align: left;
  float: left;
}
</style>

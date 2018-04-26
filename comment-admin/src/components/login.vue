<!-- ******************************************
*  Author : niuzz niuzz@hotmail.com
*  Created On : Mon Apr 09 2018
******************************************* -->
<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-input v-model='username' placeholder='请输入用户名'></el-input>
      <el-input v-model='password' placeholder='请输入密码' type='password'></el-input>
      <el-button type='primary' @click="submit">确定</el-button>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submit () {
      if (this.username === 'yh' && this.password === '1') {
        sessionStorage.setItem('login', true)
        this.$router.push('/list')
      } else {
        this.$message({
          message: '用户名或密码错',
          type: 'error'
        })
      }
    }
  },
  created () {
    sessionStorage.removeItem('login')
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 60px;
  background: #2c3e50;
  height: 100%;
  width: 100%;
}
.box-card {
  width: 400px;
  margin: auto;
  .el-input {
    margin-bottom: 20px;
  }
}

</style>

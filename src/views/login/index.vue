<template>
  <div class="login-container">
    <section class="form-container">
      <h3 class="title">ura admin</h3>
      <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <el-form-item prop="username">
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            v-model="loginForm.password"
            placeholder="密码"
            @keyup.enter.native="handleLogin" />
        </el-form-item>

        <el-form-item prop="captcha" class="captcha">
          <el-input
            name="captcha"
            v-model="loginForm.captcha"
            placeholder="验证码"
            @keyup.enter.native="handleLogin" />
          <span class='captcha-code'><img class="image" @click="getCaptcha()" :src="capchatSource" /></span>
        </el-form-item>

        <el-button type="primary" class="login-btn" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
      </el-form>
    </section>
  </div>
</template>

<script>
import SystemAPI from '@/api/system'
export default {
  name: 'login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        captcha: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      pwdType: 'password',
      loading: false,
      capchatSource: ''
    }
  },
  created: function () {
    this.getCaptcha()
  },
  methods: {
    showPwd () {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
    },
    getCaptcha () {
      this.capchatSource = SystemAPI.getCaptcha()
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('loginByUsername', this.loginForm).then((response) => {
            this.loading = false
            if (response.code !== 0) {
              this.$notify({
                message: response.msg || '登录失败',
                type: 'error'
              })
              this.getCaptcha()
              this.$router.push({path: '/login'})
            } else {
              this.$router.push({path: '/'})
            }
          }).catch((err) => {
            console.error(err)
            this.getCaptcha()
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  $white: #fff;

  .login-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: $bg;
    overflow: hidden;

    input:-webkit-autofill {
      box-shadow: 0 0 0 1000px #fff inset !important;
      -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
    }
    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      color: $light-gray;
    }

    .form-container{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-60%);
      min-width: 440px;

      .title {
        font-size: 44px;
        color: $white;
        margin: 0 auto 8% auto;
        text-align: center;
        font-weight: bold;
        text-shadow: 0 1px 18px rgba(0,51,153,0.4);
      }
    }

    .login-form {
      background-color: #fff;
      padding: 10% 8%;
      border-radius: 3px;

      .el-form-item {
        width: 360px;
        margin-bottom: 30px;
        background-color: transparent;
      }
      .el-form-item__content{
        line-height: 40px;
        background-color: transparent;
      }

      .el-input {
        display: inline-block;
        height: 40px;
      }
      .el-input .el-input__inner{
        border: 1px solid #EBEBEB;
        border-radius: 4px;
        color: #999;
        font-weight: bold;
        // box-shadow: inset 0 0 3px 0 rgba(0,0,0,0.2);
      }
      .el-input .el-input__inner:focus{
        border-color: #20a0ff;
      }
      .captcha .el-input{
        width: 80%;
      }
      .captcha .captcha-code{
        width: 20%;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
      }
      .captcha .captcha-code .image{
        display: block;
        width: 100%;
        height: 100%;
      }
      .login-btn{
        width: 100%;
      }
      .el-button{
        padding: 12px 15px;
      }
      .el-button span{
        font-family: 'microsoft yahei';
        font-size: 14px;
        font-weight: bold;
      }
      .el-button--primary{
        background-color: #006AE2;
        border-color: #006AE2;
      }
    }
  }
</style>

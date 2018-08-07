<template>
  <div class="login-container">
    <section class="form-container">
      <h3 class="title">{{title}}</h3>
      <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">

        <el-form-item prop="loginType">
          <el-radio v-model="loginForm.loginType" label="5">登录名</el-radio>
        </el-form-item>

        <el-form-item prop="loginName" v-show="loginForm.loginType == 5">
          <el-input name="loginName" type="text" v-model="loginForm.loginName" autoComplete="on" placeholder="登录名" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                    placeholder="密码" />
        </el-form-item>

        <el-form-item prop="verifyCode" class="verify">
          <el-input name="verifyCode"  @keyup.enter.native="handleLogin" v-model="loginForm.verifyCode" autoComplete="on"
                    placeholder="验证码" />
          <span class='verify-code'><img @click="fetchVerifyCode()" :src="verifyCodeImage" /></span>
        </el-form-item>

        <el-button type="primary" style="width: 320px;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
      </el-form>
    </section>
  </div>
</template>

<script>
// import { SYSTEM_PLATFORM_CONFIG } from '@/common/constants'
// import * as verificationService from '@/api/common/verification'

export default {
  name: 'login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (this.loginForm.loginType === 2) {
        if (!value) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validateLoginName = (rule, value, callback) => {
      if (this.loginForm.loginType === 5) {
        if (!value) {
          alert(this.loginForm.loginType)
          callback(new Error('请输入正确的登录名'))
        } else {
          callback()
        }
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
      backdrop: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginTop: '0'
      },
      loginForm: {
        username: '',
        password: '',
        verifyCode: '',
        loginName: '',
        loginType: '5'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        loginName: [{ required: true, trigger: 'blur', validator: validateLoginName }]
      },
      title: 'platform',
      images: '',
      system: 0,
      pwdType: 'password',
      loading: false,
      verifyCodeImage: ''
    }
  },
  created: function () {
    this.verifyCodeImage = this.fetchVerifyCode()
  },
  watch: {
    'loginForm.loginType' (val) {
      this.loginForm.password = ''
    }
  },
  computed: {
    'systemId' () {
      this.system = this.$route.query.sid || 0
      return this.system
    }
  },
  methods: {
    showPwd () {
      this.pwdType = this.pwdType === 'password' ? '' : 'password'
    },
    fetchVerifyCode () {
      const _this = this
      // verificationService.fetchVerifyCode().then(response => {
      //   const result = response.data.data
      //   _this.verifyCodeImage = result.verifyImage
      // })
    },
    handleLogin () {
      const _this = this
      var loginMethod = 'LoginByUsername'
      if (_this.loginForm.loginType === '5') {
        loginMethod = 'LoginByLoginName'
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch(loginMethod, this.loginForm).then((response) => {
            this.loading = false
            if (response.code !== 0) {
              this.$notify({
                message: response.msg || '登录失败',
                type: 'error'
              })
              this.fetchVerifyCode()
              this.$router.push({path: '/login'})
            } else {
              let routePath = SYSTEM_PLATFORM_CONFIG.home[this.system] || '/'
              this.$router.push({path: routePath})
            }
          }).catch((err) => {
            this.loading = false
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "~compass-mixins";
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
      -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
    }
    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      /*padding: 12px 5px 12px 15px;*/
      color: $light-gray;
      /*height: 40px;*/
    }

    .form-container{
      position: absolute;
      left: 0;
      right: 0;
      margin: 8% auto;
      width: 400px;

      .title {
        font-size: 44px;
        color: $white;
        margin: 0 auto 60px auto;
        text-align: center;
        font-weight: bold;
        text-shadow: 0 1px 18px rgba(0,51,153,0.4);
      }
    }

    .login-form {
      background-color: #fff;
      padding: 60px 48px 46px;
      border-radius: 3px;
      @include box-shadow(0 16px 59px 0 rgba(14,102,164,0.46));

      .el-form-item {
        width: 320px;
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
        box-shadow: inset 0 0 3px 0 rgba(0,0,0,0.2);
      }
      .el-input .el-input__inner:focus{
        border-color: #20a0ff;
      }
      .verify .el-input{
        width: 82%;
      }
      .verify .verify-code{
        width: 18%;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
      }
      .verify .verify-code .image{
        display: block;
        width: 100%;
        height: 100%;
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

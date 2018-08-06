<template>
  <nav class="navbar navbar-static-top">
    <!-- Sidebar toggle button-->
    <div class="navbar-custom-menu">
      <el-dropdown trigger="click" class="uv-user-menu" @command="handleCommand">
        <el-button type="primary" class="uv-menu-btn">
          <div class="user uv-user-menu">
            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
              <img v-if="avatar" :src="avatar" class="user-image" alt="User Image">
              <span class="hidden-xs">{{name}}</span>
            </a>
          </div>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personalDetail">个人详情</el-dropdown-item>
          <el-dropdown-item command="personalDetail">重设密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="navbar-label"></div>
  </nav>
</template>

<script>
  export default {
    data () {
      return {
        avatar: '',
        name: 'admin'
      }
    },
    computed: {

    },
    mounted () {

    },
    methods: {
      handleCommand (command) {
      }
    }
  }
</script>

<template>
  <div class="tabs-container app-main">
    <el-tabs
      class="tabs-wrapper"
      v-model="tabActiveName"
      @tab-click="selectedTabHandler">
      <el-tab-pane
        v-for="(tab, index) in tabsNavList"
        :key="tab.name"
        :name="tab.name">
        <el-tag
          slot="label"
          :closable="isTabClosable(tab.name)"
          type="info"
          @close.prevent="closeTabsActive(tab.name)">
          <i :class="{'info': tab.name === tabActiveName, 'dot': true}"></i>
          {{tab.title}}
        </el-tag>
        <article :style="contentViewStyles(tab)" class="tabs-container-content">
          <iframe
            v-if="tab.type === 'iframe'"
            :src="tab.path"
            width="100%" height="100%" frameborder="0" scrolling="yes">
          </iframe>
          <keep-alive v-else>
            <router-view v-if="tab.name === tabActiveName" :key="$route.fullPath"></router-view>
          </keep-alive>
        </article>
      </el-tab-pane>

      <el-dropdown class="tab-tools" @command="toolsCommandHandler" :show-timeout="0" trigger="click">
        <el-button type="primary">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="closeTabsActive">关闭当前标签页</el-dropdown-item>
          <el-dropdown-item command="closeTabsLeft">关闭左边标签页</el-dropdown-item>
          <el-dropdown-item command="closeTabsRight">关闭右边标签页</el-dropdown-item>
          <el-dropdown-item command="closeTabsOther">关闭其他标签页</el-dropdown-item>
          <el-dropdown-item command="clearTabs">关闭全部标签页</el-dropdown-item>
          <el-dropdown-item command="refreshTabsActive">刷新当前标签页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import isEmpty from 'lodash/isEmpty'
export default {
  name: 'TabsView',
  data () {
    return {
      defaultQuery: {
        conf: {
          isMultiTab: false,
          tabName: '',
          seriesNo: Date.now() + Math.ceil((Math.random() * 1000))
        }
      }
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters([
      'documentClientHeight',
      'tabsNavList',
      'tabsActiveName'
    ]),
    tabActiveName: {
      get () {
        return this.tabsActiveName
      },
      set (name) {
        this.$store.dispatch('updateTabsActiveName', name)
      }
    }
  },
  methods: {
    contentViewStyles (tab) {
      let height = this.documentClientHeight
      height -= 50 // content-wrapper：navbar
      height -= 50 // content-wrapper：el-tabs__header
      height += 'px'
      return [
        tab.type === 'iframe' ? { height } : { minHeight: height, height }
      ]
    },
    isTabActive (tabName) {
      return tabName === this.$route.name
    },
    isTabClosable (tabName) {
      return tabName !== 'dashboard'
    },
    toolsCommandHandler (command) {
      const commander = {
        'closeTabsActive': this.closeTabsActive,
        'closeTabsLeft': this.closeTabsLeft,
        'closeTabsRight': this.closeTabsRight,
        'closeTabsOther': this.closeTabsOther,
        'clearTabs': this.clearTabs,
        'refreshTabsActive': this.refreshTabsActive
      }
      commander[command].call(this)
    },
    closeTabsActive (v) {
      let tabName = v || this.tabActiveName
      this.$store.dispatch('delTabsNavList', tabName).then((tabs) => {
        if (this.isTabActive(tabName)) {
          const latestView = tabs.slice(-1)[0]
          latestView && this.$router.push({name: latestView.name, query: latestView.query ? latestView.query : {}}, () => {
            this.tabActiveName = this.$route.name
          })
        }
      })
    },
    closeTabsLeft (v = this.tabActiveName) {
      this.$store.dispatch('closeLeftTabsNavList', v)
    },
    closeTabsRight (v = this.tabActiveName) {
      this.$store.dispatch('closeRightTabsNavList', v)
    },
    closeTabsOther (v = this.tabActiveName) {
      this.$store.dispatch('closeOtherTabsNavList', v)
    },
    refreshTabsActive () {
      const tempTabName = this.tabActiveName
      this.closeTabsActive(tempTabName)
      this.$nextTick(() => {
        this.$router.push({name: tempTabName})
      })
    },
    clearTabs () {
      this.$confirm('是否关闭全部?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('clearTabsNavList')
        this.$router.push({name: 'dashboard'})
      }).catch(() => {
      })
    },
    selectedTabHandler (tab) {
      tab = this.tabsNavList.find(item => item.name === tab.name)
      if (!isEmpty(tab)) {
        this.$router.push({name: tab.name, query: tab.query ? tab.query : {}})
      }
    }
  },
  watch: {
    tabsNavList (tabs) {
      if (tabs.length <= 0) {
        this.$store.dispatch('updateTabsActiveName', '')
        this.$router.push({ name: 'dashboard' })
      }
    }
  }
}
</script>

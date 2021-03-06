<template>
  <div class="menu-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="菜单名称" v-model="listQuery.name"></el-input>

      <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" icon="plus" @click="createOrUpdateHandle()">新增</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
    </div>
    <table-tree
      class="area-code-container"
      :listLoading="listLoading"
      :columns="columns"
      :tree-structure="true"
      :data-source="dataSource"
      @create="createOrUpdateHandle()"
      @update="createOrUpdateHandle"
      @delete="handleDelete"
      @switchChange="handleSwitch"
    ></table-tree>

    <add-or-update v-if="dialogVisible" ref="addOrUpdate" @table-refresh="getList"></add-or-update>
  </div>
</template>

<style lang="scss" scoped>
  .menu-container{
    padding: 10px;
    .filter-container{
      .el-button{
        margin-left: 10px;
      }
    }
    .area-code-container{
      width: 100%;
      margin-top: 10px;
    }

    .dropdown-tree-container .selected-box .el-tag {
      padding-left: 10px;
      height: 25px;
      line-height: 25px;
    }
  }
  .system-menu-wrapper {
    .menu-item__width{
      display: inline-block;
      width: 52%;
    }
    .el-input{
      width:52%;
    }
    .menu-item__width.font-icons-list.has-icon{
      width: 48%;
    }
    .menu-item__width.font-icons-list .el-input{
      width: 100%;
    }
    .menu-tips {
      margin-left: 20px;
      color: #999;
      position: absolute
    }
  }
</style>

<script>
  /* eslint-disable no-debugger */
  import SysMenuAPI from '@/api/menu'
  import Storage from '@/common/cache'
  import TableTree from '@/components/table-tree/TableTree'
  import AddOrUpdate from './save-or-update'
  import {treeDataTranslate} from '@/common'

  const rootMenu = 'root'
  export default {
    data () {
      return {
        listLoading: true,
        dialogVisible: false,
        listQuery: {
          name: undefined,
          code: undefined
        },
        menuModel: {
          id: undefined,
          type: '1',
          path: '',
          parentId: null,
          parentName: '',
          permissionId: '',
          isShow: 1,
          icon: '',
          image: '',
          sortOrder: 0,
          level: 0
        },
        columns: [
          {
            text: '菜单名称',
            width: '230px',
            align: 'left',
            dataIndex: 'name'
          },
          {
            text: '层级',
            dataIndex: 'level'
          },
          {
            text: '菜单类型',
            display: 'hide',
            dataIndex: 'type'
          },
          {
            text: '访问路径',
            align: 'left',
            style: 'link-type',
            dataIndex: 'url'
          },
          {
            text: '菜单图标',
            mode: 'icon',
            dataIndex: 'icon'
          },
          {
            text: '附加属性',
            display: 'hide',
            dataIndex: 'meta'
          },
          {
            text: '父级名称',
            dataIndex: 'parentName',
            formatter (parentName) {
              return parentName || rootMenu
            }
          },
          {
            text: '权限标识',
            display: 'hide',
            dataIndex: 'permissionId'
          },
          {
            text: '排序',
            dataIndex: 'orders'
          },
          {
            text: '显示',
            mode: 'switcher',
            dataIndex: 'status'
          }
        ],
        dataSource: []
      }
    },
    components: {
      TableTree,
      AddOrUpdate
    },
    computed: {
      isFolderMenu () {
        return this.menuModel.type === '0'
      }
    },
    watch: {
    },
    created () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        this.listLoading = true
        SysMenuAPI.list(Storage.get('uid'), this.listQuery.name).then(response => {
          if (response.code === 0) {
            this.dataSource = treeDataTranslate(response.data.menus, 'menuId')
          } else {
            this.$message({
              type: 'error',
              message: response.msg || '获取失败'
            })
          }
          this.listLoading = false
        }).catch((err) => {
          this.$message({
              type: 'error',
              message: err.message || '程序出错'
            })
          this.listLoading = false
        })
      },
      // 查询
      handleFilter () {
        this.getList()
      },
      // 根据节点ID删除节点
      delNodeById (dataSource, nId) {
        dataSource.forEach((node, index) => {
          if (node.id === nId) {
            dataSource.splice(index, 1)
            return false
          } else if (node.children && node.children.length > 0) {
            this.delNodeById(node.children, nId)
          }
        })
      },
      resetMenuModel () {
        this.menuModel = {
          id: undefined,
          type: '0',
          path: '',
          parentId: null,
          parentName: '',
          permissionId: '',
          isShow: 1,
          icon: '',
          image: '',
          sortOrder: 0,
          level: 1
        }
      },
      // 重置查询列表
      resetListQuery () {
        this.listQuery = {
          name: undefined,
          code: undefined
        }
      },
      createOrUpdateHandle (row) {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs['addOrUpdate'].init(row && row.menuId)
        })
      },
      handleSwitch () {

      },
      // 点击刷新
      handleRefresh () {
        this.resetListQuery()
        this.getList()
      },
      // 点击删除按钮
      handleDelete (row) {
        this.$confirm('即将删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.remove(row.id).then((response) => {
            if (response.code === 0) {
              this.delNodeById(this.dataSource, row.id)
              this.$message({
                type: 'success',
                message: response.data.msg || '删除成功!'
              })
              this.updateMenu()
            } else {
              this.$message({
                type: 'error',
                message: response.data.msg || '删除失败'
              })
            }
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 删除业务操作
      remove (id) {
        return SysMenuAPI.deleteMenu(id)
      },
      updateMenu () {
        this.$store.dispatch('generateSidebarMenu')
      },
      dialogClosed () {
        this.resetMenuModel()
      }
    }
  }
</script>

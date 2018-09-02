<template>
  <div class="menu-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="菜单名称" v-model="listQuery.name"></el-input>

      <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" icon="plus" @click="handleCreate(null, 'root')">新增</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
      <!--<el-checkbox-group v-model="tableHeader">-->
        <!--<el-checkbox label="menuCode">菜单编码</el-checkbox>-->
        <!--<el-checkbox label="permissionCode">权限编码</el-checkbox>-->
        <!--<el-checkbox label="meta">附加属性</el-checkbox>-->
      <!--</el-checkbox-group>-->
    </div>
    <table-tree
      class="area-code-container"
      :listLoading="listLoading"
      :columns="columns"
      :tree-structure="true"
      :data-source="dataSource"
      @create="handleCreate"
      @update="handleUpdate"
      @delete="handleDelete"
      @switchChange="handleSwitch"
    ></table-tree>

    <el-dialog top="10%" :title="dialogTitleMap[dialogStatus]" drag :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="dialogClosed">
      <el-form class="system-menu-wrapper"  ref="menuForm" :model="menuModel" label-width="90px" style='margin-left:50px;'>
        <el-form-item label="菜单类型" prop="type" :rules="{required: true, message: '选择菜单类型', trigger: 'blur'}">
          <el-radio-group v-model="menuModel.type" size="small" class="menu-item__width">
            <el-radio label="0" border>目录</el-radio>
            <el-radio label="1" border>菜单</el-radio>
            <el-radio label="2" border>按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name" :rules="{required: true, message: '名称不能为空', trigger: 'blur'}">
          <el-input v-model="menuModel.name" autofocus></el-input>
        </el-form-item>
        <el-form-item v-if="!isFolderMenu" label="访问路径">
          <el-input v-model="menuModel.path"></el-input>
          <span class="menu-tips">如：/system/menu.html</span>
        </el-form-item>
        <!--<el-form-item v-if="!isFolderMenu" label="访问路径" prop="path" :rules="{required: true, message: '访问路径不能为空', trigger: 'blur'}">
          <el-input v-model="menuModel.path"></el-input>
          <span class="menu-tips">菜单: /submenu | 菜单项: menuItem</span>
        </el-form-item>-->
        <!--<el-form-item label="组件路径" prop="component" :rules="{required: true, message: '组件路径不能为空', trigger: 'blur'}">
          <el-input v-model="menuModel.component"></el-input>
          <span class="menu-tips">component 组件加载路径</span>
        </el-form-item>
        <el-form-item label="重定向路径">
          <el-input v-model="menuModel.redirect"></el-input>
          <span class="menu-tips">redirect 重定向路径</span>
        </el-form-item>-->
        <!--<el-form-item label="权限编码" prop="permissionCode" :rules="{required: true, message: '权限编码不能为空', trigger: 'blur'}">-->
          <!--<el-input v-model="menuModel.permissionCode"></el-input>-->
          <!--<span class="menu-tips">若所有人可操作，则填写“all”</span>-->
        <!--</el-form-item>-->
        <el-form-item label="菜单图标">
          <el-select class="menu-item__width font-icons-list" :class="{'has-icon': menuModel.icon}" v-model="menuModel.icon" filterable placeholder="请选择">
            <el-option
              v-for="item in iconsArray"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left"><i :class="'fa fa-' + item.value"></i></span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
          <icon style="margin-left: 10px" v-if="menuModel.icon" :name="menuModel.icon"></icon>
          <span class="menu-tips">选择或搜索字体图标</span>
        </el-form-item>

        <el-form-item label="父级名称">
          <el-input v-model="menuModel.parentName" :disabled="isDisabled" v-if="isDisabled"></el-input>
          <div class="menu-item__width" v-else>
            <dropdown-tree
              :disabled="isDisabled"
              :data="parentNameList"
              :expandAll="false"
              :showCheckBox="false"
              v-model="parentNameId">
            </dropdown-tree>
          </div>
          <span class="menu-tips">顶级菜单不能修改</span>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="menuModel.sortOrder"></el-input>
        </el-form-item>
        <el-form-item label="显示">
          <el-switch v-model="menuModel.isShow" :active-value="1" :inactive-value="0" active-text="" inactive-text="" > </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
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
  import assign from 'lodash.assign'
  import SysMenuAPI from '@/api/menu'
  import Storage from '@/common/cache'
  import TableTree from '@/components/table-tree/TableTree'
  import icons from '@/assets/package/icon'

  const rootMenu = 'root'
  export default {
    data () {
      return {
        listLoading: true,
        parentNameId: [],
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
        isDisabled: false,
        isUniqueCodeDisabled: false,
        dialogFormVisible: false,
        dialogStatus: '',
        dialogTitleMap: {
          update: '编辑',
          create: '新增'
        },
        parentNameList: [],
        columns: [
          {
            text: '菜单名称',
            width: '230px',
            align: 'left',
            dataIndex: 'name'
          },
          {
            text: '层级',
//            width: '70px',
            dataIndex: 'level'
          },
          {
            text: '菜单编码',
            display: 'hide',
            dataIndex: 'menuCode'
          },
          {
            text: '访问路径',
//            width: '200px',
            align: 'left',
            style: 'link-type',
            dataIndex: 'path'
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
//            width: '70px',
            dataIndex: 'sortOrder'
          },
          {
            text: '显示',
//            width: '70px',
            mode: 'switcher',
            dataIndex: 'isShow'
          }
        ],
        treeData: [],
        permissionIdModel: [],
        tableHeader: [], // 'menuCode', 'meta', 'permissionCode'
        tableHeaderOptions: ['menuCode', 'meta', 'permissionId'],
        dataSource: []
      }
    },
    components: {
      TableTree
    },
    computed: {
      isFolderMenu () {
        return this.menuModel.type === '0'
      },
      iconsArray () {
        return icons
      }
    },
    watch: {
      tableHeader (valArr) {
        this.columns.forEach(i => {
          if (valArr.indexOf(i.dataIndex) >= 0) {
            i.display = i.display === 'hide' ? 'show' : 'hide'
            return true
          }
        })
        this.key = this.key + 1
      },
      dialogFormVisible (val) {
        if (val === false) {
          this.$refs.menuForm.resetFields()
        }
      },
      permissionIdModel (val) {
        this.menuModel.permissionId = ''
        this.permissionIdModel.forEach((item) => {
          this.menuModel.permissionId = item.id
        })
      },
      parentNameId (newNode, oldNode) {
        if (newNode && newNode.length) {
          const parentNode = newNode[0]
          if (parentNode.level) {
            this.menuModel.level = parentNode.level + 1
          }
        }
      }
    },
    created () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        this.listLoading = true
        SysMenuAPI.getSysMenuList(Storage.get('uid'), this.listQuery.name).then(response => {
          if (response.code === 0) {
            this.dataSource = response.data.menus
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
      getParentNameList () {
        if (this.parentNameList.length) return this.parentNameList
        SysMenuAPI.getParentMenuList().then(res => {
          this.parentNameList = res.data.menus
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
      // 点击刷新
      handleRefresh () {
        this.resetListQuery()
        this.getList()
      },
      // 点击新增按钮
      handleCreate (row, type) {
        this.resetMenuModel()
        if (type !== 'root') {
          this.menuModel.parentId = row.id
          this.menuModel.parentName = row.name
          this.menuModel.level = row.level + 1
          this.menuModel.sortOrder = row.children && row.children.length ? row.children.length + 1 : 1
        }
        this.isDisabled = true
        this.isUniqueCodeDisabled = false
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      // 点击修改按钮
      handleUpdate (row) {
        this.menuModel = assign({}, row)
        if (!this.menuModel.parentName) {
          this.menuModel.parentName = rootMenu
        }
        this.dialogStatus = 'update'
        this.isDisabled = row.parentId === null
        this.isUniqueCodeDisabled = true
        this.dialogFormVisible = true
      },
      handleSwitch (val, row) {
        SysMenuAPI.showMenu(row.id, val === 0 ? 0 : 1).then(response => {
          this.updateMenu()
        })
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
      // 新增业务操作
      create () {
        SysMenuAPI.createMenu(this.menuModel).then((response) => {
          if (response.code === 0) {
            this.$message({
              type: 'success',
              message: '创建成功'
            })
            this.getList()
            this.updateMenu()
          } else {
            this.$message({
              type: 'error',
              message: '创建失败'
            })
          }
          this.dialogFormVisible = false
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '服务出错'
          })
        })
      },
      // 编辑业务操作
      update () {
        this.menuModel.children = null
        this.menuModel.parent = null
        SysMenuAPI.editMenu(this.menuModel).then((response) => {
          if (response.code === 0) {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.getList()
            this.updateMenu()
          } else {
            this.$message({
              type: 'error',
              message: '编辑失败'
            })
          }
          this.dialogFormVisible = false
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '编辑失败'
          })
          window.console && console.log('[menu-update]', err)
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

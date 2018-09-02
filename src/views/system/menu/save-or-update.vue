<template>
  <el-dialog top="10%"
    :title="dialogTitleMap[dialogStatus]" drag
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
     @close="dialogClosed">
      <el-form class="system-menu-wrapper"  ref="menuForm" :model="menuModel" label-width="90px" style='margin-left:50px;'>
        <el-form-item label="菜单类型" prop="type" :rules="{required: true, message: '选择菜单类型', trigger: 'blur'}">
          <el-radio-group v-model="menuModel.type" size="small" class="menu-item__width">
            <el-radio label="0" border>目录</el-radio>
            <el-radio label="1" border>菜单</el-radio>
            <el-radio label="2" border>按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name" :rules="{required: true, message: '名称不能为空', trigger: 'blur'}">
          <el-input v-model="menuModel.name" placeholder="菜单名称或按钮名称"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentName">
          <el-popover
            ref="menuListPopover"
            placement="bottom-end"
            trigger="click">
            <el-tree
              :data="menuList"
              :props="menuListTreeProps"
              node-key="menuId"
              ref="menuListTree"
              @current-change="menuListTreeCurrentChangeHandle"
              :default-expand-all="true"
              :highlight-current="true"
              :expand-on-click-node="false">
            </el-tree>
          </el-popover>
          <el-input v-model="menuModel.parentName" v-popover:menuListPopover :readonly="true" placeholder="点击选择上级菜单" class="menu-list__input"></el-input>
        </el-form-item>
        <el-form-item v-if="!isCatalog" label="访问路径">
          <el-input v-model="menuModel.path" placeholder="菜单URL"></el-input>
          <span class="menu-tips">如：/system/menu.html</span>
        </el-form-item>
        <el-form-item v-if="!isCatalog" label="授权标识" prop="perms">
          <el-input v-model="menuModel.perms" placeholder="多个用逗号分隔, 如: user:list,user:create"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="!isButton">
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

        <el-form-item label="排序" v-if="!isButton">
          <el-input v-model="menuModel.sortOrder"></el-input>
        </el-form-item>
        <el-form-item label="显示" v-if="!isButton">
          <el-switch v-model="menuModel.isShow" :active-value="1" :inactive-value="0" active-text="" inactive-text="" > </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
  import assign from 'lodash.assign'
  import SysMenuAPI from '@/api/menu'
  import Storage from '@/common/cache'
  import icons from '@/assets/package/icon'
  export default {
    data () {
      return {
        menuModel: {
          id: undefined,
          type: '1',
          path: '',
          parentId: null,
          parentName: '',
          isShow: 1,
          icon: '',
          image: '',
          sortOrder: 0,
          level: 0
        },
        dialogFormVisible: false,
        dialogTitleMap: {
          0: '编辑',
          1: '新增'
        },
        menuList: [],
        menuListTreeProps: {
          label: 'name',
          children: 'children'
        }
      }
    },
    components: {
      TableTree
    },
    computed: {
      isCatalog () {
        return this.menuModel.type === 0
      },
      isMenu () {
        return this.menuModel.type === 1
      },
      isButton () {
        return this.menuModel.type === 2
      },
      iconsArray () {
        return icons
      },
      dialogTitle () {
        return dialogTitleMap[dialogStatus]
      }
    },
    watch: {
      dialogFormVisible (val) {
        if (val === false) {
          this.$refs.menuForm.resetFields()
        }
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
      },
      // 菜单树选中
      menuListTreeCurrentChangeHandle (data, node) {
        this.dataFmenuModelorm.parentId = data.menuId
        this.menuModel.parentName = data.name
      },
      // 菜单树设置当前选中节点
      menuListTreeSetCurrentNode () {
        this.$refs.menuListTree.setCurrentKey(this.menuModel.parentId)
        this.menuModel.parentName = (this.$refs.menuListTree.getCurrentNode() || {})['name']
      },
    }
  }
</script>

<style scoped>

</style>

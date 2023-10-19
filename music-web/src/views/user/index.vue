<template>
  <div class="app-container carBox">

    <el-card style="display: flex;">
      <span>用户名称</span>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="uname"
        clearable
        @keyup.enter.native="getUserListByInput"
        style="border: 1px solid skyblue;border-radius: 5px;width: 300px;margin-left: 10px;">
      </el-input>
    </el-card>

    <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="50">
      </el-table-column>
      <el-table-column
        label="头像"
        width="100">
        <template scope="scope">
          <el-image :src="scope.row.avatar"
                    style="border-radius: 50%;width: 50px;height: 50px;">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="150">
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-row>
            <el-button type="danger" icon="el-icon-delete" plain
                       @click="deleteOne(scope.row.id)"></el-button>
            <el-button type="warning"
                       v-if="scope.row.username === $store.state.user.name"
                        @click="updatePasswdDialogVisible = true">
              修改密码
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!--更新Dialog对话框-->
    <el-dialog
      title="更新"
      :visible.sync="updateDialogVisible"
      width="50%">
      <el-form :model="formData">
        <el-form-item label="id" label-width="80px">
          <el-input v-model="formData.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdate">取 消</el-button>
        <el-button type="primary" @click="confirmUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改密码对话框-->
    <el-dialog
      title="修改密码"
      :visible.sync="updatePasswdDialogVisible"
      width="50%">
      <el-form :model="updatePasswdData" :rules="updatePasswordRules" ref="updatePasswordRef">
        <el-form-item label="旧密码" label-width="80px" prop="oldPassword">
          <el-input v-model="updatePasswdData.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="80px" prop="newPassword">
          <el-input v-model="updatePasswdData.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="80px" prop="confirmPassword">
          <el-input v-model="updatePasswdData.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdatePasswd">取 消</el-button>
        <el-button type="primary" @click="confirmUpdatePasswd">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import {Message} from "element-ui";
import { modPassword, queryByName, deleteOne } from '@/api/user'

export default {
  name: "User",
  data() {
    let checkConfirmPasswd = ((rule, value, callback) => {
      if(typeof value === 'undefined' || value.trim().length === 0){
        callback(new Error("请确认密码不能为空"));
      }else if(value !== this.updatePasswdData.newPassword) {
        callback(new Error("2次密码不一致"))
      }else {
        callback()
      }
    })
    return {
      userList: [],
      uname: '',
      pageNum: 1,
      pageSize: 10,
      updateDialogVisible: false,
      formData: {},
      updatePasswdDialogVisible: false,
      updatePasswdData: {},
      updatePasswordRules: {
        oldPassword: [
          {required: true, message: '请输入旧密码', trigger: 'blur'},
        ],
        newPassword: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ],
        confirmPassword: [
          { type: 'string', validator: checkConfirmPasswd, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.$store.dispatch('user/getUserList').then(response => {
        this.userList = response.data
      })
    },
    getUserListByInput() {
      if (this.uname === '') {
        return this.getUserList()
      }
      queryByName(this.uname).then(res => {
        this.userList = res.data
      }).catch(error => {
        console.log(error)
      })
    },
    clickChange(row) {
      this.formData = row
      this.updateDialogVisible = true
      console.log(row)
    },
    cancelUpdate() {
      this.getUserList()
      this.updateDialogVisible = false
    },
    confirmUpdate() {
      // 修改请求
      this.$store.dispatch('user/updateUser', this.formData).then((response) => {
        this.$message.success(response.message)
        this.getUserList()
      }).catch(error => {
        this.$message.error(error)
      })
      this.getUserList()
      this.updateDialogVisible = false
    },
    cancelUpdatePasswd() {
      this.updatePasswdData = {}
      this.updatePasswdDialogVisible = false
    },
    confirmUpdatePasswd() {
      this.$refs["updatePasswordRef"].validate((valid) => {
        if(valid) {
          modPassword({
            username: this.$store.state.user.name,
            password: this.updatePasswdData.oldPassword,
            newpassword: this.updatePasswdData.newPassword
          }).then(res => {
            if(res.code !== 200 || res.status === 1) {
               this.$message.error(res.message)
            } else {
              this.$message.success(res.msg)
            }
            this.cancelUpdatePasswd()
          })
        }
      })
    },
    deleteOne(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOne(id).then(res => {
          this.$message.success(res.msg)
          this.getUserList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped>
.carBox {
  height: 100%;
}
</style>

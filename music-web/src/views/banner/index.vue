<template>
  <div class="app-container">
    <el-button type="primary"
               style="margin-left: 50px"
               @click="insertDialog = true">
      新增</el-button>

    <el-table
      ref="singleTable"
      :data="dataList"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="轮播图"
        width="350">
        <template scope="scope">
          <el-image :src="scope.row.link"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button type="danger" icon="el-icon-delete" plain
                     @click="deleteOne(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增dialog-->
    <el-dialog
      title="提示"
      :visible.sync="insertDialog"
      width="50%">
      <el-form :mode="insertData">
        <el-form-item label="轮播图">
          <el-upload
            action="http://localhost:8080/api/banner/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelInsert">取 消</el-button>
        <el-button type="primary" @click="confirmInsert">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getList, deleteOne, insertOne } from '@/api/banner'

export default {
  name: "index",
  data() {
    return {
      dataList: [],
      insertDialog: false,
      insertData: {},
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getList().then(res => {
        this.dataList = res.data
        console.log(this.dataList)
      })
    },
    deleteOne(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOne(id).then(res => {
          this.$message.success(res.msg)
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    cancelInsert() {
      this.insertData = {}
      this.insertDialog = false
    },
    confirmInsert() {
      insertOne(this.insertData).then(res => {
        this.$message.success(res.msg)
        this.cancelInsert()
        this.getList()
        this.insertDialog = false
      })
    },
    beforeUpload(file) {
      this.insertData.link = 'http://localhost:8080/api/banner/picSrc/' + file.name
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="app-container">

    <el-button type="primary"
      style="margin-left: 50px"
      @click="insertDialog = true">
      新增</el-button>

    <el-table :data="dataList" style="width: 100%">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="name" label="标题" width="150">
      </el-table-column>
      <el-table-column label="照片" width="150">
        <template scope="scope">
          <el-image :src="scope.row.link" style="width: 100px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain @click="updateOne(scope.row)"></el-button>
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
        <el-form-item label="标题">
          <el-input v-model="insertData.name" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="照片">
          <el-upload
            action="http://localhost:8080/api/news/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeUpload"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="insertData.content">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelInsert">取 消</el-button>
        <el-button type="primary" @click="confirmInsert">确 定</el-button>
      </span>
    </el-dialog>

    <!--更新dialog-->
    <el-dialog
      title="修改"
      :visible.sync="updateDialog"
      width="50%">
      <el-form :mode="updateData">
        <el-form-item label="标题">
          <el-input v-model="updateData.name" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="照片">
          <el-upload
            action="http://localhost:8080/api/news/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeUploadUpdate"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">不修改照片可以不上传照片</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="updateData.content">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdate">取 消</el-button>
        <el-button type="primary" @click="confirmUpdate">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {deleteOne, getDataList, insertOne, updateOne} from "@/api/news";

export default {
  name: "index",
  data() {
    return {
      dataList: [],
      insertDialog: false,
      insertData: {},
      dialogImageUrl: '',
      dialogVisible: false,
      updateDialog: false,
      updateData: {}
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      getDataList().then(res => {
        this.dataList = res.data
        console.log(this.dataList);
      })
    },
    deleteOne(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOne(id).then(res => {
          this.$message.success(res.msg)
          this.getDataList()
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
    beforeUpload(file) {
      this.insertData.link = 'http://localhost:8080/api/news/picSrc/' + file.name
    },
    beforeUploadUpdate(file) {
      this.updateData.link = 'http://localhost:8080/api/news/picSrc/' + file.name
    },
    confirmInsert() {
      insertOne(this.insertData).then(res => {
        console.log(res);
        this.$message.success(res.msg)
        this.getDataList()
        this.cancelInsert()
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    updateOne(row) {
      this.updateData = row
      console.log(this.updateData);
      this.updateDialog = true
    },
    confirmUpdate() {
      console.log(this.updateData)
      updateOne(this.updateData).then(res => {
        console.log(res);
        this.$message.success(res.msg)
        this.updateData = {}
        this.cancelUpdate()
      })
    },
    cancelUpdate() {
     this.getDataList()
      this.updateDialog = false
    }
  }
}
</script>

<style scoped>

</style>

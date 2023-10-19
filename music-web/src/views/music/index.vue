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
        property="name"
        label="歌名"
        width="350">
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
        <el-form-item label="音乐文件">
          <el-upload
            class="upload-demo"
            action="http://localhost:8080/api/music/upload"
            :before-upload="beforeUpload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
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
import {getList, insertOne, deleteOne} from "@/api/music";


export default {
  name: "index",
  data() {
    return {
      dataList: [],
      insertDialog: false,
      insertData: {}
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      getList().then(res => {
        this.dataList = res.data
        console.log(this.dataList);
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
          this.getDataList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    beforeUpload(file) {
      const isJPG = file.type === 'mp3';
      if(isJPG) {
        this.$message.error('上传音乐只能是 mp3 格式!');
      }else {
        this.insertData.name = file.name
      }
    },
    cancelInsert() {
      this.insertDialog = false
      this.insertData = {}
    },
    confirmInsert() {
      this.insertData.link = "http://localhost:8080/api/music/musicSrc/" + this.insertData.name
      console.log(this.insertData)
      insertOne(this.insertData).then(res => {
        console.log(res)
        this.$message.success(res.msg)
        this.getDataList()
        this.cancelInsert()
      })
    }
  }
}
</script>

<style >

</style>

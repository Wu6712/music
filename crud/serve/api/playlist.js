const express = require('express') // 引入express
const router = express.Router() // 实例化一个路由对象
const mysql = require('mysql'); // 引入mysql模块
const models = require('../config');
const $sql = require('../sql');

let con = mysql.createConnection(models.mysql);
con.connect(); // 与数据库建立连接

// 引入文件读取模块
const fs = require('fs')

//模糊查询
router.get("/queryFuzzy", (req, res) => {
  let sql = $sql.playlist.queryByName
  let params = [req.query.name]
  con.query(sql, params, (err, result) => {
    try {
      res.send({
        code:200,
        data:result,
        msg:"查询成功"
      })
    } catch {
      console.log("查询失败");
    }
  })
})

router.get('/queryLimit2', function (req, res) {
  const page_num = req.query.page_num  //当前的num
  const page_size = req.query.page_size  //当前页的数量
  const params = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
  let sql = $sql.playlist.queryPage;

  con.query(sql, params, function (err, result) {
    if (err) {
      console.log('err', err.message)
      res.json({
        code: 1,
        message: '查询失败'
      })

    } else {
      let sqlTotal = 'select count(*) as total from playlist' //as更换名称
      con.query(sqlTotal, function (error, among) {
        if (error) {
          console.log(error);
        } else {
          let total = among[0]['total'] //查询表中的数量
          res.json({
            result: 1,
            status: 200,
            message: "success",
            data: result,
            paging: {
              page_num: page_num,
              page_size: page_size,
              total: total
            }
          })
        }
      })
    }
  })
})


//查询数据
router.get('/query', (req, res) => {
  let sql = $sql.playlist.query; //sql查询语句：查找banner表中所有数据
  con.query(sql, (err, result) => { //连接数据库 传入sql语句 回调函数得到结果
    try {
      res.send({
        code:200,
        data:result,
        msg:"查询成功"
      }) //查询结果响应给请求方
    } catch (err) {
      console.log("查询失败");
    }
  });
})

//增加数据
router.post('/add', (req, res) => {
  let sql = $sql.playlist.add;
  let params = [req.query.name, req.query.link]  // 这边的数组参数与上边的"?"一一映射
  con.query(sql, params, (err, result) => {
    try {
      res.send({
        code:200,
        msg:"新增数据成功"
      });
    } catch (err) {
      console.log('新增数据失败');
    }
  });
})

//修改数据
router.put('/mod', (req, res) => {
  let sql = $sql.playlist.mod;
  let params = [req.query.name, req.query.id]
  con.query(sql, params, (err) => {
    try {
      res.send({
        code:200,
        msg:"修改数据成功"
      });
    } catch (err) {
      console.log('修改数据失败');
    }
  });
})

//删除数据
router.delete('/del', (req, res) => {
  let sql = $sql.playlist.del
  let params = [req.query.id];
  con.query(sql, params, (err) => {
    try {
      res.send({
        code:200,
        msg:"删除数据成功"
      });
    } catch (err) {
      console.log('删除数据失败');
    }
  });
})

module.exports = router // 暴露给app.js方便管理

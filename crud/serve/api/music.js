const express = require('express') // 引入express
const router = express.Router() // 实例化一个路由对象
const mysql = require('mysql'); // 引入mysql模块
const models = require('../config');
const $sql = require('../sql');
// 引入文件读取模块
const fs = require('fs')

let con = mysql.createConnection(models.mysql);
con.connect(); // 与数据库建立连接


// 动态路由传参方式，通过params获取动态参数
router.get('/musicSrc/:fileName', (req, res) => {

  // console.log('获取文件名参数', req.params.fileName);

  // 拼接成完整的文件名，这里假设统一使用mp3格式的音乐文件
  let fileName = req.params.fileName 
  try {
    // 存储一份音乐的路径
    let mp3Url = './music/' + fileName
    // fs.statSync判断目录文件是否存在，不存在就会抛出异常，所以需要try catch捕获一下
    let stat = fs.statSync(mp3Url)
    // 设置请求头
    res.writeHead(200, {  // 有的话，就把对应的资源以流的形式返回去
      'Content-Type': 'audio/mp3', // 
      'Content-Length': stat.size, // 指定一下文件大小
      "Accept-Ranges": "bytes" // 不加的话，前端google浏览器中音频无法拖动
    })
    //创建可读流
    let readStream = fs.createReadStream(mp3Url)
    // 将读取的结果以管道pipe流的方式返回给前端
    readStream.pipe(res);
  } catch (error) {
    // 读取不到相应文件，就直接返回找不到即可
    res.send({
      code: 500,
      msg: '暂无数据'
    })
  }
})

router.post('/upload', (req, res) => {
  let fileObj = null;
  let filePath = '';

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send({
      code: 400,
      msg: '上传失败'
    })
    return;
  }

  /* file 是上传时候body中的一个字段，有可以随意更改*/
  console.log(req.files, req.files.file)
  fileObj = req.files.file;

  filePath = './music/' + fileObj.name;
  fileObj.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send({
        code: 500,
        msg: '上传失败'
      })
    }

    let sql = $sql.music.add;
    let params = [req.files.file.name, "http://localhost:8080/api/music/musicSrc/" + req.files.file.name]  // 这边的数组参数与上边的"?"一一映射

    con.query(sql, params, (err, result) => {
      res.send({
        code: 200,
        data: fileObj.name,
        msg: '上传成功'
      })
    })

  })
});

router.get('/getall', (req, res, next) => {
  let result = fs.readdirSync('./music')
  res.json(result)
})

//模糊查询
router.get("/queryFuzzy", (req, res) => {
  let sql = $sql.music.queryByName
  let params = [req.query.name]
  con.query(sql, params, (err, result) => {
    try {
      res.send({
        code: 200,
        data: result,
        msg: "查询成功"
      })
    } catch {
      console.log("查询失败");
    }
  })
})

//查询数据
router.get('/queryOne', (req, res) => {
  let sql = $sql.music.queryById; //sql查询语句：查找music表中所有数据
  let params = [req.query.id]
  con.query(sql, params, (err, result) => { //连接数据库 传入sql语句 回调函数得到结果
    try {
      res.send({
        code: 200,
        data: result,
        msg: "查询成功"
      }) //查询结果响应给请求方
    } catch (err) {
      console.log("查询失败");
    }
  });
})

//查询数据
router.get('/queryByType', (req, res) => {
  let sql = $sql.music.queryByType; //sql查询语句：查找music表中所有数据
  let params = [req.query.type]
  con.query(sql,params, (err, result) => { //连接数据库 传入sql语句 回调函数得到结果
    try {
      res.send({
        code: 200,
        data: result,
        msg: "查询成功"
      }) //查询结果响应给请求方
    } catch (err) {
      console.log("查询失败");
    }
  });
})


//查询数据
router.get('/query', (req, res) => {
  let sql = $sql.music.query; //sql查询语句：查找music表中所有数据
  con.query(sql, (err, result) => { //连接数据库 传入sql语句 回调函数得到结果
    try {
      res.send({
        code: 200,
        data: result,
        msg: "查询成功"
      }) //查询结果响应给请求方
    } catch (err) {
      console.log("查询失败");
    }
  });
})

router.get('/queryLimit2', function (req, res) {
  const page_num = req.query.page_num  //当前的num
  const page_size = req.query.page_size  //当前页的数量
  const params = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
  let sql = $sql.music.queryPage;

  con.query(sql, params, function (err, result) {
      if (err) {
          console.log('err', err.message)
          res.json({
              code: 1,
              message: '查询失败'
          })

      } else {
          let sqlTotal = 'select count(*) as total from music' //as更换名称
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

//增加数据
router.post('/add', (req, res) => {
  let sql = $sql.music.add;
  let params = [req.query.name, req.query.link]  // 这边的数组参数与上边的"?"一一映射
  con.query(sql, params, (err, result) => {
    try {
      res.send({
        code: 200,
        msg: "新增数据成功"
      });
    } catch (err) {
      console.log('新增数据失败');
    }
  });
})

//修改数据
router.put('/mod', (req, res) => {
  let sql = $sql.music.mod;
  let params = [req.query.name, req.query.link, req.query.id]
  con.query(sql, params, (err) => {
    try {
      res.send({
        code: 200,
        msg: "修改数据成功"
      });
    } catch (err) {
      console.log('修改数据失败');
    }
  });
})

//删除数据
router.delete('/del', (req, res) => {
  let sql = $sql.music.del
  let params = [req.query.id];
  con.query(sql, params, (err) => {
    try {
      res.send({
        code: 200,
        msg: "删除数据成功"
      });
    } catch (err) {
      console.log('删除数据失败');
    }
  });
})

module.exports = router // 暴露给app.js方便管理
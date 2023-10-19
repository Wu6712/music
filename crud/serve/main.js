// node 后端服务器
//main.js——Express 服务器入口文件
const user = require('./api/user')
const music = require('./api/music')
const banner = require('./api/banner')
const news = require('./api/news')
const playlist = require('./api/playlist')
//
const fileUpload = require('express-fileupload');
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
//
const express = require('express')
const app = express()
//导入用于生成jwt字符串的包
const jwt=require('jsonwebtoken')
// 导入用于将客户端发送过来的jwt字符串，解析还原成json对象的包
const { expressjwt:express_jwt } = require("express-jwt");

app.use(express_jwt({secret:"hqd",algorithms:['HS256']}).unless({path:[/^\/api\//]}))

//采用设置所有均可访问的方法解决跨域问题
app.all("*", (req, res, next) => {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type, Authorization");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET");
  if (req.method.toLowerCase() == 'options')
    res.send(200); //让options尝试请求快速结束
  else
    next();
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(fileUpload());

//封装错误处理函数
app.use((req, res, next) => {
  res.cc = (err, status = 1, data = {}) => {
    res.send({
      status,
      data,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 后端api路由
app.use('/api/user', user)
app.use('/api/music', music)
app.use('/api/banner', banner)
app.use('/api/news', news)
app.use('/api/playlist', playlist)

// 监听端口
app.listen(8080)
console.log('success listen at port:8080......')

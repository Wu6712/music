const mysql = require('mysql'); // 引入mysql模块
const express = require("express");// 引入express模块
const router = express.Router();// 实例化express模块 用app来表示
const models = require('../config');
const $sql = require('../sql');

// 导入 bcryptjs 加密包
const bcrypt = require('bcryptjs')
// 导入生成Token的包
const jwt = require('jsonwebtoken')

// 引入文件读取模块
const fs = require('fs')

let con = mysql.createConnection(models.mysql);
con.connect(); // 与数据库建立连接

//查询数据
router.get('/query', (req, res) => {
    let sql = $sql.user.query; //sql查询语句：查找user表中所有数据
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

//增加数据
router.post('/add', (req, res) => {
    let sql = $sql.user.add;
    let params = [req.query.username, req.query.password]  // 这边的数组参数与上边的"?"一一映射
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
    let sql = $sql.user.mod;
    let params = [req.query.username, req.query.password, req.query.id]
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

//修改信息
router.put('/modInfo', (req, res) => {
  let sql = $sql.user.modInfo;
  let params = [req.query.sex, req.query.nickname,req.query.signature, req.query.id]
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

//查询数据
router.get('/queryOne', (req, res) => {
    let sql = $sql.user.queryById; //sql查询语句：查找user表中所有数据
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

router.put('/modPassword', (req, res, next) => {
    // 通过 req.body 获取请求体中包含的 url-encoded 格式的数据
    // console.log(req.body)
    const userInfo = req.body
    //对客户端的数据进行校验
    if (userInfo.username == '' || userInfo.password == ''|| userInfo.newpassword == '') {
        return res.send({
            status: 1,
            msg: '用户名和密码不能为空'
        })
    }
    // 定义 SQL 语句
    const sql = $sql.user.queryByName
    // 执行 SQL 语句，根据用户名查询用户的信息
    con.query(sql, userInfo.username, (err, result) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功,但是获取的数据条数不为1 也是失败的
        if (result.length !== 1) return res.cc('查询失败！')
        // 经过上方俩条判断条件，则证明执行 SQL 成功

        // TODO ：判断密码是否正确
        const comRes = bcrypt.compareSync(userInfo.password, result[0].password)
        if (!comRes) return res.cc('原密码校验失败')
        userInfo.newpassword = bcrypt.hashSync(userInfo.newpassword, 10)
        let sql1 = $sql.user.modPassword
        let params1 = [userInfo.newpassword,userInfo.username]
        con.query(sql1, params1, (err) => {
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

});

//删除数据
router.delete('/del', (req, res) => {
    let sql = $sql.user.del
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

//查询数据
router.get('/queryByName', (req, res) => {
    let sql = $sql.user.queryByName; //sql查询语句：查找user表中所有数据
    let params = [req.query.name]
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

router.get('/queryLimit2', function (req, res) {
    const page_num = req.query.page_num  //当前的num
    const page_size = req.query.page_size  //当前页的数量
    const params = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
    let sql = $sql.user.queryPage;

    con.query(sql, params, function (err, result) {
        if (err) {
            console.log('err', err.message)
            res.json({
                code: 1,
                message: '查询失败'
            })

        } else {
            let sqlTotal = 'select count(*) as total from user' //as更换名称
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

router.post('/register', (req, res, next) => {
    // 通过 req.body 获取请求体中包含的 url-encoded 格式的数据
    console.log(req.body)
    const userInfo = req.body
    //【步骤一】对客户端的数据进行校验
    if (userInfo.username == '' || userInfo.password == '') {
        return res.send({
            status: 1,
            msg: '用户名和密码不能为空'
        })
    }
    // 定义sql语句，查询用户名是否被占用
    let sql = $sql.user.queryByName
    con.query(sql, [userInfo.username], (error, result) => {
        if (error) {
            return res.cc(error)
        }
        if (result.length > 0) {
            return res.cc('用户名已被占用!')
        }
        // 调用 bcrypt.hashSync() 对密码加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        // 定义插入新用户的 SQL 语句
        let sql1 = $sql.user.register
        // 调用 db.query() 执行 sql 语句
        con.query(sql1, {
            username: userInfo.username,
            password: userInfo.password
        }, (error, result) => {
            if (error) return res.cc(error)
            // 判断影响行数是否为 1
            if (result.affectedRows !== 1) return res.cc('注册用户失败！')
            return res.cc('注册用户成功', 0, {
                username: userInfo.username
            })
        })
    })

});

router.get('/getInfo', (req, res) => {

    res.send({
        status: 200,
        message: '获取用户信息成功',
        data: req.user
    })
    console.log('getInfo...')

})

router.post('/login', (req, res, next) => {
    // 通过 req.body 获取请求体中包含的 url-encoded 格式的数据
    console.log(req.body)
    const userInfo = req.body
    //对客户端的数据进行校验
    if (userInfo.username == '' || userInfo.password == '') {
        return res.send({
            status: 1,
            msg: '用户名和密码不能为空'
        })
    }
    // 定义 SQL 语句
    const sql = $sql.user.queryByName
    // 执行 SQL 语句，根据用户名查询用户的信息
    con.query(sql, userInfo.username, (err, result) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功,但是获取的数据条数不为1 也是失败的
        if (result.length !== 1) return res.cc('登录失败！')
        // 经过上方俩条判断条件，则证明执行 SQL 成功

        // TODO ：判断密码是否正确
        const comRes = bcrypt.compareSync(userInfo.password, result[0].password)
        if (!comRes) return res.cc('密码错误')
        // 在服务器端生成 Token 字符串
        const user = {
            ...result[0], // 解构用户信息
            password: '', //密码等敏感信息置空
        }
        // 对用户的信息进行加密，生成 token 字符串
        const tokenStr = jwt.sign(user, models.token.jwtSecretKey, {
            expiresIn: models.token.expiresIn //tonken 有效期
        })
        // 调用 res.send 将Token响应给客户端
        res.send({
            status: 200,
            data: {
                user: user,
                token: tokenStr,
            },
            message: '登录成功！！！',
        })
        console.log('登录成功')
    })

});

// 动态路由传参方式，通过params获取动态参数
router.get('/picSrc/:fileName', (req, res) => {

  // console.log('获取文件名参数', req.params.fileName);

  // 拼接成完整的文件名
  let fileName = req.params.fileName

  try {
    // 存储一份音乐的路径，这里我们在/pic/banner/文件夹里面存放音乐资源
    let picUrl = './pic/avatar/' + fileName
    // fs.statSync判断目录文件是否存在，不存在就会抛出异常，所以需要try catch捕获一下
    let stat = fs.statSync(picUrl)
    // 设置请求头
    res.writeHead(200, {  // 有的话，就把对应的资源以流的形式返回去
      'Content-Type': 'image/png', //
      'Content-Length': stat.size, // 指定一下文件大小
      "Accept-Ranges": "bytes" // 不加的话，前端google浏览器中音频无法拖动
    })
    //创建可读流
    let readStream = fs.createReadStream(picUrl)
    // 将读取的结果以管道pipe流的方式返回给前端
    readStream.pipe(res);
  } catch (error) {
    // 读取不到相应文件，就直接返回找不到即可
    res.send('暂无此图片数据')
  }
})

router.post('/modAvatar', (req, res) => {
    let fileObj = null;
    let filePath = '';

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send({
        code: 1,
        msg: 'Bad Request.'
      })
      return;
    }

    /* file 是上传时候body中的一个字段，有可以随意更改*/
    // console.log(req.files, req.files.file)
    fileObj = req.files.file;

    filePath = './pic/avatar/' + fileObj.name;
    fileObj.mv(filePath, (err) => {
      if (err) {
        return res.status(500).send({
          code: 1,
          msg: 'System error'
        })
      }

      let sql = $sql.user.modAvatar;
      let params = ["http://localhost:8080/api/user/picSrc/" + req.files.file.name,req.body.id]  // 这边的数组参数与上边的"?"一一映射
      console.log(req.body);

      con.query(sql, params, (err, result) => {
        res.send({
          code: 0,
          data: fileObj.name,
          msg: 'Upload Successfuly'
        })
      })

    })
  });

module.exports = router;

// 数据库连接配置
//config.js——用来添加配置
//根据mysql的IP，端口，用户名，密码，数据库名称自行修改
module.exports = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'mus_o',
        port: '3306'
    },
    token: {
        // 加密和解密 token 的密钥
        jwtSecretKey: 'hqd',
        // token 有效期
        expiresIn: '24h'
    }
}

const sqlqd = {
  user: {
    add: 'insert into user set username=? , password=?',
    del: 'delete from user where id= ?',
    mod: 'update user set username=?, password=? where id=?',
    modInfo: 'update user set sex=?, nickname=?,signature=? where id=?',
    query: 'select * from user',
    queryById: 'select * from user where id = ?',
    queryPage: 'select * from user limit ?,?',
    queryByName: 'select * from user where username = ?',
    register: 'insert into user set ?',
    modAvatar: 'update user set avatar=? where id=?',
    modPassword: 'update user set password=? where username=?'
  },
  music: {
    add: 'insert into music set name=? , link=?, type = 0',
    del: 'delete from music where id= ?',
    mod: 'update music set name=?, link=? where id=?',
    query: 'select * from music',
    queryByType: 'select * from music where type = ?',
    queryById: 'select * from music where id = ?',
    queryPage: 'select * from music limit ?,?',
    queryByName: 'select * from music where name like "%" ? "%"'
  },
  banner: {
    add: 'insert into banner set name=? , link=?',
    del: 'delete from banner where id= ?',
    mod: 'update banner set name=?, link=? where id=?',
    query: 'select * from banner',
    queryById: 'select * from banner where id = ?',
    queryPage: 'select * from banner limit ?,?',
    queryByName: 'select * from banner where name like "%" ? "%"'
  },
  news: {
    add: 'insert into news set name=? , link=?,content=?',
    del: 'delete from news where id= ?',
    mod: 'update news set name=?, link=?,content=? where id=?',
    query: 'select * from news',
    queryById: 'select * from news where id = ?',
    queryPage: 'select * from news limit ?,?',
    queryByName: 'select * from news where name like "%" ? "%"'
  },
  playlist: {
    add: 'insert into playlist set name=?,link=?',
    del: 'delete from playlist where id= ?',
    mod: 'update playlist set name=?,link=? where id=?',
    query: 'select * from playlist',
    queryById: 'select * from playlist where id = ?',
    queryPage: 'select * from playlist limit ?,?',
    queryByName: 'select * from playlist where name like "%" ? "%"'
  }
}
module.exports = sqlqd

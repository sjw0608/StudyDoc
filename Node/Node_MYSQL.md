#  使用NODE 链接 MYSQL 数据库

## 1. 起步

```npm
// 安装
npm install --save mysql
```

## 2. 配置

```javascript
let mysql = require('mysql')

// 创建链接
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'node_sql'
})

// 链接数据库
connection.connect();

// 执行数据操作
connection.query('select * from user', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

// 关闭链接
connection.end()
 
```


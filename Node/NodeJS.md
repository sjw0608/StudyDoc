# Node.js 001

## 1. Node.js 中的 Http 服务

### 1.1 开启一个简单的服务

```javascript
// 使用 Node 非常轻松的构建一个 Web 服务器
// 在 Node 中专门提供了一个核心模块：http
// http 这个模块的职责就是帮你创建编写服务器的
// 1.加载 http 核心模块
let http = require('http')
// 2.使用 http.createServer() 方法创建一个Web 服务器
// 返回一个server实例
let server = http.createServer()
// 3.服务器是要干嘛？
  // 提供服务：数据的服务
  // 发请求
  // 接收请求
  // 处理请求
  // 给个反馈（发送响应）
  // 注册request请求事件
  // 当客户端请求过来，就会自动触发服务器的request请求事件
  // 然后执行第二个参数：回调处理函数
  server.on('request', function () {
    console.log('收到客户端的请求了')
  })
  // 4.绑定端口号，启动服务器
  server.listen(3000, function() {
    console.log('服务器启动成功了，可通过 http://127.0.0.1:3000/ 访问')
  })
```

### 1.2 Http 发送响应

```javascript
let http = require('http')
let server = http.createServer()
// request 请求事件处理函数，需要接收两个参数：
//  Requerst 请求对象
//    请求对象可以用来获取客户端的一些请求信息，例如请求路径
//  Response 响应对象
//    响应对象可以用来给客户端发送响应消息
//    write 方法：可以用来给客户端发送响应数据，可以使用多次，但是最后一定要使用end 来结束响应, 否则客户端会一直在等待
//    end 方法： 告诉客户端我，我的话说完了，你可以呈递给客户了
server.on('request', function (request, response) {
  	// request.url 获取到的是端口号之后的那一部分路径
  	// request.socket.remotePort 客户端访问的端口号
  	// req.socket.remoteAddress 客户端访问的地址
    let url = request.url 
    if (url == '/') {
        response.end('index page')
    } else if (url == '/login') {
        response.end('login page')
    } else if (url == '/products') {
        var products = [{
            name: '苹果 12 Pro ',
            price: 8499
        },{
            name: '小米 11',
            price: 4899
        },{
            name: '苹果 12 mini',
            price: 5499
        }]
        response.end(JSON.stringify(products))
    } else {
        response.end('404 NOT Found.')
    }
})
server.listen(3000, function () {
    console.log('服务器启动成功了，可通过 http://127.0.0.1:3000/ 访问')
})
```

### 1.3 http-content-type

> [`Content-Type`参照表 ](http://tool.oschina.net/commons)

```javascript
let http = require('http')
let server = http.createServer()
server.on('request', function (request, response) {
  	// 在服务器默认发送的数据，其实是 utf8 编码的内容
  	// 但是浏览器不知道你是 utf8 编码的内容
  	// 浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析
  	// 中文操作系统默认是 gbk
  	// 解决方法就是正确的告诉浏览器我给你发送的内容是什么编码的
  	// 在 http 协议中，Content-Type 就是用来告知对方我给你发送的数据内容是什么类型
  	// res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    let url = request.url 
   	if (url == '/plain') {
      	// text/plain 就是普通文本
        response.setHeader('Content-Type', 'text/plain; charset=utf-8')
        response.end('Hello 世界')
    } else if(url == 'html'){
      	// 如果你发送的是 html 格式的字符串，则也要告诉浏览器我给你发送是 text/html 格式的内容
      	response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.end('<p>hello html <a href="">点我</a></p>')
    }
})
server.listen(3000, function () {
    console.log('服务器启动成功了，可通过 http://127.0.0.1:3000/ 访问')
})
```

### 1.4 http-fs

```javascript
// 1.结合 fs 发送的文件中的数据
// 2.Content-Type
//    不同的资源对应的 Content-Type 是不一样的
//    图片不需要指定编码
//    一般只为字符数据才指定编码
let http = require('http')
let fs = require('fs')
let server = http.createServer()
server.on('request', function (request, response) {
    let url = request.url 
   	if (url == '/plain') {
      fs.readFile('./resource/index.html',function(err,data){
        if(err){
          response.setHeader('Content-Type', 'text/plain; charset=utf-8')
          response.end('文件读取失败，请稍后重试！')
        }else{
          // data 默认是二进制数据，可以通过 .toString 转为字符串
        	// res.end() 支持两种数据类型，一种是二进制，一种是字符串
          response.setHeader('Content-Type', 'text/html; charset=utf-8')
        	response.end(data)
        }
      })
    } else if(url == '/image'){
      // url：统一资源定位符
    	// 一个 url 最终其实是要对应到一个资源的
      fs.readFile('./resource/img.png',function(err,data){
         if(err){
          response.setHeader('Content-Type', 'text/plain; charset=utf-8')
          response.end('文件读取失败，请稍后重试！')
        }else{
        	// 图片就不需要指定编码了，因为我们常说的编码一般指的是：字符编码
          response.setHeader('Content-Type', 'image/jpeg')
        	response.end(data)
        }
      })
    }
})
server.listen(3000, function () {
    console.log('服务器启动成功了，可通过 http://127.0.0.1:3000/ 访问')
})
```



## 2. Node.js 中的核心模块

### 2.1核心模块

> Node 为 JavaScript 提供了很多服务器级别的 API ，这些 API 绝大多数都被包装到了一个具名的核心模块中了。例如文件操作的 `fs` 核心模块，http 服务构建的 `http` 模块，`path` 路径操作模块，`os`操作系统信息模块等

  :warning: 如果使用核心模块 就必须先进行 `require()`引用

```javascript
// 用来获取机器信息的
let os = require('os')
// 用来操作路径的
let path = require('path')

let url = require('url')

// 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
console.log('/pinglun?name=的撒的撒&message=的撒的撒的撒')

// 获取当前机器的 CPU 信息
console.log(os.cpus())
// memory 内存
console.log(os.totalmem())

// 获取一个路径中的扩展名部分
// extname extension name
console.log(path.extname('c:/a/b/c/d/hello.txt'))
```

### 2.2 模块化

#### 2.2.1 Node中的模块

在Node中，模块有三种：

- 具名的核心模块，例如 `fs` 、` http`
-  用户自己编写的文件模块
  - 相对路径必须加 `./`，不能省略否则会报错
  - 可以省略后缀名（推荐）
- 第三方模块
  - 必须通过 npm 来下载的才可以使用

> 在 Node 中，没有全局作用域，只有模块作用域（外部访问不到内部，内部也访问不到外部）

#### 2.2.2 `Require` 方法

> `require` 是一个方法，它有两个作用: 
>
> - 1、加载文件模块并执行里面的代码 
> - 2、拿到被加载文件模块导出的接口对象
>
> 每个文件模块中都提供了一个对象 ： `exports`
>
> `exports `默认是一个空对象，你要做的就是把所有需要被外部访问的成员挂载到这个 `exports `对象中

## 3. Web 服务端

### 3.1 IP 和 端口号

> - IP 地址用来定位计算机的
>
> - 端口号用来定位具体的应用程序
>
> - 端口号的范围从0 - 65536 之间
> - 可以同时开启多个服务，但一定要确保不同服务占用的端口号不一致才可以
>
> :warning:所有需要联网通信的软件都必须具有端口号，计算机中有一些默认的端口号，最好不要去使用，例如：80

### 3.2 Content-Type

### 3.3 请求对象 Request

### 3.4 响应对象 Response

### 3.5 在 Node 中使用模版引擎

### 3.6 服务端渲染

- 服务端渲染
  - 说白了就是在服务端使用模板引擎
  - 模板引擎最早诞生于服务端，后来才发展到了前端

- 服务端渲染和客户端渲染的区别
  - 客户端渲染不利于 SEO 搜索引擎优化
  - 服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
  - 所以你会发现真正的网站既不是纯异步也不是纯服务端渲染出来的
  - 而是两者结合来做的
  - 例如京东的商品列表就采用的是服务端渲染，目的了为了 SEO 搜索引擎优化
  - 而它的商品评论列表为了用户体验，而且也不需要 SEO 优化，所以采用是客户端渲染

#### 3.6.1 Node中的模版引擎

```html
<!-- tpl.html -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{ title }}</title>
</head>
<body>
  <p>大家好，我叫：{{ name }}</p>
  <p>我今年 {{ age }} 岁了</p>
  <h1>我来自 {{ province }}</h1>
  <p>我喜欢：{{each hobbies}} {{ $value }} {{/each}}</p>
  <script>
    var foo = '{{ title }}'
  </script>
</body>
</html>
```

```javascript
// art-template
// art-template 不仅可以在浏览器使用，也可以在 node 中使用

// 安装：
//    npm install art-template
//    该命令在哪执行就会把包下载到哪里。默认会下载到 node_modules 目录中
//    node_modules 不要改，也不支持改。

// 在 Node 中使用 art-template 模板引擎
// 模板引起最早就是诞生于服务器领域，后来才发展到了前端。
// 
// 1. 安装 npm install art-template
// 2. 在需要使用的文件模块中加载 art-template
//    只需要使用 require 方法加载就可以了：require('art-template')
//    参数中的 art-template 就是你下载的包的名字
//    也就是说你 isntall 的名字是什么，则你 require 中的就是什么
// 3. 查文档，使用模板引擎的 API


var template = require('art-template')
var fs = require('fs')

fs.readFile('./tpl.html', function (err, data) {
  if (err) {
    return console.log('读取文件失败了')
  }
  // 默认读取到的 data 是二进制数据
  // 而模板引擎的 render 方法需要接收的是字符串
  // 所以我们在这里需要把 data 二进制数据转为 字符串 才可以给模板引擎使用
  var ret = template.render(data.toString(), {
    name: 'Jack',
    age: 18,
    province: '北京市',
    hobbies: [
      '写代码',
      '唱歌',
      '打游戏'
    ],
    title: '个人信息'
  })

  console.log(ret)
})
```

## 4. Node中的模块系统

### 4.1 什么是模块化

- 文件作用域
- 通信规则
  - 加载 require
  - 导出 

### 4.2 CommonJs模块规范

> 在 Node 中的 JavaScript 还有一个很重要的概念，模块系统

- 模块作用域
- 使用 `require` 方法来加载模块
- 使用 `exports` 接口对象来导出模块中的成员



#### 4.2.1 加载 `require`

语法

```javascript
var 自定义名称  = require('模块')
```

两个作用：

- 执行被加载模块中的代码
- 得到被加载模块中 `exports` 导出接口对象

#### 4.2.2 导出 `exports`

- Node 中是模块作用域，默认文件中所有的成员只在当前文件模块有效
- 对于希望可以被其他模块访问的成员，我们就需要把这些公开的成员都挂载到 `exports` 接口对象中就可以了

导出多个成员（必须在对象中）

```javascript
exports.a = 123 
exports.b = 'hahah'
exports.c = ()=>{console.log('ccc')}
exports.d = {}
```

导出单个成员（拿到的就是：函数、字符串）

```javascript
// module.exports = 'hello'
// 后者会覆盖前者
// module.exports = function() {}
// 导出多个成员
module.exports = {
  a:123,
  b:'hahaha',
  c:()=>{console.log('ccc')},
  d:{}
}
```

> exports 和 module.exports 的区别
>
> - 每个模块中都有一个 module 对象
> - module 对象中有一个 exports 对象
> - 我们可以把需要导出的成员都挂载到 module.exports 接口对象中
> - 也就是：`moudle.exports.xxx = xxx` 的方式
> - 但是每次都 `moudle.exports.xxx = xxx` 很麻烦，点儿的太多了
> - 所以 Node 为了你方便，同时在每一个模块中都提供了一个成员叫：`exports`
> - `exports === module.exports` 结果为 `true`
> - 所以对于：`moudle.exports.xxx = xxx` 的方式 完全可以：`expots.xxx = xxx`
> - 当一个模块需要导出单个成员的时候，这个时候必须使用：`module.exports = xxx` 的方式
> - 不要使用 `exports = xxx` 不管用
> - 因为每个模块最终向外 `return` 的是 `module.exports`
> - 而 `exports` 只是 `module.exports` 的一个引用
> - 所以即便你为 `exports = xx` 重新赋值，也不会影响 `module.exports`
> - 但是有一种赋值方式比较特殊：`exports = module.exports` 这个用来重新建立引用关系的

#### 4.2.3 `require` 方法加载规则

- 优先从缓存加载（避免重复加载，提高加载效率）
- 判断模块标识
  - 核心模块
  - 第三方模块
  - 自己写的模块

## 5. Express

### 5.1 安装

```javascript
// 创建文件夹
mkdir myapp
// 进入创建的文件夹
cd myapp
// 初始化 pages.json
npm init -y
// 安装
npm install express --save
```

### 5.2 起步

```javascript
let express = require('express')
let app = express()
app.get('/',(req,res)=>{
  res.end('hello express')
})
app.listen('3000',()=>{
    console.log('running...')
})
```

### 5.3 基本路由

> 路由器

- get:

```javascript
// 当你以 GET 方法请求 / 的时候，执行对应的处理函数
app.get('/',(req,res)=>{res.end('GET request')})
```

- post:

```javascript
// 当你以 POST 方法请求 / 的时候，执行对应的处理函数
app.post('/',(req,res)=>{res.end('POST request')})
```

### 5.4 静态资源

```javascript
// 当省略第一个参数的时候，则可以通过省略 /xxx 的方式来访问
app.use(express.static('public'))
app.use(express.static('node_modules'))
// /public/xxx
app.use('/public/',express.static('./public/'))

app.use('/static', express.static(path.join(__dirname, 'public')))
```

### 5.5 在express 中配置 `art-template` 模版引擎

- 安装

```javascript
npm install --save art-template
npm install --save express-art-template
```

- 配置&使用：

```javascript
let express = require('express')
let app = express()
// 配置使用 art-template 模版引擎
// 第一个参数: 表示，当渲染 .art 结尾的文件的时候，使用 art-template 模版引擎
app.engine('html',require('express-art-template'))
// Express 为 Pesponse 响应对象提供来一个方法： render
// render 方法默认是不可用的，但是如果配置来模版引擎就可以使用了 
// res.render('html 模版名',{模版数据})
// 第一个参数不能写路径，默认回去项目中的 views 目录查找该模版文件
// 也就是说 express 有一个约定，开发人员把所有的视图文件都放到 views 目录中 

app.get('/',(req,res)=>{
    res.render('404.html')
}).listen('3000',()=>{
    console.log('running...')
})
```

> 如果想要修改默认的 `views` 视图渲染存储目录， 可以：
>
> ```javascript
> // 注意第一个参数不能省略
> app.set('views',render函数的默认路径) 
> ```



### 5.6 在 Express 中获取表单 POST 请求体数据

在 express 中没有内置获取表单 POST 请求体的API，这里我们需要使用一个第三方包：`body-parser`

- 安装

```javascript
npm install --save body-parser
```

- 配置

```javascript
var express = require('express')
// 引包
var bodyParser = require('body-parser')

var app = express()
// 配置
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  // 可以通过 req.body 获取表单数据的
  res.end(JSON.stringify(req.body, null, 2))
})
```

### 5.7 在 Express 中获取表单 GET 请求体数据

Express 内置了一个 API ，可以直接通过 `req.query`来获取

```javascript
app.get('/',(req,res)=>{console.log(req.query)})
```

### 5.8 在 Express 中设置 session 保存登录状态

:warning: 提示： 默认 Session 数据是内存存储的，服务器一旦重启就会丢失，真正的生产环境会把 Session持久化存储

#### 5.8.1 安装

```npm
npm install express-session
```

#### 5.8.2 配置

```javascript
let session = require('express-session')
app.use(session({
  // 配置加密字符串，它会在原有加密基础上喝这个字符串拼接起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: '', 
  reasve: false,
  saveUninitialized: false // 无论你是否使用 Session ，我都默认给你分配一把钥匙
}))
```

#### 5.8.3 使用

```javascript
// 添加 Session 数据
req.session.token = 'xxxx'

// 获取 Session 数据
req.session.token
```

## 6. Express 中间件

>  中间件：处理请求的，本质就是个函数
>
> 当请求进来，会从第一个中间件开始进行匹配
>
> - 如果匹配，则进来。如果请求进入中间件之后，没有调用 `next` 则代买回停在当前中间件，如果调用了 `next` 则继续向后找到第一个匹配的中间件
>
> - 如果不匹配，则继续判断匹配下一个中间件
> - 如果没有能匹配的中间件，则 Express 会默认输出：Cannot GET 路径
>
> 当一个请求进入一个中间件之后，如果不调用 `next` 则会停留在当前中间件，所以 `next` 是一个方法，用来调用下一个中间件的
>
>  调用 `next` 方法也是要匹配的（不是调用紧挨的那个）

- 中间件本身就是一个方法，该方法接受三个参数
   - Request  请求对象
  - Response  响应对象
  - next   下一个中间件

> 同一个请求所经过的中间件都是同一个请求对象和响应对象

### 6.1 在 Express 中，对中间件的几种分类

- 万能匹配：不关心请求路径和请求方法的中间件，也就是说任何请求都会进入这个中间件

```javascript
// 万能匹配
app.use((req,res,next)=>{
  console.log('1')
})
app.use((req,res,next)=>{
  console.log('2')
})

// 运行输出 1 不输出2 原因：第一个万能匹配没有执行next方法
```

- 以 `/xxx` 开头的路径中间件

```javascript
app.use((req,res,next)=>{
  console.log('1')
  next()
})
// 要求 /a 开头的
app.use('/a',(req,res,next)=>{
  console.log('a')
  next()
})
app.use((req,res,next)=>{
  console.log('2')
})
app.use('/a',(req,res,next)=>{
  console.log('a2')
})

// 127.0.0.1:3000/a/b 输出 1 a 2
```

- 除了以上中间件之外，还有一种最常用的：**严格请求方法和请求路径的中间件**
  - app.get
  - app.post

### 6.2 配置一个处理 404 的中间件

```javascript
app.use((req,res)=>{
  res.render('404.html')
})
```

### 6.3 配置一个全局错误处理的中间件

```javascript
app.get('/',(req,res,next)=>{
  fs.rendFile('/d/dasa',(err,data)=>{
    if(err){
      // 当调用 next 的时候，如果传递了参数，则直接往后找带有四个参数的中间件
      // 当发生错误的时候，我们可以调用 next 传递错误对象
      // 然后就会被全局错误处理中间件匹配到并处理
      return next(err)
    }
  })
})

// 第一个参数是 错误对象 
// 四个参数缺一不可
app.use((error,req,res,next)=>{
  // res.status(500).send(error.message)
  // todo... 错误处理时间
})
```


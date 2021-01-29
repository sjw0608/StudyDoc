# [Node.js](https://nodejs.org)

## Node.js 介绍

### Node.js 是什么

- `Node.js` 是一个js的运行时环境
  - `Node.js` 不是一门语言
  - `Node.js` 不是库、不是框架
  - `Node.js` 是一个`JavaScript`运行时环境
  - `Node.js`可以解析和执行`JavaScript`代码
  - 以前只有浏览器可以解析执行`JavaScript`代码
  - 现在的`JavaScript`可以完全脱离浏览器来运行，一切都归功于：`Node.js`
- 浏览器中的 `JavaScript`
  - EcmaScript
    - 基本的语法
    - if
    - var
    - function
    - Object
    - Array
  - BOM
  - DOM
- Node.js 中的 JavaScript
  - **没有BOM、DOM**
  - EcmaScript
    - 变量
    - 方法
    - 数据类型
    - 内置对象
    - Array
    - Object
    - Date
    - Math
  - 模块系统
    - 在 Node 中没有全局作用域的概念
    - 在 Node 中，只能通过 require 方法来加载执行多个 JavaScript 脚本文件
    - require 加载只能是执行其中的代码，文件与文件之间由于是模块作用域，所以不会有污染的问题
      - 模块完全是封闭的
      - 外部无法访问内部
      - 内部也无法访问外部
    - 模块作用域固然带来了一些好处，可以加载执行多个文件，可以完全避免变量命名冲突污染的问题
    - 但是某些情况下，模块与模块是需要进行通信的
    - 在每个模块中，都提供了一个对象：`exports`
    - 该对象默认是一个空对象
    - 你要做的就是把需要被外部访问使用的成员手动的挂载到 `exports` 接口对象中
    - 然后谁来 `require` 这个模块，谁就可以得到模块内部的 `exports` 接口对象
    - 还有其它的一些规则，具体后面讲，以及如何在项目中去使用这种编程方式，会通过后面的案例来处理
  - 核心模块
    - 核心模块是由 Node 提供的一个个的具名的模块，它们都有自己特殊的名称标识，例如
      - fs 文件操作模块
      - http 网络服务构建模块
      - os 操作系统信息模块
      - path 路径处理模块
      - ...
    - 所有核心模块在使用的时候都必须手动的先使用 `require` 方法来加载，然后才可以使用，例如：
      - `var fs = require('fs')`
- 构建与 Chrome 的 V8 引擎
  - 代码只是具有特定格式的字符串
  - 引擎可以认识它，引擎可以帮你去解析和执行
  - Google Chrome 的 V8 引擎是目前的解析执行 JavaScript 代码最快的
  - Node.js 的作者是吧 Google Chrome 中的 V8 引擎移植了出来，开发了一个独立的 JavaScript 运行时环境
- Node.js 的特性
  - envent-driven 事件驱动
  - non-blocking I/O model 非阻塞IO模型（异步）
  - 轻量和高效
- Node.js 依赖
  - npm 是世界上最大的开源库生态系统
  - 绝大多数 JavaScript 相关的包都存放在来npm上，这样做的目的是为了让开发人员更方便的下载使用
  - `npm install ** `

### Node.js 能做什么

- Web 服务器后台
- 命令行工具
  - npm(基于node开发)
  - git(基于c语言开发)
  - hexo(基于node开发的)
  - ...
- 对于前端开发来讲，接触 Node 最多的就是它的命令行工具
  - 自己写的很少，主要用别人的第三方的
  - webpack
  - gulp
  - npm

### Node.js能学到什么

- B/S 编程模型
  - Browser - Server
  - back - end
  - 任何服务端技术这种 BS 编程模型都一样，和语言无关
  - Node 只是作为学习 BS 编程模型的一个工具而已
- 模块化编程
  - RequireJS
  - SeaJS
  - `@import('文件路径')`
  - 以前认知的 JavaScript 只能通过 `script`标签来加载
  - 在 Node 中可以像 `@import()`一样来引用加载 JavaScript脚本文件
- Node 常用API
- 异步编程
  - 回调函数`callback`
  - Promise
  - async
  - generator
- Express Web 开发框架
- EcmaScript 6
  - 只是一个新的语法而已
- ...




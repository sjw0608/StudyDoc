# 性能优化

## 1. 基于 `HTTP` 网络层的前端性能优化

### 1.1 从输入URL地址到看到页面，中间经历了什么

#### 1.1.1 第一步：URL解析

- 域名解析

```
http://user:pass@www.baidu.com:443/index.html?user-a&psw=sd#video
```

**http**：协议
**user:pass** ：登录信息（认证）
**www**：服务器名
**baidu.com**：域名
**443**：端口号（https默认端口号）
**index.html**：请求资源文件路径
**user-a&psw=sd**：查询字符串
**#video**：片段标识符，HASH值

- 编码解析

1.对整个URL编码，处理空格/中文
*编码:encodeUR*, 解码：decodeURI
2.对传递参数信息编码
*encodeURIComponent*，*decodeURIComponent*

#### 1.1.2 第二步：缓存检查(产品性能优化重点)

先检测是否存在强缓存，若有并且没有获取失败，走强缓存，若没有，检测协商缓存 若协商缓存获取成功则走协商缓存，若失败，则获取最新缓存

```
缓存位置：
	- Memory cache: 内存缓存
	- Disk Cache: 硬盘缓存
```

**打开网页**：查找 Disk Cache 中是否有匹配，如有则使用，如没有则发送网络请求

**普通刷新(F5)**：因TAB(页面)没有关闭，因此 Memory cache 是可用的，会优先使用，其次才是 Disk Cache

**强制刷新（Ctrl+F5)**：浏览器不使用缓存，因此发送的请求头部均带有 Cache-control：no-cache，服务器直接返回 200 和 最新内容

- 强缓存

  :red_circle: 强缓存分为Expires(http1.0)和Cache-Control(http1.1)

```
浏览器对于强缓存的处理：根据第一次请求资源是返回的响应头来确定
- Exprise：缓存过期时间，用来指定资源到期的时间（HTTP/1.0）
- Cache-Control：cache-control：max-age=2592000 第一次拿到资源后的2592000秒内（30天），再次发送请求，读取缓存中的信息（HTTP/1.1）
- 两者同时存在的话，Cache-Control优先级高于Exprise
```

- 如果服务器文件更新了，但是本地还是有缓存，这样就拿不到最新的信息了。解决方案
  - 1）HTML 页面一般不做强缓存，目的：每一次HTML的请求都是走正常的HTTP请求
  - 2）服务器更新资源后，让资源名称和之前不一样，这样页面导入全新的资源
  - 3）当文件更新后，我们在HTML导入的时候，设置一个后缀（时间戳）

- 协商缓存(和服务器协商，携带缓存表示，向服务器发起请求，分为Last-Modified , If-Modified-Since 和 ETag , If-None-Match )

  - **Last-Modified** 资源最后更新时间，以秒为单位
  - **ETag** 记录一个标识，资源更新重新生成
  - **If-Modified-Since**比较两次时间判断是否有修改，假如没有修改，则命中协商缓存，浏览器从缓存中读取资源，如果没有命中，资源有过修改，返回新的Last-Modified时间和服务器资源
  - **If-None-Match**服务器比较请求头中的If-None-Match和当前资源中的etag是否一致，来判断资源是否修改过，如果没有修改，则命中缓存，浏览器从缓存中读取资源，如果修改过，服务器会返回新的etag，并返回资源；

  :red_circle: 协商缓存：Last-Modified / ETag

```
- 服务器收到请求准备内容
- Last-Modified：资源文件最后更新的时间，只能精确到秒
- ETag：记录的是一个标识（也是根据资源文件更新时间生成的，每一次资源更新都会重新生成一个 ETag）
```

- 数据缓存（检测 vuex，redux，localStorage）

**强缓存和协商缓存的区别：协商缓存总会和服务器协商，所以一定要发HTTP请求的**

**针对于我们的静态资源文件，而且是不经常更新的**

#### 1.1.3 第三步：NDS解析

> DNS也是有缓存的，如果之前解析过，会在本地有缓存（不一定）

- 本地hosts文件

- 本地DNS缓存
- DNS服务器缓存

- DNS服务器递归查询

**在DNS上优化**

- 减少DNS请求（也个页面中尽可能少用不同的域名：资源都放在相同的服务器上。项目中不会这么做。）
  - 服务器拆分的优势
    - 资源的合理利用
    - 抗压能力加强
    - 提高HTTP并发
    - 。。。
- DNS预获取（DNS Prefetch）

```
<meta http-equiv='x-dnf-prefetch-control' content='on'>
<link rel='dns-prefetch' href='//static.360buyimg.com'/>
```

#### 1.1.4 第四步：TCP三次握手

**目的：建立连接通道**

```
- seq 顺序：用来标识从TCP源端向目的端发送的字节流，发起方发送数据时对此进行标记
- ack 确认顺序，只有ACK标志位为1时，确认序号字段才有效，ack=seq+1
- 标志为
	+ ACK：确认序号有效
	+ RST：重置连接
	+ SYN：发起一个新连接
	+ FIN：释放一个连接
	+ ...
```

:warning: 三次握手为什么不用两次，或者四次？

TCP 作为一个可靠传输控制协议，其核心思想：既要保证数据可靠传输，又要提高传输的效率。两次不能保证是否建立成功，四次有点浪费

#### 1.1.5 第五步：数据传输

- HTTP 报文
  - 请求报文
  - 响应报文
- 响应状态码
  - 200 OK
  - 202 Accepted：服务器已接受请求，但尚未处理（异步）
  - 204 Not Content：服务器成功处理了请求，但不需要返回任何实体内容
  - 206 Partial Content：服务器已经成功处理了部分GET请求（断点续传 Range/If-Range/Content-Range.Content-Type："multipart/byteranges"/Content-Length...）
  - 301 Moved Permanently
  - 302 Moved Temporarily
  - 304 Not Modified
  - 305 Use Proxy
  - 400 Bad Request:请求参数有误
  - 401 Unauthorized：权限（Authorization）
  - 404 Not Found
  - 405 Method Not Allowed
  - 408 Request Timeout
  - 500 Internal Server Error
  - 503 Service Unavailable
  - 505 HTTP Version Not Supported
  - ...

#### 1.1.6 第六步：TCP四次挥手

客户端和服务器建立好连接通道之后，客户端把数据传递给服务器。开始发送释放TCP的操作。

服务器返回给客户端信息：

- 回馈
- 准备数据，再给客户端数据

:warning: 为什么连接的时候是三次握手，关闭的时候确实四次挥手？

- 服务器端收到客户端的SYN连接请求报文后，可以直接发送SYN+ACK报文
- 但关闭连接时，当服务器收到FIN报文时，很可能并不会立即关闭连接，所以只能先回复一个ACK报文，告诉客户端：“你发的FIN报文我收到了”，只有等到服务器端所有的报文都发送完了，我才会发送FIN报文，因此不能一起发送，故需要四次挥手

`Connection：keep-alive` 保证TCP通道建立完成后，可以不关闭;HTTP1.0需要自己手动设置，HTTP1.1版本后，默认就是这样的

**HTTP1.0 和HTTP1.1的区别**

- **缓存处理**，HTTP1.0种主要使用Last- Modified，Expiees来做为缓存判断的标准，HTTP1.1则引入来更多的缓存控制策略：ETag，Cache-Control...
- **带宽优化及网络连接的使用**，HTTP1.1支持断点续传，即返回码是 `206`
- **错误通知的管理**,在HTTP1.1种新增了24个错误状态响应码，如：409 表示请求的资源与资源的当前状态发生冲突；410 表示服务器上的某个资源被永久性的删除...
- **Host头处理**，在HTTP1.0中认为每台服务器都绑定一个为一的IP地址，因此，请求消息中的URL并没有传递主机名。但随着虚拟主机技术的发转，在一台物理服务器上可以存在多个虚拟主机，并且它们共享一个IP地址。HTTP1.1的请求消息和相应消息都支持Host头域，且请求消息中如果没有Host头域回报告一个错误（400 Bad Request）
- **长连接**，HTTP1.1中默认开启`Connection：keep-alive`，一定程度上弥补了HTTP1.0每次请求都要创建连接的缺点

**HTTP2.0和HTTP1.X相比的新特性**

- **新的二进制格式(Binary Format)**，HTTP1.x的解析时基于文本，基于文本协议的格式解析存在天然缺陷，文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认0和1的组合，基于这种考虑HTTP2.0的协议解析决定采用二进制格式，实现方便且健壮
- **header压缩**，HTTP1.x的header带有大量信息，而且每次都要重复发送，HTTP2.0使用encoder来减少需要传输的header大小，通讯双方各自cache一份header fields表，既避免了重复header的传输，又减小了需要传输的大小
- **服务端推送（server push）**，例如我的网页有一个style.css的请求，在客户端收到style.css 数据的同时，服务端会将style.js的文件推送给客户端，当客户端再次尝试获取style.js时就可以直接从缓存获取到，不用再发请求了

**多路复用（MultiPlexing）**

```
- HTTP/1.0 每次请求响应，建立一个TCP连接，用完关闭
- HTTP/1.1 【长连接】若干个请求排队串行化单线程处理，后面的请求等待前面的返回才能获得执行机会，一旦有某请求超时等，后续请求只能被阻塞，毫无办法，也就是人们常说的线头阻塞
- HTTP/2.0 【多路复用】多个请求可同时在一个连接上并行执行，某个请求任务耗时严重，不会影响其它连接的正常的执行
```

#### 1.1.7 第七步：页面渲染

### 1.2 优化

- 利用缓存
  - 对于静态资源文件实现强缓存和协助缓存
  - 对于不经常更新的接口数据采用本地存储做数据缓存
- DNS优化
  - 分服务器部署，增加HTTP并发性（导致DNF解析变慢：DNF预解析）
  - DNS Prefetch
- TCP的三次握手和四次挥手
  - Connection：keep-alive
- 数据传输
  - 减少数据传输的大小
    - 内容或者数据压缩
    - 服务器端一定要开启GZIP压缩
    - 大批量数据分批次请求（例：下拉刷新或者分野，保证首次加载请求数据少）
  - 减少HTTP请求的次数
    - 资源文件合并处理
    - 字体图标
    - 雪碧图 CSS-Sprit
    - 图片的BASE64
- CDN服务器 “地域分布式”
- 采用HTTP2.0

> 网络优化是前端性能优化中的重点内容，因为大部分的消耗都发生在网络层，尤其是第一次页面加载，如何减少等待时间很重要 “减少白屏的效果和时间”
>
> - LOADDING 人性化体验
> - 骨架屏：客户端骨架屏+服务器骨架屏
> - 图片延迟加载
> - 。。。

## 2. 代码编译层优化 `webpack`

## 3. 代码运行层优化

## 4. 安全优化


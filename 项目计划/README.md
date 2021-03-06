# 项目策划

## 1. 项目技术

- 后端
  - Node.js
  - 框架 express
- 前端
  - Vue
  - 组件库 Element-ui
- 数据库
  - MySql

## 2. 项目界面、路由及访问权限

### 2.1 登录

| 路由   | 请求方式 | 请求参数                                                 | 权限 | 备注     |
| ------ | -------- | -------------------------------------------------------- | ---- | -------- |
| /login | post     | username: 登录用户名（手机号码）<br />password: 登录密码 | 无   | 登录接口 |

### 2.2 注册

| 路由      | 请求方式 | 请求参数                                                     | 权限 | 备注     |
| --------- | -------- | ------------------------------------------------------------ | ---- | -------- |
| /register | post     | username: 登录用户名（手机号码）<br />password: 登录密码<br />code：验证码 | 无   | 注册接口 |

### 2.3 修改密码

| 路由            | 请求方式 | 请求参数                                               | 权限 | 备注     |
| --------------- | -------- | ------------------------------------------------------ | ---- | -------- |
| /updatePassword | post     | username: 登录用户名（手机号码）<br />password: 新密码 | 登录 | 修改密码 |

### 2.4 找回密码

| 路由          | 请求方式 | 请求参数                                                     | 权限 | 备注     |
| ------------- | -------- | ------------------------------------------------------------ | ---- | -------- |
| /findPassword | post     | username: 登录用户名（手机号码）<br />password: 新密码<br />code: 验证码 | 无   | 找回密码 |

### 2.5 首页

### 2.6 个人中心

| 路由            | 请求方式 | 请求参数                                                     | 权限 | 备注         |
| --------------- | -------- | ------------------------------------------------------------ | ---- | ------------ |
| /userInfo       | Get      | userId: 用户Id                                               | 登录 | 用户信息     |
| /updateUserInfo | Post     | Username:用户昵称<br />phone：用户手机号码<br />email：电子邮箱<br />gender：性别<br />avatar：头像<br />birthday：生日<br />address：地址 | 登录 | 修改用户信息 |


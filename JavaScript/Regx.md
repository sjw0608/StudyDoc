# 正则

## 什么是正则

> 是一个用来处理字符串的规则
>
> - 正则只能用来处理字符串
> - 处理一般包含两方面
>   - 验证当前字符串是否符合某个规范“正则匹配”
>   - 把一个字符串中符合规则的字符获取到“正则捕获”
>
> 每一个正则都是由“元字符”、”修饰符“两部分组成

```js
// 1. 创建正则的两种方式
let reg1 = /^\d+$/g; // 字面量方式
let reg2 = new RegExp("^\\d+$","g") // 构造函数方式
// 2. 正则两个斜杠之间包起来的都是“元字符”，斜杠后面出现的都是“修饰符”
```

## 常用的修饰符

- `i` : ignoreCase 忽略大小写
- `m`：multiline 多行匹配
- `g`：global 全局匹配

## 常用的元字符

- 特殊元字符
  - `\d`  0～9之间的一个数字 
  - `\D` 非0～9之间的任意字符
  - `\w` “数字、字母、下划线”中的任意一个
  - `\W` 除“数字、字母、下划线”中的任意一个
  - `\s` 匹配任意一个空白字符串（包括\t制表符【TAB键四个空格】）
  - `\b` 匹配边界符
  - `\n` 匹配一个换行符
  - `\` 转义字符（把一个普通字符转义为特殊的字符，例如：`\d`;把有特殊含义的转换为普通意思,例如：`\.`此处的点就不是任意字符，而是一个小数点）
  - `^` 以某个元字符开头
  - `$` 以某个元字符结尾
  - `x|y` x或者y中的任意一个
  - `[xyz]` x或者y或者z中的任意一个 ,`[^xyz]` 除了x、y、z以外的任意字符
  - `[a-z] ` 获取a-z中的任意一个字符,` [^a-z]` 除了a-z的任意字符
  - `()` 正则分组
  - `(?:)` 当前分组只匹配不捕获
  - `(?=)` 向上预查
  - `(?!)` 负向预查
- 量词元字符：让其左边的元字符出现多少次
  - `*` ：出现领导多次
  - `?` : 出现零到一次
  - `+` ：出现一到多次
  - `{n}`：出现n次
  - `{n,}`：出现N到多次
  - `{n,m}`：出现N到M次
- 普通元字符
  - 只要在正则中出现的元字符（在基于字面量方式创建），除了特殊和量词意义以外的，都是普通元字符

### `[]`的作用

> 中括号的一些细节
>
> - 在中括号中出现的元字符一般都是代表本身含义的
> - 中括号中出现的两位数，不是两位数字，而是两个数字中的任意一个
>   - `/^[12-65]$/` 这个正则的意思是 1或者 2～6或者5

```js
// 年龄：18～65之间
let reg = /^((1[8,9])|([2-5]\d)|(6[0-5]))$/
// 匹配 "[object AAA]"
let reg = /^\[object .+\]$/
```



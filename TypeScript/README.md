# TypeScript学习

## 1. 环境配置和搭建

### 1.1、什么是TypeScript

> `TypeScript` 是 `JavaScript` 的超集，遵循最新的 `ES5/ES6` 规范。`TypeScript` 扩展了`JavaScript`语法

- TypeScript 更像后端JAVA，让`js`可以开发大型企业应用
- TS提供的类型系统可以帮助我们在写代码时提供丰富的语法提示
- 在编写代码是会对代码进行类型检查从而避免很多线上错误

> `TypeScript` 不会取代 `JS`

### 1.2、环境配置

#### 1.2.1 全局编译`TS`文件

全局安装`typeScript` 对 `TS` 进行编译

```shell
npm install typescript -g
tsc --init # 生成tsconfig.json
```

```shell
tsc # 可以将ts文件编译成js文件
tsc --watch # 监控ts文件变化生成的js文件
```

#### 1.2.2 配置 `webpack/rollup` 环境

- 安装依赖

```shell
npm install rollup typescript rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-serve -D
```

- 初始化 `TS` 配置文件

```shell
npx tsc --init
```

- `webpack` 配置操作

```js
// rollup.config.js
import ts from 'rollup-plugin-typescript2'
import {nodeResolve} from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import path from 'path'
export default {
    input:'src/index.ts',
    output:{
        format:'iife',
        file:path.resolve('dist/bundle.js'), 
        sourcemap:true // tsconfig.json 要对应的修改
    },
    plugins:[
        nodeResolve({
            extensions:['.js','.ts']
        }),
        ts({
            tsconfig:path.resolve(__dirname,'tsconfig.json')
        }),
        serve({
            open:true,
            openPage:'/public/index.html',
            port:3000,
            contentBase:''
        })
    ]
}
```

- `package.json` 配置

```json
"scripts": {
      "dev": "rollup -c -w"
}
```

> 我们可以通过`npm run start`启动服务来使用typescript了～

## 2. 基础类型

> 所有的类型都在冒号的后面，ts的核心一切都以安全为准

### 2.1 布尔、数字、字符串类型

```typescript
let num1:number = 1
let num2:Number = 1 // 用来描述实例的，类也可以当作类型
let num3:Number = new Number(1)

let num:number = 1 // 数字类型
let str:string = 'typeScript' // 字符串类型
let bool:boolean = true // 布尔类型
```

### 2.2 元组类型

> 要求：限制长度个数、类型一一对应。 不能通过与索引更改元组
>
> 数据交换会用到元组

```typescript
let tuple:[string,boolean,number] = ['a',true,1] // 初始化的时候必须按照要求填入数据
tuple.push('str') // 再放入的时候 可以放入元组中定义的类型
```

### 2.3 数组类型

> 数组的概念：一类类型的集合，声明数组中元素数据类型

```typescript
let arr1:number[] = [1,2,3];
let arr2:string[] = ['1','2','3'];
let arr3:(number|string)[] = [1,'2',3]; // 表示数组里面可以是数字也可以是字符串
// 如果数组里面放的内容是无规律的使用 `any[]` 
let arr4:any[] = ['',1,{}]
// 泛型方式来声明
let arr4:Array<number | string> = [1,'2',3]; 
```

### 2.4 枚举类型

> ts 最终编译成js,是没有类型的，只是开发时候使用的

- 普通枚举

```typescript
enum ROLE{ // 大写是规范
  USER, // 默认从0开始
  ADMIN,
  MANAGER
}
// {0: "USER", 1: "ADMIN", 2: "MANAGER", USER: 0, ADMIN: 1, MANAGER: 2}
```

> 可以枚举，也可以反举，但是限于索引，会根据上一个人的值进行自动的推断

```js
// 编译后的结果
(function (USER_ROLE) {
    USER_ROLE[USER_ROLE["USER"] = 0] = "USER";
    USER_ROLE[USER_ROLE["ADMIN"] = 1] = "ADMIN";
    USER_ROLE[USER_ROLE["MANAGER"] = 2] = "MANAGER";
})(USER_ROLE || (USER_ROLE = {}));
```

- 异构枚举

```typescript
enum USER_ROLE {
    USER = 'user',
    ADMIN = 1,
    MANAGER,
}
```

- 常量枚举

```typescript
const enum ROLE{ // 加上const后 不生成一个对象了（更简洁），不支持反举
  USER, // 默认从0开始
  ADMIN,
  MANAGER
}
console.log(USER_ROLE.USER)// console.log(0 /* USER */);
```

### 2.5 `any` 类型

> 不进行类型检测

```typescript
let arr:any = ['ts',true,{name:'js'}]
```

### 2.6 `null` 和 `undefined`

> 任何类型的子类型,如果`strictNullChecks`的值为true，则不能把null 和 undefined付给其他类型

```typescript
let name:number | boolean;
name = null;
```

### 2.7 `void` 类型

> void 的值只能接受null和undefined。一般用于函数的返回值，也可以描述变量；严格模式下不能把 null 赋予给void类型

```typescript
let a:void;
a = undefined;
```

### 2.8 `never` 类型

> 任何类型的子类型,never代表不会出现的值。不能把其他类型赋值给never
>
> 出错、死循环、永远走不到的判断

```typescript
function error(message: string): never {
    throw new Error("err");
}
function loop(): never {
    while (true) { }
}
function fn(x:number | string){
    if(typeof x == 'number'){

    }else if(typeof x === 'string'){

    }else{
        console.log(x); // never
    }
}
```

### 2.9 `Symbol` 类型

> Symbol表示独一无二

```typescript
const s1 = Symbol('key')
const s2 = Symbol('key')
console.log(s1 == s2); // false
```

### 2.10 `BigInt` 类型

>`number`类型和`bigInt`类型是不兼容的

```typescript
const num1 = Number.MAX_SAFE_INTEGER + 1;
const num2 = Number.MAX_SAFE_INTEGER + 2;
console.log(num1 == num2)// true


let max: bigint = BigInt(Number.MAX_SAFE_INTEGER)
console.log(max + BigInt(1) === max + BigInt(2))
```

### 2.11 `object` 对象类型

> `object`表示非原始类型

```typescript
let create = (obj:object):void=>{}
create({});
create([]);
create(function(){})
```


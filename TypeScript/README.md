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

## 3. 联合类型

- 如果不进行初始化操作，，必须要给类型，否则都是any
- 默认联合类型在没有确定类型之前，只能调用两个类型共同的方法
- 在变量确定类型后，可以设置对应的放大
- 如果赋予子类型后，可以根据上下文自动推断对应类型的方法

```ts
const ele:HTMLElement|null = document.getElementById('app')
// 非空断言 表示这个东西一定有之，告诉ts，按照我的想法来，如果后续出错我负责，一定不为空 
// 直接强转某个类型，强转告诉人家 这个类型就是里面的某一个，强转要求必须联合类型中才行
ele!.innerHTML = 'abc'

let a:string|number|undefined
(a as any) as boolean; // 双重断言，先转换成any，再转换成一个具体的类型，问题是会导致类型出现错误 

type IType = 'a'|'b'|'c' // 类型别名
let type:IType = 'a' 
```

## 4. 函数

- 对函数增加类型
  - 对函数的参数进行类型校验
  - 对函数的返回值进行类型校验
  - 对函数本身来校验

```ts
// 函数关键字 写完后会对当前函数 自动推断类型 
function sum(x:number,y:string):string{ // 函数括号后面放入是返回迟类型 
  return x+y
}

// ? 表示参数可以传递或者不传递
// 可以使用剩余运算符
// js中默认值和可选参数不能一起使用
function sum2(x:number,y?:number,...args:number[]):number{
  return x+(y as number)
}

// 函数重载
// 一个方法 根据参数的不同实现不同的功能，ts目前的就是根据不同的参数返回类型
function toArray(value:number):number[]
function toArray(value:string):string[]
function toArray(value:string|number){ // 重载方法在真实方法的上面
  if(typeof value == 'string'){
    return value.split('')
  }else{
    return value.toString().split('').map(item=>Number(item))
  }
}
```

## 5. 类

- `public` 是属性修饰符，声明的变量会添加到实力上，无需再次声明。 表示自己和子类 和子类之外的实例都可以访问
- `private` 就是只有自己能访问的属性
- `protected `只有自己和自己的后辈可以访问，实例不能访问
- `readonly` 仅读，如果在初始化完毕后不能再修改了，如果是对象可以更改属性

> 我们可以给构造函数添加修饰符，如果被标识成`protected ` 说明不能被 `new `了，如果标识成`private` 说明不能继承了，同时也不能被`new`了

```ts
class Pointer{
  constructor(public x:number,public y:number){ // 在constructor中的操作都是初始化操作
    this.x = x
    this.y = y
  }
 
}

class Animal{
   constructor(public name:string,public age:number){
   }
   // 静态属性 es7语法
  static type = 'Animal'
  // 属性访问器 es6的写法
  // static get type(){
  //   return 'Animal'
  // }
  say(){ // 原型方法`super`指向父类的原型
    console.log('Animal')
  }
  private str:string = ''
  get count(){
    return this.str
  }
  set coune(newVal:string){
    this.str = newVal
  }
}

class Cat extends Animal{
   constructor(name:string,age:number,public address:string){
     super(name,age)
   }
}

```

- `static` 静态方法可以被继承，`super`默认在构造函数中和静态方法中都指向自己的父类
- 原型方法直接写就是原型方法，`super`指向父类的原型；可以通过属性访问器定义原型属性 

### 5.1 装饰器

> 是一个实验性语法 后面会有改动
>
> 作用：扩展类、扩展类中的属性和方法，不能修饰函数，函数会有变量提升的问题

```ts
// function addSay(target:string){}
// @addSay // addSay(Person)

function eat(target:any){ // target => 类
  target.prototype.eat = function (){
    console.log('eat')
  }
}
function toUpperCase(target:any,key:string){ // target => 原型，key就是修饰的属性
  let val:string = ''
  Object.defineProperty(target,key,{ // 原型定义属性
    get(){
      return val.toUpperCase()
    },
    set(newVal:string){
      val = newVal
    }
  })
}
function double(num:number){
  return function(target:any,key:string){ // target => 类
    let v = target[key]
    Object.defineProperty(target,key,{ // 原型定义属性
    	get(){
      	return num * v
    	}
  	})
  }
}
function Enum(bool:boolean){
  return function(target:any,key:string,descriptor:PropertyDescriptor){ // target => 原型
    descriptor.enumerable = bool
  }
}
@eat
class Person{
  eat !: ()=>void
  @toUpperCase
	public name:string="zs"
	@double(2)
	static age:number = 18 // 静态的通过类来调用
	@Enum(false)
	drink(){}
}
let p = new Person()
p.eat() // 'eat'
console.log(p.name) // 'ZS'
console.log(p.age) // 36 
```

## 6. 接口

> `interface`： 描述对象的形状和结构，可以给数据增添类型 而且方便复用。可以被类实现和继承，不能使用联合类型
>
> type 的方式 通过别名来重新定义类型。可以使用联合类型，不能被类实现和继承

### 6.1 如何用接口描述对象类型，如果有联合类型，就使用`type`

```ts
// type IObj = {name:string,age:number} | string
interface IObj1 {
  name:string,
  age:number
}
const getObj = (obj:IObj) =>{}
getObj({name:'zs',age:18})
```

### 6.2 描述函数类型

```ts
interface ISum {
  (a:string,b:string):string
}
// type ISum = (a:string,b:string) => string
const sum:ISum = (a,b):string=>{
  return a+b
}

// 我希望写个计时器的例子，每次调用函数就累加1
interface ICount { // 接口中的混合类型
  (): number,
  count: number
}
const fn:ICount = (() => { // 函数返回函数 一般要标识函数的返回类型
  return ++fn.count
}) as ICount
fn.count = 0
console.log(fn())
```

### 6.3 接口的特性

```ts
// interface IVegetables{
//   color:string,
//   taste:string
// }
// 1) 直接断言，断言后可以直接使用（要保证接口中限制的数据必须要有）
// const tomato:IVegetables = {
//   color:'red',
//   taste:'sweet',
//   size:'big'
// } as IVegetables

// 2) 接口合并，接口同名会合并，会改变原有的接口
// interface IVegetables{
//   size:string
// }
// const tomato:IVegetables = {
//   color:'red',
//   taste:'sweet',
//   size:'big'
// }

// 3）单独写一个tomato接口 继承IVegetables接口
// interface ITomato extends IVegetables{ // 接口的继承
//   size:string
// }
// const tomato:ITomato = {
//   color:'red',
//   taste:'sweet',
//   size:'big'
// }

// 4）可选属性，可以通过`?`来实现
interface IVegetables{
  color:string,
  taste:string，
  size?:string， // 函数的参数
  [key: string]:any // 任意接口 可多填
}
const tomato:IVegetables = {
  color:'red',
  taste:'sweet'
}

// 5）可索引接口
interface ILikeArray{
  [key: number]:any
}
let arr:ILikeArray = [1,2,3]
let arr1:ILikeArray = {1:1,2:2}

// 6）接口的实现，接口可以被类来实现，接口中的方法都是抽象（没有具体实现）的
 interface ISpeakable{
   name:string,
   // 用接口来形容类的时候，void 表示不关心返回值
   speak():void // 描述当前实例上的方法，或者原型的方法
 }
 class Speak implements ISpeakable{ // 类本身需要实现接口中的方法
   name!:string
   speak:()=>void
   // constructor(){
   //   this.speak = function(){}
   // }
   speak():string{
     return 'xxx'
   }
 }
 
 // 7）抽象类，不能被 new ，可以被继承
 abstract class Animal{ // 只有类被标记成 abstract 属性才可以描述成 abstract 的
   abstract name:string // 没有具体实现，需要子类实现
   eat (){}
   abstract drink():void
}
class  Cat extends Animal{
  drink:void(){}
  name!:string
}

// 8) 可以用接口来描述实例
let instance:any
// type IPerson = (name:string)=>Person // 描述的是构造函数类型
interface IPerson<T> {
  new (name:string):T
}
function createInstance<T>(clazz:IPerson<T>,name:strig){
  if(instance) return instance
  return new clazz(name)
}
class Person {
  constructor(public name:string){}
}
class Dog{
   constructor(public name:string){}
}
// let r = createInstance<Person>(Person,'zs') // 类可以充当类型，可以描述实例
let d = createInstance<Dog>(Dog,'dm')
```

> - 把一个对象赋值给一个接口，要满足接口中的所有属性
> - 如果多出来的属性，可以采用：断言、可选属性、任意接口来描述
> - 接口中的类型，可以通过类型别名的方式拿出来，但是智能用`[]`语法

## 7. 泛型

> 泛型就是只有当使用的时候才能确定类型，通过参数传入类型
>
> 泛型的用处：当我们调用的时候确定类型，而不是一开始就写好类型，类型不确定，只有在执行的时候才能确定

```ts
// 1） 单个泛型 声明的时候，需要应 <> 包裹起来，传值的时候也需要
function createArray<T>(times:number,value:T):T[]{ // 根据数据对应参数的类型给T赋值
  let result = []
  for(let i = 0;i<times;i++){
    result.push(value)
  }
  return result
}
let r = createArray<string>(5,'abc')
// 如果泛型不传参是unkown类型
interface IMyArr<T>{
  [key:number]:T
}
interface ICreateArray {
  <T>(x:number,y:T):IMyArr<T>; // interface 后面的类型和函数前面的类型的区别，如果放在函数前，表示使用函数的时候确定了类型；放在接口的后面，表示使用接口的时候确定类型
}
// type ICreateArray = <T>(x:number,y:T):Array<T>
const createArray:ICreateArray = <T>(times:number,value:T):IMyArr<T>{ // 根据数据对应参数的类型给T赋值
  let result = []
  for(let i = 0;i<times;i++){
    result.push(value)
  }
  return result
}

// 2）多个泛型 元组进行类型交换
const swap = <T,K>(tuple:[T,K]):[K,T] =>{
  retutn [tuple[1],tuple[0]]
}
swap<string,number>(['abc',123]) // => [123,'abc'] 

// 3）泛型约束 主要强调类型中必须包含某个属性
// const sum = <T extends string> (a:T,b:T):T{ // 约束对象
//   return (a+b) as T
// }
// sum(1,2)
type withLen = {length:number}
const computeArrayLength = <T extends withLen, K extends withLen>(arr1,arr2):number=>{
  return arr1.length+arr2.length
}
computeArrayLength([1,2,3],{length:3})

const getVal = <T extends objec,K extends keyof T>(obj:T,key:K){
}
getVal({a:1,b:2},'a')
```


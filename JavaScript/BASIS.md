

## 变量提升机制

### 条件判断下的变量提升

```js
if(true){
   console.log(fn) // =》 函数本身：当条件成立，进入到判断体中（在ES6中他是一个块级作用域）第一件事情不是代码执行，而是类似于变量提升一样，先把FN声明和定义了，也就是判断体中代码执行之前，FN就已经赋值了
   function fn(){ console.log('ok') }
}
```

### 变量声明重名问题

- 带VAR和FUNCTION关键字声明相同的名字，这种也算事重名了
- 关于重名的处理：如果名字重复了，不会重新的声明，但是会重新的定义（重新赋值）【不管是变量提升，还是代码执行皆是如此】

```js
fn() // 4
function fn(){ console.log(1) }
fn() // 4
function fn(){ console.log(2) }
fn() // 4
var fn = 100 // => 带VAR的在提升阶段只把声明处理了，赋值操作没有处理，所以在代码执行阶段需要完成赋值
fn() // TypeError: fn is not a function
function fn(){ console.log(3) }
fn()
function fn(){ console.log(4) }
fn()
```

### ES6不存在变量提升机制

> 在ES6中基于 LET/CONST 等方式创建变量或函数，不存在变量提升机制
>
> 切断了全局变量和WINDOW属性的映射机制（不管用什么方式在当前作用域下声明了变量，再次使用LET创建都会报错）
>
> 在相同作用域中，基于LET不能声明相同的变量虽然没有变量提升机制，但是在当前作用域代码自上而下执行之前，浏览器会做一个重复性检测（语法检测）：自上而下查找当前作用域下所有变量，一旦发现有重复的，直接抛出异常，代码也不会在执行了（虽然没有吧变量提前声明定义，但是浏览器已经记住了当前作用域下有哪些变量）。

```js
let a = 10,
    b = 10;
let fn = ()=>{
  // console.log(a,b); // 直接报错
  let a = b = 20;
  console.log(a,b);
}
fn();
console.log(a,b);
```

```js
var a = 12 
if(true){
  console.log(a) // Uncaught ReferenceError: a is not defined
  let a = 13 // => 基于LET创建变量，会把大部分{}当做一个私有的块级作用域（类似于函数的私有作用域），在这里也是重新检测语法规范，看一下是否是基于新语法创建的变量，如果是按照新语法规范来解析
}
```

### 暂时性死区

```js
// console.log(typeof a) // undefined 在原有浏览器渲染机制下，基于typeof等逻辑运算符检测一个未被声明过的变量，不会报错，返回 undefined

console.log(typeof a) // Uncaught ReferenceError: a is not defined
let a
```

### 区分私有变量和全局变量

```js
var a = 12,b=13,c=14;
function fn(a){
  // 在私有做域中只有以下两种情况是私有变量
  // A：声明过的变量（带VAR/FUNCTION）
  // B：形参也是私有变量
  // 剩下的都不是自己私有的变量，都需要基于作用域链的机制向上查找
  console.log(a,b,c) // 12 undefined 14
  var b = c = a = 20
  console.log(a,b,c) // 20 20 20 
}
fn(a)
console.log(a,b,c) // 12 13 20 
```

```js
var ary = [12,13]
function fn(ary){
  // 形参赋值 ary = 全局ary的堆空间地址
  console.log(ary) // [12,13]
  ary[0] = 100 // => 全局ary: [100,13]
  ary = [100] // => 新创建了一个队空间存储 函数私有ary:[100]
  ary[0] = 0
  console.log(ary) // 私有ary : [0]
}
fn(ary)
console.log(ary)// [100,13] 
```

### 查找上级作用域

```js
// 当前函数执行，形成一个私有作用域A，A的上级作用域是谁，和他在那执行没有关系，和他在那创建的有关系，在哪创建，它的上级作用域就是谁
var a = 12
function fn(){
  console.log(a)
}
function sum(){
  var a = 120
  fn()
}
sum() // 12

function fn(){
  // arguments:实参集合
  // arguments.callee:函数本身FN
  // arguments.callee.caller:当前函数在哪执行的，caller就是谁（记录的是它执行的宿主环境），在全局下执行caller的结果是NULL
  console.log(arguments)
}
function sum(){
  var a = 120
  fn()
}
sum()
// 练习
var n = 10
function fn(){
  var n = 20
  function f(){
    n++
    console.log(n) 
  }
  f()
  return f
}
let x = fn() // 21
x() // 22
x() // 23
console.log(n) // 10
```

## 闭包及堆栈内存释放

> JS中内存分为堆内存和栈内存
>
> 堆内存：存储引用数据类型值（对象：键值对 函数：代码字符串）
>
> 栈内存：提供JS代码执行的环境和存储基本类型值
>
> 【堆内存释放】
>
> 让所有引用堆内存空间地址的变量赋值为null即可（没有变量占用这个堆内存，浏览器在空闲的时候会把他释放掉）
>
> 【栈内存释放】
>
> 一般情况下，当函数执行完成，所形成的私有作用域（栈内存）都会自动释放掉（在栈内存中存储的值也都会释放掉），但是也有特殊不销毁的情况：
>
> - 1.函数执行完成，当前形成的栈内存中，某些内容被栈内存意外的变量占用了，此时栈内存不能释放（一旦释放外面找不到原有的内存了）
>
> - 2.全局栈内存只有在页面关闭的时候才会被释放掉
>
>   如果当前栈内存没有被释放，那么之前在栈内存中存储的基本值也不会被释放，能够一直保存下来

```js
// 练习
var i =1
function fn(i){
  return function (n){
    console.log(n+(++i))
  }
}
var f = fn(2) 
f(3) // 6
fn(5)(6) // 12
fn(7)(8) // 16
f(4) // 8
```

### 闭包

> 函数执行形成一个私有的作用域，保护里面私有变量不受外界的干扰，这种保护机制称之为 ‘闭包’
> 市面上的开发者认为的闭包是：形成一个不销毁的私有作用域（私有栈内存）才是闭包
>
> 闭包项目实战应用
>
> 真实项目中为了保证JS的性能（堆栈内存的性能优化），应该尽可能的减少闭包的使用（不销毁的堆栈内存是耗性能的）
>
> 1. 闭包具有"保护"作用：保护私有变量不受外界的干扰
>
> 2. 闭包具有"保存"作用：形成不销毁的栈内存，把一些值保存下来，方便后面的调取使用

```js
for(var i =0;i<tabList.length;i++){
  tabList[i].onclick = function (){console.log(i)}
  // 执行方法，形成私有的栈内存，遇到变量I，不是私有变量，向上一级作用域查找（上级作用域WINDOW）
  // 所有的事件绑定都是异步编程（同步编程：一件事一件事的做，当前这件事没完成，下一个任务不能处理。/ 异步编程：当前这件事情没有彻底完成，不在等待，继续执行下面的任务），绑定事件后，不需要等待执行，继续执行下一个循环任务，所以当我们点击执行方法的时候，循环早已结束（让全局的I等于循环最后的结果3）
}
```

## 面向对象编程（OOP）

### 原型链设计模式（`prototype`&`__ptoto__`）

> 【函数】
>
> 普通函数、类（所有的类：内置类、自己创建的类）
>
> 【对象】
>
> 普通对象、数组、正则、Math、实例是对象类型的（除了基本类型的字面量创建的值）prototype的值也是对象类型的、函数也是对象类型的
>
> 。。。
>
> 1- 所有的函数数据类型都天生自带一个属性：`prototype`（原型），这个属性的值是一个对象，浏览器会默认给他开辟一个堆内存
>
> 2- 在浏览器给prototype开辟的堆内存中有一个天生自带的属性：`constructor`，这个属性存储的值是当前函数本身
>
> 3- 每一个对象都有一个`__proto__`的属性，这个属性指向当前实例所属类`prototype`（如果不能确定它是谁的实例，都是Object的实例）

:red_circle: 原型`prototype`的作用：存储一些公共的属性和方法，供它的实例调取使用

:red_circle: 基类Object的原型上的`__proto__`指向null，因为到最底层类，如果要指向也是指向自己本身

#### 原型链

> 它是一种基于`__proto__`向上查找的机制，当我们操作实例的某个属性或者方法的时候，首先找自己空间中私有的属性或者方法
>
> 1. 找到了，则结束查找，使用自己私有的即可
> 2. 没有找到，则基于`__proto__`找所属类的prototype，若果找到就用这个公有的，如果没找到，基于原型上的`__proto__` 继续向上查找，一直找到Objcet.prototype的原型为止，如果再没有，操作的属性或者方法不存在

> 1. 只要你是个函数（不管是啥类），永远都是内置Function这个类的一个实例

```js
function Fn(){
  var n = 10
  this.AA = function(){
    console.log('aa[1]')
  }
  this.BB = function(){
     console.log('bb[1]')
  }
}
Fn.prototype.AA = function(){console.log('AA[1]')}
var f1 = new Fn()
var f2 = new Fn
console.log(f1.n) // undefined
f1.AA() // aa[1] 
```



### 构造函数设计模式 Constructor

> 基于构造函数创建自定义类(constructor)
>
> 1. 在普通函数执行的基础上“new xxx()”,这样就不是普通函数执行了，而是构造函数执行，当前的函数名称之为“类名”，接收的返回结果是当前类的一个实例
> 2. 自己创建的类名最好第一个单词首字母大写
> 3. 这种构造函数设计模式执行，主要用于组件、类库、插件、框架等的封装，平时写业务逻辑一般不这样处理

```js
function Fn(name,age){
  var n = 10
  this.name = name
  this.age = age + n
}
// 普通函数执行
// 1. 形成一个私有作用域
// 2. 形参赋值
// 3. 变量提升 
// 4. 代码执行
// 5. 栈内存释放问题
fn()
var f = new Fn('xxx',20)
// 构造函数执行
// 1. 像普通函数执行一样，形成一个私有作用域（栈内存）
// 2. 【构造函数执行独有】在JS代码自上而下执行之前，首先在当前形成的私有战中创建一个对象（创建一个堆内存：暂不存储任何的东西），并且让函数中的执行主体（THIS）指向这个新的堆内存（THIS === 创建的对象）
// 3. 代码自上而下执行 
// 4. 【构造函数执行独有】代码执行完成，把之前创建的堆内存地址返回（浏览器默认返回）

// 也就是开始创建的对象其实就是当前Fn这个类的一个实例，我们让this指向这个实例，代码执行中的this.xxx =xxx 都是给实例设置”私有属性“，最后浏览器会把默认创建的实例返回，供外面接收。再次执行new Fn()就是把上面的操作克隆一份，会形成新的实例（新的内存空间），所以说实例是对立分开的
```

> JS中创建值有两种方式
>
> - 字面量表达式
> - 构造函数模式

```js
var obj = {} // 字面量方式
var obj2 = new Object() // 构造函数模式
// 不管是哪一种方式创造出来的都是Object类的实例，而实例之间是独立分开的，所以 var xxx = {} 这种模式就是JS中的单例模式
// 基本数据类型基于两种不同的模式创建出来的值是不一样的
// 基于字面量方式创建出来的值是基本类型值
// 基于构造函数创建出来的是引用类型
// num2是数字类的实例，num1也是数字类的实例，它只是JS表达数字的方式之一，都可以使用数字类提供的属性和方法
let num1 = 12 // typeof num1 == 'number'
let num2 = new Number(12) // typeof num2 == 'object'
```

### 单例模式（Singleton Patter）

```js
// 1. 表现形式
var obj = {
  xxx:xxx
  ...
}
// 在单例设计模型中，OBJ不仅仅是对象名，他被称为“命名空间【NameSpace】”，把描述事物的属性存放到命名空间，多个命名空间是独立分开的，互不冲突

// 2. 作用：把描述同一件事物的属性和特征进行“分组、归类”（存储在同一个堆内存空间中），因此避免了全局变量之间的冲突和污染

// 3. 单例设计模式命名的由来： 每一个命名空间都是JS中Object这个内置基类的实例，而实例之间是相互独立互不干扰的，所以我们称它为“单例：单独的实例”
```

#### 高级单例模式

> 1. 在给命名空间赋值的时候，不是直接赋值一个对象，而是先执行匿名函数，形成一个私有作用域AA（不销毁的栈内存），在AA中创建一个堆内存，把堆内存地址赋值给命名空间
> 2. 这种模式的好处：我们完全可以在AA中创造很多内容（变量OR函数），哪些需要外面调取使用的，我们暴露到返回的对象中（模块化实现的一种思想）

```js
var nameSpace = (function(){
  var n = 12;
  function fn(){
    // todo...
  }
  function sum(){
  }
  return {
    fn:fn,
    sum:sum
  }
})();
```

```js
var n = 2
var obj = {
  n:3,
  fn:(function(n){
    n*=2
    this.n+=2 // 当前this为window
    var n = 5
    return function(m){
      this.n*=2
      console.log(m+(++n))
    }
  })(n)
}
var fn = obj.fn
fn(3) // 9
obj.fn(3) // 10
console.log(n,obj.n) // 8 6
```

> THIS指向
>
> 1. 给当前元素的某个事件绑定方法，当事件触发方法执行的时候，方法中的THIS是当前操作的元素对象
> 2. 普通函数执行，函数中的THIS取决于执行的主体，谁执行的，THIS就是谁（执行主体：方法执行，看方法名前面是否有“点”，有的话，点前面是谁HTIS就是谁，没有THIS就是WINDOW）
> 3. 自执行函数执行，方法中THIS是window

#### 模块化开发

> 1. 团队协作开发的时候，会把 产品按照功能版块进行划分，每一个功能版块有专人负责开发
> 2. 把各个版块之间公用的部门进行提取封装，后期在想实现这些功能，直接的调取引用即可（模块封装）

### 工厂模式（Factory Pattern）

> 1. 把实现相同功能的代码进行“封装”，以此来实现”批量生产“想要实现这个功能，我们只需要执行函数即可
> 2. ”低耦合高内聚“：减少页面中的冗余代码，提高代码的重复使用率

### 函数

函数有三种角色(三种角色间没有什么必然关系)：

- 1.普通函数
  - 堆栈内存释放
  - 作用域链

- 2.类
  - `prototype` 原型
  - `__proto__` 原型链
  - 实例
- 3.普通对象
  - 和普通的一个OBJ没什么区别，就是对键值对的增删改查

```js
// 阿里面试题
function Foo(){
  getName = function(){console.log(1)}
  return this
}
Foo.getName = function(){console.log(2)}
Foo.prototype.getName = function(){ console.log(3) }
var getName = function(){ console.log(4) }
function getName(){ console.log(5) }
Foo.getName() // 2
getName() // 4
Foo().getName() // 1
new Foo.getName() // 2
new Foo().getName() // 3
new new Foo().getName() // 3
```

### call 、apply、bind

> 用来改变某一个函数中THIS关键字指向的

#### call

> - [fn].call([this],[param]...)
>   - fn.call; 当前实例（函数FN）通过原型链的查找机制，找到Function.prototype上的call方法=》function call() {[native code]}
>   - fn.call()：把找到的call方法执行
>   - 当call方法执行的时候，内部处理了一些事情
>     - 首先把要操作的函数中的THIS关键字变为CALL方法第一个传递的实参值
>     - 把CALL方法中第二个及第二个以后的实参获取到
>     - 把要操作的函数执行，并且把第二个以后的传递进来的实参传递给函数
> - call中的细节
>   - 非严格模式下，如果参数不传，或者第一个传递的实null/undefined，THIS都指向WINDOW
>   - 在严格模式下，第一个参数是谁，THIS就指向谁（包括null/undefined），不传THIS是undefined

```js
Function.prototype.mycall = function (){
  let param1 = arguments[0] || window,
      paramOther = [...arguments].slice(1) // 把arg中除了第一个以外的实参获取到
  // =》 this:fn 当前要操作的函数（函数类的一个实例）
  // 把FN中的this关键字修改为 `param1` => 把THIS（call中）中的this关键字修改为param1
   param1.fn = this
  // => 把fn执行，把paramOther分别传递给fn
  var result = param1.fn(...paramOther)
  delete param1.fn
  return result
}
```

#### apply

> apply和call基本上一摸一样，唯一区别在于传参方式
>
> Fn.apply(obj,[10,20]) APPLY 把需要传递给FN的参数放到一个数组（或者类数组）中传递进去，虽然写的是一个数组，但是也相当于给FN一个个的传递

```js
Function.prototype.myapply = function(){
  let param1 = arguments[0] || window,
      paramOther = arguments[1]
  param1.fn = this
  var result
  if(paramOther){
    result = param1.fn(...paramOther)
  }else{
    result = param1.fn()
  }
  delete param1.fn
  return result
}
```

#### bind

>语法和call一摸一样，唯一的区别在于立即执行还是等待执行
>
>fn.call(obj,10,20) 改变FN中的THIS，并且把FN立即执行
>
>fn.bind(obj,10,20) 改变FN中的THIS，此时的FN并没有执行（不兼容IE6～8）


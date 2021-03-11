# DOM

## 操作DOM的属性和方法

- 获取元素或者元素集合

  - getElementById 
    - 上下文只能是document（只有document这个实例的原型链上才能找到这个方法，其它实例都找不到）
    - ID重复了获取第一个
    - IE6～7中会把表单元素的name当作id使用
  - getELementsByTagName
    - 获取当前上下文中，所有子子孙孙中标签名叫做XXX的元素
  - getELementsByClassName
    - IE6～8中不兼容
  - getElementsByName
    - 在IE浏览器中只对表单元素的name起作用
    - 上下文也只能是document
  - querySelector
  - querySelectorAll
    - 不兼容IE6～8
    - 没有DOM映射
  - Document.documentElement
  - Document.body
  - document.head
  - ...

- 描述节点和节点之间关系的属性

  > childNodes:所有子节点
  >
  > children：所有元素子节点（IE6～8中会把注释当作元素节点）
  >
  > parentNode
  >
  > previousSibling / previousElementSibling
  >
  > nextSibling
  >
  > firstChild
  >
  > lastChild

- 动态操作DOM

  - createElement
  - createDocumentFragment
  - appendChild
  - insertBefore
  - cloneNode(true/false)
  - removeChild
  - [set/get/remove]Attribute

- 散

  - xxx.style.xxx =  xxx  设置行内样式
    - xxx.style.xxx  获取行内样式
  - xxx.className = 'xxx'
  - xxx.onclick = function(){}

## JS中的盒模型属性

> 在JS中通过相关的属性可以获取（设置）元素的样式信息，这些属性就是盒子模型属性（基本上是有关于样式的）
>
> 操作浏览器的盒子模型属性，我们一般都要写两套，用来兼容各种模式下的浏览器
>
> 在JS盒子模型13个属性中，只有`scrollTop/Left` 是“可读写”属性，其余都是“只读”属性

- `clientWidth && clientHeight`：获取当前元素可是区域的宽高（内容的宽高+左右/上下的padding），和内容是否有溢出无关（和是否设置了overflow：hidden也无关），就是我们自己设定的内容的宽高+padding

```js
// 获取当前页面一屏幕（可视区域）的宽度和高度
clientWidth = document.documentElement.clientWidth || document.body.clientWidth
clientHeight = document.documentElement.clientHeight || document.body.clientHeight
```

- `clientTop && clientLeft`：获取（上/左）边框的宽度

- `scrollWidth && scrollHeight ` ：真实内容的宽高（不一定是自己设定的值，因为可能会存在内容溢出，有内容溢出的情况下，需要把溢出的内容也算上）+ 左/上 padding，而且是一个约等于的值（没有内容溢出和`clientWidth && clientHeigh`一样）；再不同浏览器中，或者设置`overflow：hidden`都会对最后的结果产生影响，所以这个值仅仅做参考，属于约等于的值

```js
// 获取当前页面的真实宽高（包括溢出的部分）
scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth
scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
```

- `scrollTop && scrollLeft`：滚动条卷去的高度或者宽度
  - 最小卷去值：0
  - 最大卷去值：真实页面的高度。  一屏幕的高度 `document.documentElement.scrollHeight - document.documentElement.clientHeight`
- `offsetWidth && offsetHeight` ：在`client`的基础上加上`border`（和内容是否溢出也没有关系）
- `offsetTop && offsetLeft`：获取当前盒子距离其父级参照物的偏移量（上偏移/左偏移）
  - 当前盒子的外边框开始到父级参照物的内边框
- `offsetParent`：当前盒子的父级参照物
  - 参照物：同一平面中，元素的父级参照物和结构没有必然联系，默认他们的参照物都是`body`（当前平面最外层的盒子）`body` 的父级参照物是NULL
  - 参照物可以改变：构建出不同的平面即可（使用`zIndex`，但是这个属性只对定位有作用），所以改变元素的定位（`position:relative/absolute/fixed`）可以改变父级参照物

### 通过JS盒模型属性获取值的特点

- 获取的都是数组不带单位
- 获取的都是正数，不会出现小数（一般都会四舍五入，尤其是获取偏移量）
- 获取的结果都是复合样式值（好几个元素的样式组合在一起的值），如果指向获取单一样式值（例如：指向获取padding），我们的盒子模型属性就操作不了了

### 获取元素具体的某个样式值

- [元素].style.xxx 操作 ：只能获取所有写在元素行内上的样式（不写在行内上，不管你写没写都获取不到）
- 获取当前元素所有经过浏览器计算的样式
  - 经过计算的样式：只要当前原属可以在页面中呈现（或者浏览器渲染它了），那么它的样式都是被计算过的
  - 不管当前样式写在哪里
  - 不管你是否写了（浏览器会给元素设置一些默认样式）

> 标准浏览器（IE9+）
>
> Window.getComputedStyle([元素],[伪类,一般都写null]) ： 获取到当前元素所有被浏览器计算过的样式（对象）
>
> IE6~8
>
> [元素].currentStyle 获取经过计算的样式

```js
// 获取当前元素某一个样式属性值
// curEle 当前要操作的元素
// attr 当前要获取的属性
// return 获取的样式属性值
var getCss = function (curEle,attr){
  if(typeof window.getComputedStyle == 'undefined'){
    // 抛出一个错误（语法错误）
  	throw new SyntaxError('您当前浏览器版本过低，请升级到最新版本，谢谢配合!!!');
  }
  var val =  window.getComputedStyle(curEle,null)[attr]
  // 去除单位
  var reg = /^-?\d+(\.\d+)?(px|rem|em|pt|%|vm|vh)?$/i;
  reg.test(val) ? val = parseFloat(val) : val 
  return val
}

// 设置当前元素的某一个样式的属性值
// JS中给元素设置样式两种方式
// 1. 设置元素的样式类名（前提：样式类及对应的样式已经处理完成）
// 2. 通过行内样式设置 xxx.style.xxx = xxx
// var unitList = ['width','height','padding','paddingLeft','paddingRight','paddingBottom','paddingTop','margin','marginTop','marginRight','marginLeft','marginBottom','fontSize','top','left','bottom','right']
var setCss = function(curEle,attr,value){
  if(attr == 'opacity'){
    // 兼容 IE6～8
    curEle.style.opacity = value;
    curEle.style.filter = `alpha(opacity=${value*100})`;
    return
  }
  var reg = /^(width|height|fontSize|(margin|pading)?(top|left|right|bottom)?)$/i
  if(reg.test(attr) && !isNaN(value)){
    value = `${value}px`
  }
  curEle['style'][attr] = value
}
// 给元素批量设置样式
var setGroupCss = function(curEle，options={}){
  for(let attr in options){
    if(!options.hasOwnProperty(attr)) break
    setCss(curEle,attr,options[attr])
  }
}

// 获取当前元素距离BODY的偏移
let offset = function(curEle){
  // 1. 现获取当前元素本身的左/上便宜
  let curLeft = curEle.offsetLeft,
  		curTop = curEle.offsetTop,
      p = curEle.offsetParent
  // 2. 累加父参照物的边框和偏移
  while(p.tagName !== 'BODY'){ // 当找到的参照物是BODY结束查找和累加操作
    // 3. 把找到的父参照物的边框和偏移值累加起来
    curLeft += p.clientLeft
    curLeft += p.offsetLeft
    
    curTop += p.clientTop
    curTop += p.offsetTop 
    p = p.offsetParent // 基于当前找到父参照物继续向上查找
  }
  return {
    top:curTop,
    left:curLeft
  }
}
```


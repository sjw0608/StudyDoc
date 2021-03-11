## VUE 面试

### 1. 谈一下你对 `MVVM` 原理的理解

### 2. 响应式数据的原理

- `Object.defineProperty` 核心
- 默认`Vue` 在初始化数据是，回个data中的属性使用 `Object.defineProperty` 重新定义所有属性，当页面取到对应属性时。会进行依赖收集，如果属性变化会通知相关依赖进行更新操作

### 3. 数组如何检测的变化

- 使用函数劫持的方式，重写了数组的方法
- `Vue` 将 `data` 中的数组，进行了原型链重写，指向了自己定义的数组原型方法，这样当调用数组 api 时，可以通知依赖更新。

### 4. 为何VUE采用异步渲染(Vue时组件级更新)

> 因为如果不采用以不更新，那么每次更新数据都会对当前组件进行重新渲染，所以为了性能考虑， Vue会在本轮数据更新后，再去异步更新视图。

### 5. `nextTick` 实现原理

### 6. `Vue` 中` Computed `的特点

> ` computed` 也是 一个 `watcher` 是具备缓存的，只要当依赖的属性发生变化时才会更新视图

### 7. `watch` 中的 `deep:true` 是如何实现的

### 8. `Vue` 组件的生命周期

##  编程相关

### 1. `a`为什么时，下面条件成立

```js
if(a==1&&a==2&&a==3){
  console.log('success')
}
// 方案一
let a = {
  i:1,
  toString(){
    return this.i++
  }
}
// 方案二
var value = 0
Object.defineProperty(window,'a',{
    get(){
        return value+=1;
    }
})
```

### 2. 一下代码执行输出结果是什么

```js
fn() // 5
function fn(){
  console.log(1)
}
fn() // 5
function fn(){
  console.log(2)
}
fn() // 5
function fn(){
  console.log(3)
}
fn() // 5
var fn = 100
fn() // fn is not a function
function fn(){
  console.log(4)
}
fn()
function fn(){
  console.log(5)
}
```






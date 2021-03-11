# React

## 特点

- 声明式设计 - React 采用声明式规范，可以轻松描述应用。声明式是告诉计算机要去做什么而不管怎么做，而命令式是要描述如何去做
- 高效 - React 通过对DOM的模型（虚拟DOM），最大限度地减少与DOM的交互。
- 灵活 - React 可以与已知的库或者框架很好的配合
- JSX - JSX是JavaScript语法的扩展。（对比模版引擎）
- 组件 - 通过React 构建组件，使得代码更加容易得到复用，能够很好的应用在大型项目的开发中
- 单向响应的数据流 - React 实现了单向响应的数据流，这也是它为什么比传统数据绑定更简单

## 环境搭建

## 开始

```react
import React, { Component } from 'react';
// 渲染虚拟DOM
import ReactDom from 'react-dom';
/**
* 在react当中，组件名称必须大写，标签的名字都是小写，为了区分组件和标签的区别
* 标签必须闭合，如果不闭合回报错 
*/
class App extends Component{
	/**
 	* constructor 作用
 	* 初始化
 	*      当前生命周期函数可以用来定义当前组件所需要的状态
 	*      通过this.state = {} 来进行定义当前组件所需要的状态（属性）
 	*/
  constructor(){
    super()
    state:{
      message: 'React 开始'
    }
    this.handleClick = this.handleClick.bind(this)
    this.changeHandle = this.changeHandle.bind(this)
  }
  // 渲染虚拟DOM
  render(){
    // 里面必须要有一个返回值，返回值是一个jsx语法，其实也就是一个虚拟DOM
    // return 只能renturn 出一个根元素，如果需要写多个则需要包裹起来
    let {message} = this.state
    return (
    	<div>
      	<h1>{message}</h1>
        <button onClick={this.handleClick}>修改</button>
        <br></br>
        <input type="text" value={message} onChange={this.changeHandle}></input>
      </div>
    )
  }
  handleClick(){
		/**
 		* react当中如果需要修改数据则需要调用this.setState()进行数据的修改
 		* 当前方法有两个参数:
 		* 第一个参数是对象（需要修改的值）
 		* 第二个参数是一个回调函数 作用是：可以查看是否修改成功，还可以在当前函数中获取到最新的DOM结构
 		* this.setState 当前方法是一个异步的
 		* render函数：只要this.state发生改变了，那么render函数就会执行
 		*/
    this.setState({
      message:'修改了message'
    })
  }
  changeHandle(e){
    let value = e.targe.value
    this.setState({
      message: value
    })
  }
}

/**
 * 三个参数
 * 1. 需要渲染的（虚拟）DOM结构
 * 2. 将这个虚拟DOM挂载在那个指定位置
 * 3. 成功的回调函数
 */
ReactDom.render(<App />, document.querySelector('#root'), () => {})
```

## React基础表单

```react
import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super()
        this.state = {
            radioVal: '男',
            checkList: [],
            selectVal: '2020'
        }
        this.handleRadio = this.handleRadio.bind(this)
        this.changeCheckBox = this.changeCheckBox.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }
    // 复杂数据类型，如果数据发生变化，不会自动进行遍历
    render() {
        let { radioVal, checkList, selectVal } = this.state
        return (
            <div>
                <label>
                    <input type='radio' value='男' checked={radioVal == '男'} onChange={this.handleRadio} />男
                </label>
                <label>
                    <input type='radio' value='女' checked={radioVal == '女'} onChange={this.handleRadio} />女
                </label>
                <p>您的性别是-----{radioVal}</p>
                <hr />
                <label>
                    <input type='checkbox' value='王者荣耀' onChange={this.changeCheckBox} checked={checkList.includes('王者荣耀')} />王者荣耀
                </label>
                <label>
                    <input type='checkbox' value='DNF' onChange={this.changeCheckBox} checked={checkList.includes('DNF')} />DNF
                </label>
                <label>
                    <input type='checkbox' value='React' onChange={this.changeCheckBox} checked={checkList.includes('React')} />React
                </label>
                <label>
                    <input type='checkbox' value='Vue' onChange={this.changeCheckBox} checked={checkList.includes('Vue')} />Vue
                </label>
                <div>
                    您勾选的内容为:{
                        checkList.map((item) => {
                            return <li key={item}>{item}</li>
                        })
                    }
                </div>
                <hr />
                <select defaultValue={selectVal} onChange={this.handleSelect}>
                    <option value='请选择'>请选择</option>
                    <option value='2018'>2018</option>
                    <option value='2019'>2019</option>
                    <option value='2020'>2020</option>
                    <option value='2021'>2021</option>
                </select>
                <p>您选择的年份是:{selectVal}</p>
            </div>
        )
    }
    handleSelect(e) {
        let val = e.target.value
        this.setState({
            selectVal: val
        })
    }
    changeCheckBox(e) {
        let { checkList } = this.state
        let val = e.target.value
        if (checkList.includes(val)) {
            checkList = checkList.filter(item => item != val)
        } else {
            checkList.push(val)
        }
        this.setState({
            checkList
        })
    }
    handleRadio(e) {
        let value = e.target.value
        this.setState({
            radioVal: value
        })
    }
}
export default App
```

## 组件通信

### 父子组件通信

> this.props 是用来接受外部属性的
>
> 父传子：
>
> 当子组件在父组件中当作标签使用的时候，通过自定义属性进行传值，接收的时候通过this.props进行接收
>
> 子传父：
>
> 当子组件在父组件中当作标签使用的时候，调用父组件的方法进行传值
>
> 默认值的使用：组件.defaultProps = {}

> :red_circle: Render函数什么时候会执行？
>
> 当this.state或者this.props 发生改变的时候 Render 函数就会执行

```react
// father.js
import React, { Component } from 'react';
import Son from './son';
class App extends Component {
    constructor() {
        super()
        this.state = {
            message:'123',
            oneVal:''
        }
    }
    render() {
        let {message,oneVal} = this.state
        return (
            <div>
            <Son info={message} show={this.handleShow.bind(this)}>
            	<p>这是类似Slot的</p>
            </Son>
                <h2>接收到子组建传递的值:{oneVal}</h2>
            </div>
        )
    }
    handleShow(val){
        this.setState({
            oneVal:val
        })
        console.log(val);
    }
}

export default App
```

```react
// son.js
// 如何接受组件标签内部包裹的元素 : this.props.children
import React, { Component } from 'react';
class Son extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        let {info,message1} = this.props
        return (
            <div>
            		<h2>这里是一个默认值：{message1}</h2>
                <h2>接收到的伏组件的值: {info}</h2>
            		{this.props.children}
                <button onClick={this.handleClick.bind(this)}>父传子</button>
            </div>
        )
    }
    handleClick(){
      	// 子组建通过props可以接受到父组件自定义的方法
        this.props.show('子组件就是我')
    }
}
Son.defaultProps = {
  message1: '默认值'
}
export default Son
```

### 非父子组件传值

> 借助发布订阅模式实现

```js
// event.js
class Event {
    constructor() {
      this._events = {}
    }
    $on(eventName, callback) {
      if (!this._events) { this._events = {} }
      if (eventName !== 'newListener') {
        this.$emit('newListener', eventName)
      }
      let callbacks = this._events[eventName] || []
      callbacks.push(callback)
      this._events[eventName] = callbacks
    }
    $emit(eventName, ...args) {
      if (this._events[eventName]) {
        this._events[eventName].forEach(fn => {
          fn(...args)
        });
      }
    }
    $off(eventName, callback) {
      if (this._events[eventName]) {
        this._events[eventName] = this._events[eventName].filter(event => {
          return event !== callback && event.listener !== callback
        })
      }
    }
    $once(eventName, callback) {
      const one = () => {
        callback()
        this.$off(eventName, one)
      }
      one.listener = callback
      this.$on(eventName, one)
    }
 }
  
 export default new Event()
```

```react
// app.js
import React, { Component } from 'react';
import One from './one';
import Two from './two';
class App extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <One/>
                <Two />
            </div>
        )
    }
  
}
export default App
```

```react
// one.js
import React, { Component } from 'react';
import Event from './observe';
 class One extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        return (
            <div>
              <h2>One组件</h2>
              <button onClick={this.handleSend.bind(this)}>传值给Two</button>
            </div>
        )
    }
    handleSend(){
        Event.$emit('send','我是one组件传递过来的')
    }
}
export default One
```

```react
// two.js
import React, { Component } from 'react';
import Event from './observe';
 class Two extends Component {
    constructor() {
        super()
        this.state = {
            oneVal:''
        }
        Event.$on('send',(params)=>{
            this.setState({
                oneVal:params
            })
        })
    }
    render() {
        let { oneVal } = this.state
        return (
            <div>
                <h2>非父子组件传值: </h2>
                <p>one组件传递过来的值为：{oneVal}</p>
            </div>
        )
    }
}
export default Two
```

### 数据类型校验

- 安装

```shell
cnpm install prop-types --save-dev
```

- 引入

```js
import PropTypes from 'prop-types'
```

- 校验

```js
组件名称.propTypes = {
  name: PropTypes.类型
}
```

### 如何强制更新数据

```react
this.forceUpdate()
```

## 生命周期


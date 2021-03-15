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

```react
import React, { Component } from 'react';
export default class App extends Component{
   constructor() {
        super()
        this.state = {
        }
    }
    componentWillMount(){}
  	render(){return (
      <div ref={(list)=>{this.list=list}}>
      	<div ref='son'></div>
      </div>
    )}
  	componentWillReceiveProps(newProps){}
  	shouldComponentUpdate(newProps,newState){}
  	componentWillUpdate(newProps,newState){}
  	componentDidUpdate(newProps,newState){}
  	componentDidMount(){
      console.log(this.list)
      console.log(this.refs.son)
    }
  	componentWillUnmount(){}
}
```

- `constructor`：初始化
  - 当前生命周期函数可以用来定义当前组件所需要的一些状态
  - 当前生命周期里面必须要写`super` 如果不写会报错或者`this`的指向可能发生改变
  - 如果在 `super` 和 `constructor` 中没有传递 `props` 这个参数的话是访问不到`this.props`属性的
- `componentWillMount`：组件挂载前
  - 在当前生命周期函数里面可以访问到`props`属性，在这里可以接收到外部属性，同时可以将外部属性转换为内部属性
  - 在当前生命周期函数里面不需要调用`this.setState`去修改`state`中的值，因为当前函数执行完毕以后就会执行`render`函数
- `render`：
  - `render` 函数什么时候会执行？
    - 当`this.state`或者`this.props`发生改变的时候`render`函数就会执行
    - `this.state`或者`this.props`发生改变会执行哪些生命周期函数？
      - `this.state`：`shouldComponentUpdate --> componentWillUpdate --> render --> componentDidUpdate`
      - `this.props`：`componentWillReceiveProps --> shouldComponentUpdate --> componentWillUpdate --> render --> componentDidUpdate`
  -  `render`函数执行的时候会将虚拟DOM和数据进行相结合，在缓存中缓存一份虚拟DOM，当数据发生改变的时候会将虚拟DOM与缓存中的虚拟DOM进行比较（diff算法）。比较完毕以后，将需要修改的虚拟DOM进行批量修改，而不是全部修改。减少不必要的更新
- `componentWillReceiveProps`
  - 外部属性发生改变的时候就会执行当前生命周期函数，当前生命周期函数会有一个参数是新的Props
- `shouldComponentUpdate`
  -  当`this.state` 或者` this.props` 发生改变的时候 就会执行`render`函数，
  - `shouldComponentUpdate` 这个生命周期函数必须要返回一个布尔值，如果返回true则下面的生命周期函数继续执行，如果返回false下面的生命周期函数不再执行
  - `shouldComponentUpdate` 这个生命周期函数主要是用来判断DOM是否更新，而不是数据是否更新（不管返回值是true或者false，`this.state`中的数据肯定会改变，但是如果返回值是false的时候DOM是不会进行更新的）
  - 这个生命周期函数里面可以做一些相关的操作来减少虚拟DOM不必要的更新（利用`shouldComponentUpdate`中接受到的两个参数，一个是新的`props`，一个是新的`state `来进行比较）
- `componentWillUpdate`：更新前
  - 虚拟DOM与数据进行相结合，但是没有生成真正的DOM结构
- `componentDidUpdate`：更新后
  - 数据和模版进行相结合生成了真正的DOM结构，在这里可以获取到数据更新后最新的DOM结构
- `componentDidMount`
  - `render`函数执行完毕以后 `componentDidMount` 就会去执行，在这个生命周期函数里面我们可以进行 `fetch`的请求以及获取到真实的DOM结构
- `componentWillUnmount`：组件销毁

### 当组件第一次渲染的时候会执行哪些生命周期函数？

`constructor --> componentWillMount --> render --> componentDidMount`

### 操作DOM的两种方式

```react
1、 this.refs.xxx
2、 ref = {(tagName)=>{this.key = tagName}} 访问直接 this.key即可
```

### react生命周期函数中有哪些生命周期函数只会执行一次？

- `constructor`
- `componentWillMount`
- `componentDidMount`
- `componentWillUnmount`

### react生命周期函数中有哪些生命周期函数会执行多次？

- `componentWillReceiveProps`
- `shouldComponentUpdate`
- `componentWillUpdate`
- `render`
- `componentDidUpdate`

## React路由

- 安装

```shell
yarn add react-router-dom --dev
```

- 使用

```react
import React, { Component, Fragment } from 'react';
import { HashRouter, BrowserRouter, Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';
import Home from './components/home';
import Order from './components/order';
import My from './components/my';
import List from './components/list';
import HomeProduct from './components/home'
/**
所有的路由配置需要在当前组件内部
BrowserRouter：路由的一种形式 不带hash的路由
HashRouter：Hash路由同Vue中的 hash路由
*/
export default class App extends Component {
  constructor(porps) {
    super(porps)
  }
  render() {
    return (
      <HashRouter>
        <Fragment>
          <Route path="/home" exact component={Home}></Route>
          <Route path="/order" exact component={Order}></Route>
          <Route path="/my" exact component={My}></Route>
          <Route path="/list" exact component={List}></Route>
          <Redirect path="/" to='/home'></Redirect>
          <Route path="/home/product" exact component={HomeProduct}></Route>
          {/* <Route path="/home" render={({history,match,location})=>{
            return <Home history={history} match={match}></Home>
          }}></Route> */}
          {/* <Route path="/home" exact render={() => {
            return (
              <Home>
                <Route path="/order" exact component={Order}></Route>
                <Route path="/my" exact component={My}></Route>
                <Route path="/list" exact component={List}></Route>
              </Home>
            )
          }}></Route> */}

          {/* <Link to='/home'>首页</Link>
          <Link to='/list'>列表</Link>
          <Link to='/my'>我的</Link>
          <Link to='/order'>订单</Link> */}
          <NavLink to='/home'>首页</NavLink>
          <NavLink to='/list'>列表</NavLink>
          <NavLink to='/my'>我的</NavLink>
          <NavLink to='/order'>订单</NavLink>
        </Fragment>
      </HashRouter>
    )
  }
}
```

- `Route`：渲染相对应的组件，当`path` 匹配成功的时候会渲染`component`或者`render`中的组件

  - `path`：匹配的路径
  - `component`：渲染的方式
  - `render`：渲染的方式

- `Link`：路由跳转的方式

  - `to`：决定跳转到那个路由路径

- `NavLink`：路由跳转的方式，被选中的时候会加一个类名（默认为`active`） 

  - `activeClassName`：更改路由选中后的类名
  - `activeStyle`：可以设置选中过后的样式

- `Switch`：只会匹配一个路由的路径

- `exact`：要求路径完全匹配成功 `to` 和 `path` 的值必须完全匹配

- `Redirect`：路由重定向

  - `path`：路径
  - `to`：重定向到的地址

- 编程式导航方式

  - `this.props.history.push()` 跳转
  - `this.props.history.goBack()` 后退
  - `this.props.history.goForward()` 前进
  - `this.props.history.replace()` 替换会清除掉路由跳转的历史记录

- 路由的传参

  - 1、`path`路径传值（`params`）

    ```react
    // 路由配置
    <Route path="/order/:id/:name" exact component={Order}></Route>
    // 取值
    this.state.id = this.props.match.params.id
    this.state.name = this.props.match.params.name
    ```

  - 2、`query`传值

    ```react
    // 路由配置
    // /order?id=xxx&name=xxx
    // 取值
    const qs = require('querystring')
    let data = qs.parse(this.props.location.search.slice(1))
    this.state.id = data.id
    this.state.name = data.name
    ```

  - 3、编程式导航传值

    ```react
    // 跳转
    this.props.history.push({
      pathname:'/order',
      query:{
        id:1,
        name:'xxx'
      }
    })
    ```

### `Route`中`component`和`render`渲染方式的区别

- `component` 渲染的时候值是一个组件名称；`render`渲染的时候值是一个函数，返回一个组件或者标签
- `render`渲染的时候可以进行组件传值，`component`渲染的时候不能进行组件的传值
- `component`渲染组件的时候可以直接通过 `this.props` 拿到 `history`、 ` match`、 ` location`；

`render`渲染的时候需要手动的在函数中解构需要用到的参数，通过组件传值的方式进行传递

## React-redux

```react
// 1、安装
yarn add redux react-redux --dev

// 2、引入
import {Provider} from 'react-redux';
import store from './store';

// 3、用 `Provider` 将路由包裹起来
<Provider store={stire}></Provider>

// 4、组件内部使用
import {connect} from 'react-redux';

// state 映射到当前的组件 this.props 取值
const mapStateToProps = (state) => ({
    number :state.n
})
// 事件派发
const mapDispatchToProps = (dispatch)=>({
    // 事件相关的操作
    handle(){
        let action = { type:xxx}
        dispatch(action)
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(App)

/**
 * connect是用来链接当前组件与store
 * 第一个括号里面有两个参数
 * 第一个参数是：`mapStateToProps`
 * 第二个参数是：`mapDispatchToProps`
 * 第二个括号里面有一个参数
 * 参数是当前组件的名称
 */
```

## fetch

```js

/**
 * 
 * fetch
 * 安装
 * yarn add whatwg-fetch --dev
 * 
 * 基本用法
 * fetch(url)
 * .then((res)=>res.json())
 * .then((data)=>{console.log(data)})
 * 
 * 默认是get请求,如果需要向后端发送数据则直接在地址后面作拼接即可
 * 
 * post 
 * 
 * let obj = {username:'123',pwd:'456'}
 * fetch(url,{
 *  method:'post',
 *  body: JSOn.stringify(obj),
 *  header:{
 *    // 必须要写
 *    "Content-Type":"application/json;"
 *  }
 * })
 * .then((res)=>res.json()) // 未处理的结果集
 * .then((data)=>{console.log(data)})
 * 
 * 携带cookie 进行提交
 * {
 *  credentials:'include'
 * }
 */
```


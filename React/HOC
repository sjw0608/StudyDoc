# React高阶组件(HOC)

## 前言

React 高阶组件(`HOC`)，是灵活使用React组件的一种技巧，高阶组件本身不是组件，它是一个参数为组件，返回值也是一个组件的函数。高阶作用用于强化组件，复用逻辑，提升渲染性能等作用。

### 什么是高阶组件，它解决了什么问题？

高阶组件(`HOC`)是React中用于复用组件逻辑的一种高级技巧。HOC自身不是React API的一部分，它是一种基于React的组合特性而形成的设计模式。

![NAOTU.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b05e1efc4e84808a0bb84c9cac4ab4b~tplv-k3u1fbpfcp-watermark.awebp)

## 全方位看高阶组件

### 几种包装强化组件的方式

#### mixin模式

在 React 初期提供的一种组合方法。通过`React.createClass`，加入`mixins`属性，具体用法和`Vue2`中 `mixins`相似。

这种 `mixins` 只能存在 `createClass` 中，后来 `React.createClass` 连同 `mixins` 这种模式被废弃了。

- mixin 引入了隐式以来关系
- 不同 mixins 之间可能会有先后顺序，甚至代码冲突覆盖问题
- mixin 代码会导致滚雪球式的复杂性

#### 衍生方式

通过原型链继承来实现。

#### extends继承模式

通过继承的方式进一步的强化我们的组件。这种模式的好处在于，可以封装基础功能组件，然后根绝需要去 extends 我们的基础组件，按需强化组件，但是值得注意的是，必须要对基础组件有足够的掌握，否则会造成一些意想不到的情况发生。

#### HOC模式

```jsx
function HOC(Component){
  return class ComHoc extends React.Component{
    constructor(props){
      super(props);
      this.state={
        name:'alien'
      }
    }
    render(){
      return <Component {...this.props} {...this.state}/>
    }
  }
}

HOC(class Index extends React.Component{
  say = () => {
    const {name} = this.props
    console.log(name)
  }
  render(){
    return (<div>
            	hello,Hoc
            	<button onclick={this.say}>点击</button>
            </div>)
  }
})
```

#### 自定义hooks模式

hooks 的诞生，一大部分原因是解决无状态组件没有state和逻辑难以复用问题。hooks可以将一段逻辑封装起来，做到开箱即用。

## 高阶组件产生初衷

- 复用逻辑：高级组件更像是一个加工 React 组件的工厂，批量对原有组件进行加工、包装处理。我们可以根据业务需求定制化专属的HOC，这样可以解决复用逻辑
- 强化props：这个是HOC最常用的用法之一，高阶组件返回的组件，可以劫持上一层传过来的 props，然后混入新的 props，来增强组件的功能。
- 赋能组件：HOC 有一项独特的特性，就是可以给被 HOC 包裹的业务组件提供一些拓展功能，比如说额外的生命周期，额外的事件，但是这种 HOC，可能需要和业务组件紧密结合。
- 控制渲染：劫持渲染是 HOC 一个特性，在 ComHoc 包装组件中，可以对原来的组件，进行条件渲染、节流渲染、懒加载等功能

## 高阶组件使用和编写结构

## 两种不同的高阶组件

### 正向属性代理

用组件包裹一层代理组件，在代理组件上，我们可以做一些对源组件的代理操作。

```jsx
function HOC(WrapComponent){
  return class Advance extends React.Component{
    state = {
      name: 'alien'
    }
  	render(){
      return <WrapComponent {...this.props} {...this.state} />
    }
  }
}
```

#### 优点：

- 正常属性代理可以和业务组件低耦合，零耦合，对于 条件渲染 和 props属性增强，只负责控制子组件渲染和传递额外的props就可以，所以无须知道业务组件做了什么。所以正向属性代理，更适合做一些开源项目的HOC
- 同样适用于class声明组件和function声明的组件
- 可以完全隔离业务组件的渲染，相比反向继承，属性代理这种模式，可以完全控制业务组件渲染与否，可以避免反向继承带来的一些副作用，比如生命周期的执行。
- 可以嵌套使用，多个HOC是可以嵌套使用的，而且一般不会限制包装 HOC 的先后顺序。

#### 缺点：

- 一般无法直接获取业务组件的状态，如果想要获取，需要 ref 获取组件实例
- 无法直接继承静态属性。如果需要继承需要手动处理，或者引入第三方库

例子：

```jsx
class Index extends React.Component{
  render(){
    return (<div>hello, HOC</div>)
  }
}
Index.say = function(){ console.log('my name is Alien') }

function HOC(Component){
  return class wrapComponent extends React.component{
    render(){
      return <Component {...this.props} {...this.state} />
    }
  }
}

const newIndex = HOC(Index)
console.log(newIndex.say) // undefined
```

### 反向组件继承

反向继承和属性代理有一定的区别，在于包装后的组件继承了业务组件本身，所以我们无须再实例化我们的组件。

#### 优点：

- 方便获取组件内部的状态，比如state，props，生命周期，绑定的事件函数等
- Es6 继承可以良好继承静态属性。我们无须对静态属性和方法进行额外的处理

```jsx
class Index extends React.component{
  render(){
    return <div>hello, HOC</div>
  }
}
Index.say = function(){ console.log('my name is Alien') }
function HOC(Component){
  return class wrapComponent extends Component{
    
  }
}
const newIndex = HOC(Index)
console.log(newIndex.say) // f (){ console.log('my name is Alien') }
```

#### 缺点：

- 无状态组件无法使用
- 和被包装的组件强耦合，需要知道被包装的组件的内部状态，具体是做什么
- 如果多个反向继承HOC嵌套在一起，当前状态会覆盖上一个状态。副作用大

## 如何编写高阶组件

### 强化props

#### 混入props

这个是高阶组件最常用的功能，承接上层的props，在混入自己的props，来强化组件。

无状态组件（属性代理）

```jsx
function classHOC(WrapComponent){
  return class Idex extends React.Component{
    state = {
      name: '张三'
    }
  	componentDidMount(){
      console.log('HOC')
    }
  	render(){
      return <WrapComponent {...this.props} {...this.state} />
    }
  }
}

function Index(props){
  const { name } = props
  useEffect(()=>{
    console.log(' index ')
  },[])
  return (<div>
      hello HOC, my name is {name}
    </div>)
}

export default classHOC(Index)
```

有状态组件（属性代理）

```jsx
function ComHOC(WrapComponent){
  return function Index(props){
    const [state, setState] = useState({name: '张三'})
    return <WrapComponent {...props} {...state} />
  }
}
```

#### 抽离state控制更新

高阶组件可以将 HOC 的 state 配合起来控制业务组件的更新。这种用法在 react-redux中的connect高阶组件中用到过，用于处理来自redux 中 state 更改，带来的订阅更新作用。

```jsx
function classHOC(WrapComponent){
  return class Idex extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        name: '张三'
      }
    }
    changeName = (name) => { this.setState({name}) }
    render(){
      return <WrapComponent {...this.props} {...this.state} changeName={this.changeName} />
    }
  }
}

function Index(props){
  const [value, setValue] = useState(null)
  const { name, changeName } = props
  return (<div>
      <div>hello HOC, my name is {name}</div>
      <label>改变name</label>
      <input onChange={ e => setValue(e.target.value)} />
      <button onClick={ () => changeName(value) }>submit</button>
    </div>)
}

export default classHOC(Index)
```

### 控制渲染

控制渲染是高阶组件的一个很重要的特性。

#### 条件渲染

##### 基础：动态渲染

对于属性代理的高阶组件，虽然不能在内部操控渲染状态，但是可以在外城控制当前组件是否渲染，这种情况应用于：权限隔离、懒加载、延时加载等场景。

```jsx
// 实现一个动态挂载组件的HOC
function ComHOC(WrapComponent){
  return class extends React.Component{
    constructor(props){
      super(props)
      this.state = { visible: true }
    }
    setVisible = () => {this.setState(state=>({visible: !state.visible}))}
    render(){
      const { visible } = this.state
      return <div className='box'>
      	<button onClick={this.setVisible}> 挂载组件 </button>
        {setVisible ? 
        	<WrapComponent {...this.props} setVisible={this.setVisible} /> : null
        }
      </div>
    }
  }
}

class Index extend React.Component{
  render(){
    const { setVisible } = this.props
    return <div>
      <p>hello my name is HOC</p>
      <button onClick={()=>setVisible()}>卸载当前组件</button>
    </div>
  }
}
export defaule ComHOC(Index)
```

##### 进阶：分片渲染

实现一个懒加载功能的HOC，可以实现组件的分片渲染，用于分片渲染页面，不至于一次渲染大量组件造成白屏问题。

```jsx
const renderQueue = []let isFirstRender = falseconst tryRender = () => {  const render = renderQueue.shift()  if(!render) retuen  setTimeout(()=>{render()},300)}function RenderHOC(WrapComponent){  return function(props){    const [isRender, setRender] = useState(false)    useEffect(()=>{      renderQueue.push(()=>{ setRender(true) })      if(!isFirstRender){        tryRender()        isFirstRender = true      }    },[])    return isRender ? <WrapComponent tryRender={tryRender} {...props} /> : <Loading />  }}class Index extends React.Component{  componentDidMount(){    const { name, tryRender } = this.props    tryRender()    console.log(`${name}渲染`)  }  render(){    return <div><img src="xxx.jpg" /></div>  }}const Item = RenderHOC(Index);export default () => {  return <React.Fragament>  	<Item name="组件一" />    <Item name="组件二" />    <Item name="组件三" />  </React.Fragament>}
```

##### 进阶：异步组件（懒加载）

```jsx
export default function AsyncRouter(loadRouter){  return class Content extends React.Component{    state = { Component: null }  	componentDidMount(){      if(this.state.Component) return      loadRouter()      	.then(module => module.default)      	.then(Component => this.setState({Component}))    }  	render(){      const { Component } = this.state      return Component ? <Component {...this.props} /> : null    }  }}const Index = AsyncRouter(()=> import('../pages/index')
```

##### 反向继承：函数劫持

HOC反向继承模式，可以实现颗粒化的函数劫持，也就是可以控制基类组件的 render函数，还可以篡改props，或者是 children。

```jsx
const HOC = (WrapComponent) => 	class Index extends WrapComponent{    render(){      if(this.props.visible){        render super.render()      }else{        return <div>暂无数据</div>      }    }  }
```

##### 反向继承：修改渲染树

我们用劫持渲染的方式，来操纵`super.render()`后的`React.element`元素，然后配合 `createElement` , `cloneElement` , `React.Children` 等 `api`,可以灵活操纵，真正的渲染`react.element`，可以说是偷天换日，不亦乐乎。

#### 节流渲染

HOC 除了可以进行条件渲染、渲染劫持功能外，还可以进行截流渲染。

##### 基础：节流原理

HOC 可以和 hooks 的 useMemo 等 API配合使用，可以实现对业务组件的渲染控制，减少渲染次数，从而达到优化性能的效果。

```jsx
function HOC(Component){  return function renderWrapComponent(props){    const { num } = props    const RenderElement = useMemo(()=><Component {...props} />, [ num ])    return RenderElement  }}class Index extends React.Component{  render(){    console.log(`当前组件是否渲染${this.props}`)    return <div>hello HOC,my name is 张三</div>  }}const IndexHoc = HOC(Index)export defaule () => {  const [num, setNum] = useState(0)  const [num1, setNum1] = useState(0)  const [num2, setNum2] = useState(0)    return <div>  	<IndexHoc num={num} num1={num1} num2={num2}/>    <button onClick={()=>setNum(num+1)}>num++</button>    <button onClick={()=>setNum1(num1+1)}>num1++</button>    <button onClick={()=>setNum2(num2+1)}>num2++</button>  </div>}
```

上述案例，我们只有点击 num++的时候，才重新渲染子组件，点击其他按钮，只负责传递了props。

##### 进阶：定制化渲染流

```jsx
function HOC(rule){  return function (Component){   	return function renderWrapComponent(props) {      const dep = rule(props)    	const RenderElement = useMemo(()=><Component {...props} />, [ dep ])    	return RenderElement    }  }}class Index1 extends React.Component{  render(){    console.log(`当前组件Index1是否渲染${this.props}`)    return <div>hello HOC,my name is Index1</div>  }}class Index2 extends React.Component{  render(){    console.log(`当前组件Index2是否渲染${this.props}`)    return <div>hello HOC,my name is Index2</div>  }}const IndexHoc1 = HOC(props=>props['num'])(Index1)const IndexHoc1 = HOC(props=>props['num1'])(Index2)export defaule () => {  const [num, setNum] = useState(0)  const [num1, setNum1] = useState(0)  const [num2, setNum2] = useState(0)    return <div>  	<IndexHoc1 num={num} num1={num1} num2={num2}/>    <IndexHoc2 num={num} num1={num1} num2={num2}/>    <button onClick={()=>setNum(num+1)}>num++</button>    <button onClick={()=>setNum1(num1+1)}>num1++</button>    <button onClick={()=>setNum2(num2+1)}>num2++</button>  </div>}
```

#### 赋能组件

高阶组件除了上述两种功能外，还可以赋能组件，比如加一些额外声明周期，劫持事件，监控日志等。

##### 劫持原型链-劫持生命周期，事件函数

- 属性代理

```jsx
function HOC(Component){  const proDidMount = Component.prototype.componentDidMount  Component.prototype.componentDidMount = function (){    console.log('劫持生命周期: componentDidMount')    proDidMount.call(this)  }  return class wrapComponent extends React.Component{    render(){      return <Component {...this.props} />    }  }}class Index extends React.Component{  componentDidMount(){    console.log('----didMount----')  }  render(){    return <div>hello Hoc</div>  }}export default HOC(Index)/**	效果：	劫持生命周期: componentDidMount	----didMount----*/
```

- 反向继承实现

```jsx
function HOC(Component){  const didMount = Component.prototype.componentDidMount  return class wrapComponent extends Component{    componentDidMount(){      console.log('劫持生命周期: componentDidMount')      if(didMount){        didMount.apply(this)      }    }    render(){      return super.render()    }  }}class Index extends React.Component{  componentDidMount(){    console.log('----didMounted----')  }  render(){    return <div>hello Hoc</div>  }}export default HOC(Index)
```

##### 事件监控

HOC还可以对原有组件进行监控。比如：事件监控、错误监控、事件监控等

```jsx
// 组件内的事件监听function ClickHOC(Component){  return function Wrap(props){    const dom = useRef(null)    useEffect(()=>{      const handleClick = () => console.log('出发点击事件')      dom.current.addEventListener('click', handleClick)      return ()=>dom.current.removeEventListener('click', handleClick)    },[])    return <div ref={dom}><Component {...props} /></div>  }}class Index extends React.Component{  render(){    return <div className="index">    	<p>hello HOC</p>      <button>组件内部点击</button>    </div>  }}const IndexHoc = ClickHOC(Index)export default () => (	<div className="box">  	<IndexHoc />    <button>组件外部点击</button>  </div>)
```

##### ref助力操控组件实例

对于属性代理我们虽然不能直接获取组件内的状态，但是我们可以通过ref获取组件实例，就可以获取组件的一些状态，或是手动触发一些事件，进一步强化组件。

:warning:class 生命的有状态组件才有实例，function 声明的无状态组件不存在实例

```jsx
// 属性代理-添加额外的生命周期function HOC(Component){  return class WrapComponent extends React.Component{    constructor(props){      super(props)      this.node = null    }    UNSAFE_componendWillReceiveProps(nextprops){      if(nextprops.number !== this.props.number){        this.node.handleNumberChange &&  this.node.handleNumberChange.call(this.node)      }    }    render(){      return <Component {...this.props} ref={node=>this,node=node} />    }  }}class Index extends React.Component{  handleNumberChange(){}  render(){    return <div>hello HOC</div>  }}export default HOC(Index)
```

## 总结

对于属性代理HOC我们可以：

- 强化 props && 抽离 state
- 条件渲染、控制渲染、分片渲染、懒加载
- 劫持事件和生命周期
- ref控制组件实例
- 添加事件监听器、日志

对于反向代理的HOC我们可以：

- 劫持渲染，操作渲染树
- 控制/替换生命周期，直接获取组件状态、绑定事件

## 高阶组件注意事项

- 谨慎修改原型链
- 继承静态属性：在用属性代理的方式编写HOC的时候，要注意静态属性丢失的问题。
- 跨层级捕获ref：高阶组件的约定是将所有的 props 传递给被包装组件，但这对于refs并不适用。因为ref实际上并不是一个props 就像key一样，它是React专门处理的。如果将ref添加到HOC的返回组件中，则 ref 引用指向容器组件，而不是被包装组件。我们可以通过 forwardRef来解决这个问题。
- render中不要声明HOC

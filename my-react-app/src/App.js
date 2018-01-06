import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import './App.css'
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      txt: "state",
      cat: 0
    }
    this.update = this.update.bind(this)
    this.updateEvent = this.updateEvent.bind(this)
  }
  update(e) {
    this.setState({txt: e.target.value, cat:this.state.cat+1})
  }
  updateEvent(e) {
    this.setState({event: e.type})
  }
  render() {
    let txt = this.state.txt
    return (
      <div>
      <Button> <Heart/> React</Button>
      <Widget update={this.update.bind(this)}/>
      <Widget update={this.update.bind(this)}/>
      <textarea 
        onKeyPress={this.updateEvent} 
        onCopy={this.updateEvent} 
        onCut={this.updateEvent} 
        onPaste={this.updateEvent}
        onFocus={this.updateEvent}
        onBlur={this.updateEvent}
        onDoubleClick={this.updateEvent}
        cols='30' 
        rows='10' />
      <h1>{txt}: {this.state.cat}</h1> <b>{this.props.cat}</b> <b> {this.state.event} </b>
      </div>
      )
    //return React.createElement('h1',null,"Hello World");
  }
}
App.propTypes = {
  txt(props,propName,component) {
    if (!(propName in props)) {
      return new Error(`${propName} is present`)
    }
    if (props[propName].length<6) {
      return new Error(`${propName} is too short`)
    }
  },
  cat: PropTypes.number.isRequired
}
App.defaultProps = {
  txt: "default text",
  cat: 5
}
const Widget = (props) =>
  <input type="text" onChange={props.update}/>
const Button = (props) =>
  <button>{props.children}</button>
class Heart extends React.Component {
  render() {
    return <span>&hearts;</span>
  }
}
class AppRef extends React.Component {
  constructor() {
    super();
    this.state = {a: ''}
  }
  update(e) {
    this.setState({
      a: ReactDOM.findDOMNode(this.a).value,
      b: this.b.value,
      c: this.refs.c.value,
      d: this.d.refs.input.value
    })
  }
  render() {
    return (
      <div>
      <Input ref={ component => this.a = component } update={this.update.bind(this)} /> {this.state.a}
      <hr />
      <input ref={ node => this.b = node } onChange={this.update.bind(this)} /> {this.state.b}
      <hr />
      <input ref="c" onChange={this.update.bind(this)} /> {this.state.c}
      <hr />
      <Input ref={ component => this.d = component } update={this.update.bind(this)} /> {this.state.d}
      </div>
      )
  }
}
class Input extends React.Component {
  render() {
    return <input type="text" ref="input" onChange={this.props.update}/>
  }
}
class AppMount extends React.Component {
  constructor() {
    super();
    this.state = {val: 0,increasing:false}
  }
  update() {
    //this.setState({val: this.state.val+1})
    ReactDOM.render(
      <AppMount val={this.props.val+1} />,
      document.getElementById('root'))
  }
  componentWillMount() {
    console.log("will mount")
  }
  componentDidMount() {
    console.log("did mount")
  }
  componentWillUnmount() {
    console.log("will unmount")
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.val>this.props.val)
      this.setState({increasing:true})
  }
  shouldComponentUpdate(nextProps,nextState) { //state actually updates but not displayed
    return nextProps.val%5===0
  }
  componentDidUpdate(prevProps,prevState) {
    console.log(`prevProps: ${prevProps.val}`)
  }
  render() {
    console.log(this.state.increasing);
    return <button onClick={this.update.bind(this)}>{this.props.val}</button>
  }
}
AppMount.defaultProps = {val: 0}
class Wrapper extends React.Component {
  mount() {
    ReactDOM.render(<AppMount />, document.getElementById('a'))
  }
  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('a'))
  }
  render() {
    return (
      <div>
      <button onClick={this.mount.bind(this)}>Mount</button>
      <button onClick={this.unmount.bind(this)}>Unmount</button>
      <div id="a"></div>
      </div>
      )
  }
}
class AppArray extends React.Component {
  constructor() {
    super();
    this.state = {items:[]}
  }
  componentWillMount() {
    fetch('https://swapi.co/api/people/?format=json')
          .then(response => response.json())
          .then(({results:items}) => this.setState({items}))
  }
  filter(e) {
    this.setState({filter:e.target.value})
  }
  render() {
    let items = this.state.items //key needed amongst siblings
    if (this.state.filter) {
      items = items.filter(item =>
                           item.name.toLowerCase()
                           .includes(this.state.filter.toLowerCase()))
    }
    return (
      <div>
      <input onChange={this.filter.bind(this)}/>
      {items.map(item => <h4 key={item.name}>{item.name}</h4>)}
      </div>
      )
  }
}
const HOC = (InnerComponent) => class extends React.Component {
  render() {
    return (
      <InnerComponent {...this.props} />
      )
  }
}
class InnerApp extends React.Component {
  render(){
    return (
      <div>
      <ButtonLOC>button</ButtonLOC>
      <hr/>
      <LabelHOC>label</LabelHOC>
      </div>
      )
  }
}
const ButtonLOC = HOC((props) => <button>{props.children}</button>)
class LabelHOC extends React.Component {
  render() {
   return (
     <label>{this.props.children}</label>
     )
  }
}
class Transpiler extends React.Component {
  constructor() {
    super();
    this.state = {input:"add your jsx here", output: "", err: ""}
  }
  update(e) {
    let code = e.target.value;
    try {
      this.setState({
        output: window.Babel.transform(code,{presets:['es2015','react']}).code,
        err:''
      })
    }
    catch(err){
      this.setState({err: err.message})
    }
  }
  render() {
    return (
      <div>
      <header>{this.state.err}</header>
      <div className="container">
      <textarea onChange={this.update.bind(this)} defaultValue={this.state.input} />
      <pre>{this.state.output}</pre>
      </div>
      </div>
    )
  }
}
//const App = () => <h1>Stateless component</h1>
export default Transpiler
import { Component } from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'
import Cookies from 'universal-cookie';
import Content from "../content.json"
import Header from "./Header.js"
import Page from "./Page.js"
import ThreeRender from "./ThreeRender-start.js"

const cookies = new Cookies();
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      lang: 'fr',
      pages: null,
    }
    this.setLanguage = this.setLanguage.bind(this)
  }
  componentDidMount(){
    this.setState(Content)
    this.setState({lang: this.defaultLanguage()})
  }
  setLanguage( newLang, oldRoute ){
    this.setState({ lang: newLang })
    cookies.set('lang', newLang);
    // hard way new location -- improvable...
    if(oldRoute === 'about' && newLang === 'fr'){
      window.location.hash =  '#/a-propos'
    } else if(oldRoute === 'a-propos' && newLang === 'en') {
      window.location.hash =  '#/about'
    }
  }
  defaultLanguage() {
    let usrLang = cookies.get('lang') || navigator.language || navigator.userLanguage
    usrLang = (usrLang === 'fr' || usrLang === 'fr-FR' || usrLang === 'fr-fr') ? 'fr': 'en'
    cookies.set('lang', usrLang);
    return usrLang
  }
  proceduralRoute() {
    const routes = this.state.pages
    const finalRoutes = []
    // console.log(routes.length);
    let i = 0
    for( const route in routes ){
      const path = ( route === 'home' )? routes[route].path:routes[route].path[this.state.lang]
      finalRoutes.push(
        <Route exact={true} key={'route'+i} path={ '/'+path } render={ (props)=><Page key={'page'+i} lang={this.state.lang} {...props} content={ routes[route] }/> }/>
      )
      i++
    }
    return finalRoutes
    // <Route path="/" exact={true} render={ (props)=><Page {...props} content={ this.state }/> }/>
  }
  render() {
    return (
      <>
      <HashRouter>
        <div className="canvas-container">
          <ThreeRender />
        </div>
        <div className="main">
        <Header infos={ this.state } setLang={ this.setLanguage }/>
        <Switch>
          { this.proceduralRoute() }
        </Switch>
        </div>
      </HashRouter>
      </>
    );
  }
}
export default App;

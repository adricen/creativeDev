import { Component } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Content from "../content.json"
import logo from '../img/logo.svg';
import Header from "./Header.js"

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      lang: 'fr',
      pages: null
    }
    this.setLanguage = this.setLanguage.bind(this)
  }
  componentDidMount(){
    this.setState(Content)
    this.setState({lang: this.defaultLanguage()})
  }
  setLanguage( newLang ){
    this.setState({ lang: newLang })
  }
  defaultLanguage() {
    let usrLang = navigator.language || navigator.userLanguage
    usrLang = (usrLang == 'fr' || usrLang == 'fr-FR' || usrLang == 'fr-fr') ? 'fr': 'en'
    return usrLang
  }
  render() {
    return (
      <>
        <Header  infos={ this.state } setLang={ this.setLanguage }/>
        <h1>{ this.lang }</h1>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Titre principale</h1>
          </header>
        </div>
      </>
    );
  }
}
export default App;

import { Component } from "react";

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import ReactCountryFlag from "react-country-flag"

const Header = ({infos, setLang}) => {
  console.log(setLang);
    const proceduralNav = () => {
      const pages = infos.pages
      const returnedNav = []
      console.log(pages);
      for ( const page in pages ) {
        returnedNav.push(
          <Nav.Item>
            <Nav.Link href={ pages[page].path }>{ pages[page].name[infos.lang]}</Nav.Link>
          </Nav.Item>
        )
      }
      return returnedNav
      // <Nav.Link href="/home">{ (infos.pages != null)?infos.pages.home.name[infos.lang]:'rien'}</Nav.Link>
    }
    const flagAside = () => {
      let finalFlags = []
      const flags = [{
        lang: 'fr',
        countryCode:"FR",
        ariaLabel:"Français"
      },{
        lang: 'en',
        countryCode:"GB",
        ariaLabel:"English"
      }]
      for( const i in flags) {
        finalFlags.push(
          <Nav.Item><ReactCountryFlag
          lang={ flags[i].lang }
          onClick={ (e)=> { setLang(e.target.lang) } }
          className={ flags[i].lang + " emojiFlag"  }
          countryCode={ flags[i].countryCode }
          style={{
            fontSize: '2em',
          }}
          aria-label={ flags[i].ariaLabel }
          /></Nav.Item>
        )
      }
      return finalFlags
    }
    return(
      <Navbar bg="dark" variant="dark" className={ infos.lang }>
        <Container>
          <Navbar.Brand href="/">Adricen</Navbar.Brand>
          <Nav className="justify-content-center">
            { proceduralNav() }
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            { flagAside() }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
export default Header

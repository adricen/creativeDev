import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import ReactCountryFlag from "react-country-flag"

const Header = ({infos, route, setLang }) => {
    const proceduralNav = () => {
      const pages = infos.pages
      const returnedNav = []
      for ( const page in pages ) {
        const path = (page === 'home')? pages[page].path:pages[page].path[infos.lang]
        returnedNav.push(
          <Nav.Item>
            <Nav.Link key={ page } href={ "#/"+path }>{ pages[page].name[infos.lang]}</Nav.Link>
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
          <Nav.Item key={i}><ReactCountryFlag
          lang={ flags[i].lang }
          onClick={ (e)=>{
            let actualPath = document.location.href.split('/')
            actualPath = actualPath[actualPath.length-1]
            setLang(e.target.lang, actualPath)
          }}
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
      <Container fluid="md" className="mt-5 mb-5">
        <Nav justify key={'key2'} className="justify-content-center">
          { proceduralNav() }
        </Nav>
        <Navbar.Collapse key={'key3'} className="justify-content-end">
          { flagAside() }
        </Navbar.Collapse>
      </Container>
    )
}
export default Header

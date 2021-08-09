import Container from 'react-bootstrap/Container'

const Page = ({content, lang}) => {
  // console.log(content);
  return(
    <Container fluid="md" className="mt-5">
      <h1>{content.name[lang]}</h1>
      <p>{content.content[lang]}</p>
    </Container>
  )
}
export default Page

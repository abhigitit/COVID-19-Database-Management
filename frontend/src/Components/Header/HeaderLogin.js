import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
const HeaderLogin = () => {

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">Project-V</Navbar.Brand>
          <Nav>
            <Nav.Link href="/stats">Stats</Nav.Link>
            <Nav.Link href="/home">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderLogin;


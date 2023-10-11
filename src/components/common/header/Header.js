import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img src="./dist/assets/images/logo.png" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/leaflets">Leaflets</Nav.Link>
            <Nav.Link href="/banners">Banners</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/category">Categories</Nav.Link>
            <NavDropdown title="Products" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#">
                Mobile
              </NavDropdown.Item>
              <NavDropdown.Item href="#">
               Perfume
              </NavDropdown.Item>
             
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Watches
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#">Favourites</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import api from "../../../redux/services/api";
import { LOGOUT } from "../../../redux/reduxConstants/EndPoints";
import { deleteCookie } from "../../../lib/helpers";
import * as routes from "../../constant/Routes";

const Header = ({ history }) => {
  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const handleLogout = () => {
    api(baseUrl)
      .get(LOGOUT)
      .then((res) => {
        if (res.data.access_token) {
          deleteCookie("token");
          history.push({ pathname: routes.HOME_ROUTE });
        }
      })
      .catch((e) => console.log(e));
  };

  const links = [
    {
      name: "Home",
      link: routes.HOME_ROUTE,
    },
    {
      name: "Leaflets",
      link: routes.LEAFLETS,
    },
    {
      name: "Banners",
      link: routes.BANNERS,
    },
  ];
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img src="./dist/assets/images/logo.png" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {links &&
              links.map((item) => {
                return <Nav.Link href={item.link}>{item.name}</Nav.Link>;
              })}
          </Nav>
          <Nav>
            <Nav.Link href={routes.LOGIN}>Login</Nav.Link>
          </Nav>
          {/* <Nav.Link onClick={handleLogout}>Logout</Nav.Link> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

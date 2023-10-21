import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import api from "../../../redux/services/api";
import {
  LOGOUT,
  DELETE_ACCOUNT,
} from "../../../redux/reduxConstants/EndPoints";
import { deleteCookie, getCookie } from "../../../lib/helpers";
import * as routes from "../../constant/Routes";

const Header = ({ history }) => {
  const baseUrl = process.env.REACT_APP_API_BASEURL;
  const token = getCookie("token");
  const email = getCookie("email");

  const deleteAccount = () => {
    const headers = {
      Authorization: "bearer " + token,
    };
    api(baseUrl, headers)
      .post(DELETE_ACCOUNT, { email })
      .then((res) => {
        if (res.data.success) {
          deleteCookie("token");
          deleteCookie("user_id");
          deleteCookie("email");
          window.location.replace(routes.HOME_ROUTE);
        }
      })
      .catch((e) => console.log(e));
  };
  const handleLogout = () => {
    const headers = {
      Authorization: "bearer " + token,
    };
    api(baseUrl, headers)
      .get(LOGOUT)
      .then((res) => {
        if (res.data.success) {
          deleteCookie("token");
          deleteCookie("user_id");
          deleteCookie("email");
          window.location.replace(routes.HOME_ROUTE);
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
            {token ? (
              <>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                <Nav.Link onClick={deleteAccount}>Delete Account</Nav.Link>
              </>
            ) : (
              <Nav.Link href={routes.LOGIN}>Login</Nav.Link>
            )}
          </Nav>
          {/* <Nav.Link onClick={handleLogout}>Logout</Nav.Link> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

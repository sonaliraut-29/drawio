import React, { useState } from "react";
import { Button, Container, Modal, Nav, Navbar } from "react-bootstrap";

import NavDropdown from "react-bootstrap/NavDropdown";
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteAccount = () => {
    handleClose();
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
      name: "Search",
      link: routes.ROOT_ROUTE,
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

  const getAccountName = () => {
    const email = getCookie("email");
    return (
      <>
        <div className="d-user">
          <div className="user_initial">{email ? email.charAt(0) : "U"}</div>
          <span></span>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img src="./dist/assets/images/logo.png" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              {links &&
                links.map((item) => {
                  return (
                    <Nav.Link href={item.link} key={item.name}>
                      {item.name}
                    </Nav.Link>
                  );
                })}
            </Nav>
            <Nav>
              {token ? (
                <NavDropdown title={getAccountName()} id="basic-nav-dropdown">
                  <NavDropdown.Item href={routes.MY_PROFILE}>
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href={routes.FAVOURITES}>
                    My Favourites
                  </NavDropdown.Item>
                  <NavDropdown.Item href={routes.CHANGE_PASSWORD}>
                    Change Password
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleShow}>
                    Unregister
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href={routes.LOGIN}>
                  {" "}
                  <i class="fa fa-user" aria-hidden="true"></i> Login
                </Nav.Link>
              )}
            </Nav>
            {/* <Nav.Link onClick={handleLogout}>Logout</Nav.Link> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose} className="postFullscreen">
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Are you sure to delete account?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteAccount}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;

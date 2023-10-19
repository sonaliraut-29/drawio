import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";

const Login = ({ history }) => {
  const [banners, setBanners] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    history.push({
      pathname: `${routes.SEARCH_ROUTE}`,
      search: `?query=${searchValue}`,
    });
  };

  return (
    <>
      <Container className="log-reg login-page">
        <Row>
          <div className="col form-title text-center">
            <h2>Register</h2>
          </div>
        </Row>

        <Row>
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <Form>
              <Form.Group className="mb-4" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="number" placeholder="Enter Phone" />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group
                className="mb-3 pass-criteria"
                controlId="formBasicPassCriteria"
              >
                <Form.Label>
                  <a href="#" className="">
                    Password criteria
                  </a>
                </Form.Label>
              </Form.Group>
              <center>
                <Button variant="primary" type="submit">
                  {" "}
                  Signup{" "}
                </Button>
              </center>
            </Form>
          </div>
          <div className="col-sm-3"></div>
        </Row>

        <section className="orloginwith">
          <Row>
            <div className="col-sm-5 col-4">
              <div className="line before"></div>
            </div>
            <div className="col-sm-2 col-4 text-center">
              <p>Or Login With</p>
            </div>
            <div className="col-sm-5 col-4">
              <div className="line after"></div>
            </div>
          </Row>
        </section>

        <section className="google-apple-id">
          <Row>
            <div className="col-12 text-center">
              <a href="#">
                <img src="/dist/assets/images/google.svg" alt="GoogleID"></img>
              </a>
              <a href="#">
                <img src="/dist/assets/images/apple.svg" alt="AppleID"></img>
              </a>
            </div>
          </Row>
        </section>

        <section className="signup-login">
          <Row>
            <div className="col-sm-12 text-center">
              <p>
                Already a user? <a href="">Sign In</a>
              </p>
            </div>
          </Row>
        </section>
      </Container>
    </>
  );
};
export default Login;

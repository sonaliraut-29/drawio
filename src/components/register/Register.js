import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";
import api from "../../redux/services/api";
import { REGISTER } from "../../redux/reduxConstants/EndPoints";
import { setCookie } from "../../lib/helpers";

const Login = ({ history }) => {
  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const handleEmail = (e) => {
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!emailRegex.test(e.target.value)) {
      setEmailError("Invalid Email");
    } else {
      setEmailError("");
    }
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    if (e.target.value.length < 4) {
      setPasswordError("Password  should content 8 chars.");
    } else {
      setPasswordError("");
    }
    setPassword(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = () => {
    const data = { email, password, mobile: phone, Name: name };
    api(baseUrl)
      .post(REGISTER, data)
      .then((res) => {
        if (res.data.access_token) {
          setCookie("token", res.data.access_token);
          history.push({ pathname: routes.HOME_ROUTE });
        }
      })
      .catch((e) => console.log(e));
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
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={handleName}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={handlePhone}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmail}
                />
                {emailError ? <p className="error">{emailError}</p> : ""}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePassword}
                />
                {passwordError ? <p className="error">{passwordError}</p> : ""}
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
                <Button
                  variant="primary"
                  type="button"
                  disabled={"" !== emailError || "" !== passwordError}
                  onClick={handleSubmit}
                >
                  Signup
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
                Already a user? <a href={routes.LOGIN}>Sign In</a>
              </p>
            </div>
          </Row>
        </section>
      </Container>
    </>
  );
};
export default Login;

import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";
import api from "../../redux/services/api";

import { FORGOT_PASSWORD } from "../../redux/reduxConstants/EndPoints";

const ForgotPassword = ({ history }) => {
  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState();
  const [errors, setErrors] = useState("");

  const handleEmail = (e) => {
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!emailRegex.test(e.target.value)) {
      setEmailError("Invalid Email");
    } else {
      setEmailError("");
    }
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    const data = { email };
    api(baseUrl)
      .post(FORGOT_PASSWORD, data)
      .then((res) => {
        if (res.data.success) {
          history.push({ pathname: routes.LOGIN });
        } else {
          setErrors(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Container className="log-reg login-page">
        <Row>
          <div className="col form-title text-center my-5">
            <a href={routes.ROOT_ROUTE}>
              <img
                src="/dist/assets/images/logo.png"
                alt="Genie Saves Logo image"
              ></img>
            </a>
          </div>
        </Row>
        <Row>
          <div className="col form-title text-center">
            <h2>Forgot Password</h2>
          </div>
        </Row>

        <Row>
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <Form>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmail}
                />
                {emailError ? <p className="error">{emailError}</p> : ""}
              </Form.Group>
              {errors && "" !== errors ? <p className="error">{errors}</p> : ""}

              <Form.Group className="mb-3 text-center">
                <Button
                  className="btn-custom"
                  variant="primary"
                  type="button"
                  disabled={"" !== emailError}
                  onClick={handleSubmit}
                >
                  Send
                </Button>
                <Button
                  className="btn-cancel"
                  variant="primary"
                  type="button"
                  onClick={() => {
                    history.push({ pathname: routes.LOGIN });
                  }}
                >
                  Cancel
                </Button>
              </Form.Group>
            </Form>
          </div>
          <div className="col-sm-3"></div>
        </Row>
      </Container>
    </>
  );
};

export default ForgotPassword;

import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";

import api from "../../redux/services/api";
import { CHANGE_PASSWORD } from "../../redux/reduxConstants/EndPoints";
import { deleteCookie, getCookie } from "../../lib/helpers";

const ChangePassword = ({ history }) => {
  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();

  const token = getCookie("token");

  useEffect(() => {
    if (!token) {
      history.push({ pathname: routes.HOME_ROUTE });
    }
  }, []);
  const handlePassword = (e) => {
    if (e.target.value.length < 8) {
      setPasswordError("Password  should content 8 chars.");
    } else {
      setPasswordError("");
    }
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    if (password !== e.target.value) {
      setConfirmPasswordError("Password and confrim password should be same.");
    } else {
      setConfirmPasswordError("");
    }
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = () => {
    const email = getCookie("email");
    const token = getCookie("token");

    const data = { password, email };

    const headers = {
      Authorization: "bearer " + token,
    };

    api(baseUrl, headers)
      .post(CHANGE_PASSWORD, data)
      .then((res) => {
        if (res.data.success) {
          deleteCookie("token");
          deleteCookie("user_id");
          deleteCookie("email");
          history.push({ pathname: routes.LOGIN });
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Container className="log-reg login-page">
      <Row>
        <div className="col form-title text-center">
          <h2>Change Password</h2>
        </div>
      </Row>

      <Row>
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <Form>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePassword}
              />
              {passwordError ? <p className="error">{passwordError}</p> : ""}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPassword}
              />
              {confirmPasswordError ? (
                <p className="error">{confirmPasswordError}</p>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3 text-center">
              <Button
                variant="primary"
                type="button"
                disabled={"" !== passwordError || "" !== confirmPasswordError}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </div>
        <div className="col-sm-3"></div>
      </Row>
    </Container>
  );
};

export default ChangePassword;

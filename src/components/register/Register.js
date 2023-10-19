import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";
import api from "../../redux/services/api";
import { REGISTER } from "../../redux/reduxConstants/EndPoints";
import { setCookie } from "../../lib/helpers";
import moment from "moment";
import { cities } from "./cities";

const Login = ({ history }) => {
  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [DOB, setDOB] = useState();
  const [Area, setArea] = useState();
  const [Street, setStreet] = useState();
  const [City, setCity] = useState();
  const [Nationality, setNationality] = useState();
  const [YOB, setYob] = useState();
  const [Gender, setGender] = useState();

  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [dateError, setDateError] = useState("");
  const [errors, setErrors] = useState();

  const handleNationality = (e) => {
    setNationality(e.target.value);
  };
  const handleArea = (e) => {
    setArea(e.target.value);
  };

  const handleStreet = (e) => {
    setStreet(e.target.value);
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleDob = (e) => {
    const date = moment(e.target.value);
    let year = "";
    if (!date.isValid()) {
      setDateError("Date is not valid");
    } else {
      year = moment(e.target.value).year();
      setYob(year);
    }
    setDOB(e.target.value);
  };
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
    const data = {
      email,
      password,
      Mobile: phone,
      Name: name,
      DOB: moment("d-m-y", DOB),
      Area,
      City,
      Street,
      Nationality,
      YOB,
      Gender,
    };
    api(baseUrl)
      .post(REGISTER, data)
      .then((res) => {
        if (res.data.access_token) {
          setCookie("token", res.data.access_token);
          history.push({ pathname: routes.HOME_ROUTE });
        } else {
          setErrors(res.data);
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
                {errors && errors.hasOwnProperty("Name") ? (
                  <p className="error">{errors.Name[0]}</p>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={handlePhone}
                />
                {errors && errors.hasOwnProperty("Mobile") ? (
                  <p className="error">{errors["Mobile"][0]}</p>
                ) : (
                  ""
                )}
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
                {errors && errors.hasOwnProperty("email") ? (
                  <p className="error">{errors.email[0]}</p>
                ) : (
                  ""
                )}
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
                {errors && errors.hasOwnProperty("password") ? (
                  <p className="error">{errors.password[0]}</p>
                ) : (
                  ""
                )}
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

              <Form.Group className="mb-4" controlId="formBasicArea">
                <Form.Label>Area</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Area Name"
                  name="Area"
                  value={Area}
                  onChange={handleArea}
                />
                {errors && errors.hasOwnProperty("Area") ? (
                  <p className="error">{errors.Area[0]}</p>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Street Name"
                  name="Street"
                  value={Street}
                  onChange={handleStreet}
                />
                {errors && errors.hasOwnProperty("Street") ? (
                  <p className="error">{errors.Street[0]}</p>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicCity">
                <Form.Label>City</Form.Label>

                <Form.Select
                  aria-label="Default select example"
                  placeholder="Enter your City Name"
                  name="City"
                  onChange={handleCity}
                  value={City}
                >
                  {cities && cities.length > 0 && (
                    <option value="">Please select city</option>
                  )}
                  {cities && cities.length > 0 ? (
                    cities.map((item) => {
                      return (
                        <option value={item.admin_name}>
                          {item.admin_name}
                        </option>
                      );
                    })
                  ) : (
                    <option value="">No citi found</option>
                  )}
                </Form.Select>
                {errors && errors.hasOwnProperty("City") ? (
                  <p className="error">{errors.City[0]}</p>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicDOB">
                <Form.Label>DOB</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="xx/xx/xxxx"
                  value={DOB}
                  onChange={handleDob}
                />
                {dateError ? <p className="error">{dateError}</p> : ""}
                {errors && errors.hasOwnProperty("DOB") ? (
                  <p className="error">{errors.DOB[0]}</p>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group
                className="mb-4 radio-wrapper"
                controlId="formBasicGender"
              >
                <Form.Label>Gender</Form.Label>
                <div className="d-flex">
                  <div className="d-flex radio-option mr-4">
                    <Form.Check
                      type="radio"
                      aria-label="Male"
                      value="male"
                      name="gender"
                      onClick={handleGender}
                    />
                    <Form.Check.Label>{` Male`}</Form.Check.Label>
                  </div>
                  <div className="d-flex  radio-option">
                    <Form.Check
                      type="radio"
                      aria-label="Female"
                      value="female"
                      name="gender"
                      onClick={handleGender}
                    />
                    <Form.Check.Label>{` Female`}</Form.Check.Label>
                  </div>
                </div>
                {errors && errors.hasOwnProperty("Gender") ? (
                  <p className="error">{errors.Gender[0]}</p>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicNationality">
                <Form.Label>Nationality</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="Nationality"
                  value={Nationality}
                  onChange={handleNationality}
                />
                {errors && errors.hasOwnProperty("Nationality") ? (
                  <p className="error">{errors.Nationality[0]}</p>
                ) : (
                  ""
                )}
              </Form.Group>

              <center>
                <Button variant="primary" type="button" onClick={handleSubmit}>
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

import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";
import api from "../../redux/services/api";
import {
  REGISTER,
  GOVERNATES,
  CITIES,
  COUNTRIES,
} from "../../redux/reduxConstants/EndPoints";
import { getCookie, setCookie } from "../../lib/helpers";
import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Register = ({ history }) => {
  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const token = getCookie("token");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [DOB, setDOB] = useState(null);

  const [City, setCity] = useState();
  const [YOB, setYob] = useState(null);
  const [Gender, setGender] = useState();

  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [dateError, setDateError] = useState("");
  const [errors, setErrors] = useState();
  const [governates, setGovernates] = useState([]);
  const [Governorate, setGovernate] = useState();
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [Country_ID, setCountryId] = useState();

  useEffect(() => {
    if (!token) {
      fetchGovernates();
      fetchCountries();
    } else {
      history.push({ pathname: routes.HOME_ROUTE });
    }
  }, []);

  useEffect(() => {
    Governorate && fetchCities();
  }, [Governorate]);

  const fetchCountries = () => {
    api(baseUrl)
      .get(COUNTRIES)
      .then((res) => {
        if (res.data) {
          setCountries(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };
  const fetchGovernates = () => {
    api(baseUrl)
      .get(GOVERNATES)
      .then((res) => {
        if (res.data) {
          setGovernates(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const fetchCities = () => {
    api(baseUrl)
      .get(CITIES + "/" + Governorate)
      .then((res) => {
        if (res.data) {
          setCities(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };
  const handleNationality = (e) => {
    setCountryId(e.target.value);
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
      DOB: DOB ? moment("d-m-y", DOB) : null,
      City,
      Nationality: Country_ID,
      YOB: YOB ? YOB : null,
      Gender,
      Area: Governorate,
    };
    api(baseUrl)
      .post(REGISTER, data)
      .then((res) => {
        if (res.data.data.access_token) {
          setCookie("token", res.data.data.access_token, 365);
          setCookie("user_id", res.data.data.user.User_ID, 365);
          setCookie("email", res.data.data.user.email, 365);
          history.push({ pathname: routes.HOME_ROUTE });
        } else {
          setErrors(res.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleGovernorate = (e) => {
    setGovernate(e.target.value);
  };

  const handleSocialLogin = (provider) => {
    window.location.href = baseUrl + `/${provider}/authorize`;
  };

  return (
    <>
      {!token ? (
        <Container className="log-reg register-page">
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
                  {passwordError ? (
                    <p className="error">{passwordError}</p>
                  ) : (
                    ""
                  )}
                  {errors && errors.hasOwnProperty("password") ? (
                    <p className="error">{errors.password[0]}</p>
                  ) : (
                    ""
                  )}
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicNationality">
                  <Form.Label>Governorate</Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    placeholder="Enter your governate"
                    name="Governorate"
                    onChange={handleGovernorate}
                    value={Governorate}
                  >
                    {governates && governates.length > 0 && (
                      <option>Please select governate</option>
                    )}
                    {governates && governates.length > 0 ? (
                      governates.map((item) => {
                        return (
                          <option value={item.Governarate}>
                            {item.Governarate}
                          </option>
                        );
                      })
                    ) : (
                      <option value="">No governate found</option>
                    )}
                  </Form.Select>
                  {errors && errors.hasOwnProperty("Governorate") ? (
                    <p className="error">{errors.Governorate[0]}</p>
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
                      <option>Please select city</option>
                    )}
                    {cities && cities.length > 0 ? (
                      cities.map((item) => {
                        return <option value={item.City}>{item.City}</option>;
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
                  {/* <Form.Control
                    type="date"
                    placeholder="xx/xx/xxxx"
                    value={DOB}
                    onChange={handleDob}
                  /> */}
                  <DatePicker
                    placeholderText="xx/xx/xxxx"
                    selected={DOB}
                    onChange={(date) => setDOB(date)}
                    openToDate={new Date("1993/09/28")}
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
                        value="M"
                        name="gender"
                        onClick={handleGender}
                        checked={"M" == Gender}
                      />
                      <Form.Check.Label>{` Male`}</Form.Check.Label>
                    </div>
                    <div className="d-flex  radio-option">
                      <Form.Check
                        type="radio"
                        aria-label="Female"
                        value="F"
                        name="gender"
                        onClick={handleGender}
                        checked={"F" == Gender}
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

                  <Form.Select
                    aria-label="Default select example"
                    placeholder="Enter your Country Name"
                    name="Nationality"
                    onChange={handleNationality}
                    value={Country_ID}
                    search
                  >
                    {countries && countries.length > 0 && (
                      <option>Please select nationality</option>
                    )}
                    {countries && countries.length > 0 ? (
                      countries.map((item) => {
                        return (
                          <option value={item.Country_ID}>
                            {item.Country_Name}
                          </option>
                        );
                      })
                    ) : (
                      <option value="">No nationality found</option>
                    )}
                  </Form.Select>
                  {errors && errors.hasOwnProperty("Country_ID") ? (
                    <p className="error">{errors.Country_ID[0]}</p>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <center>
                  <Button
                    variant="primary"
                    type="button"
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
                <a onClick={() => handleSocialLogin("google")}>
                  <img
                    src="/dist/assets/images/google.svg"
                    alt="GoogleID"
                  ></img>
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
      ) : (
        ""
      )}
    </>
  );
};
export default Register;

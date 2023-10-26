import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";
import api from "../../redux/services/api";
import {
  UPDATE_PROFILE,
  PROFILE,
  GOVERNATES,
  CITIES,
  COUNTRIES,
} from "../../redux/reduxConstants/EndPoints";
import { getCookie, setCookie } from "../../lib/helpers";
import moment from "moment";

const Profile = ({ history }) => {
  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");
  const [DOB, setDOB] = useState(null);

  const [City, setCity] = useState();
  const [YOB, setYob] = useState(null);
  const [Gender, setGender] = useState();

  const [emailError, setEmailError] = useState();

  const [dateError, setDateError] = useState("");
  const [errors, setErrors] = useState();
  const [governates, setGovernates] = useState([]);
  const [Governorate, setGovernate] = useState();
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [Country_ID, setCountryId] = useState();

  const [isEdit, setEdit] = useState(true);

  const user_id = getCookie("user_id");
  const emailToken = getCookie("email");
  const token = getCookie("token");

  const [successMessage, setSuccessMessage] = useState();
  const [fadeProp, setFadeProp] = useState({ fade: "" });

  useEffect(() => {
    if (token) {
      fetchProfile();
      fetchGovernates();
      fetchCountries();
    } else {
      history.push({ pathname: routes.LOGIN });
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
    setDOB(date);
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

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const fetchProfile = () => {
    const headers = {
      Authorization: "bearer " + token,
    };
    const data = { email: emailToken };
    api(baseUrl, headers)
      .post(PROFILE, data)
      .then((res) => {
        if (res.data.data) {
          const profile =
            res.data.data && res.data.data.length > 0 ? res.data.data[0] : {};
          setName(profile.Name);
          setEmail(profile.email);
          setPhone(profile.Mobile);
          setDOB(moment(profile.DOB).format("DD/MM/YYYY"));
          setGovernate(profile.Area);
          setCountryId(profile.Nationality);
          setCity(profile.City);
          setGender(profile.Gender);

          const date = moment(profile.DOB);
          let year = "";
          setYob("");
          if (date.isValid()) {
            year = moment(profile.DOB).year();
            setYob(year);
          }
        } else {
          setErrors(res.data);
        }
      })
      .catch((e) => console.log(e));
  };
  const handleSubmit = () => {
    const headers = {
      Authorization: "bearer " + token,
    };

    const data = {
      email,
      Mobile: phone,
      Name: name,
      DOB: DOB ? moment("d-m-y", DOB) : "",
      City,
      Nationality: Country_ID,
      YOB: YOB ? YOB : "",
      Gender,
      Area: Governorate,
    };
    api(baseUrl, headers)
      .put(UPDATE_PROFILE, data)
      .then((res) => {
        if (res.data.success) {
          setSuccessMessage("Profile updated successfully.");
          setEdit(true);
        } else {
          setErrors(res.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleGovernorate = (e) => {
    setGovernate(e.target.value);
  };

  const handleEdit = () => {
    if (isEdit) {
      setEdit(false);
    } else {
      handleSubmit();
    }
  };

  useEffect(() => {
    const timeout = setInterval(() => {
      if (fadeProp.fade === "fade-in") {
        setFadeProp({
          fade: "fade-out",
        });
      }
    }, 10000);
    return () => clearInterval(timeout);
  }, [fadeProp]);

  useEffect(() => {
    setTimeout(() => {
      if (successMessage) {
        setSuccessMessage("");
        setFadeProp({
          fade: "fade-out",
        });
      }
    }, [10000]);
  }, [successMessage]);

  const handleSubmitMessageClose = () => {
    setSuccessMessage("");
    setFadeProp({
      fade: "fade-out",
    });
  };
  console.log(DOB);
  return (
    <>
      {successMessage && (
        <div className={fadeProp.fade}>
          <div className="success">
            <div className="recipleftn">
              <span></span>
              <div className="repsubtxt">
                <p className="btmrow">{successMessage}</p>
              </div>
              <button className="closesub" onClick={handleSubmitMessageClose}>
                x
              </button>
            </div>
          </div>
        </div>
      )}
      <Container className="log-reg login-page">
        <Row>
          <div className="col form-title text-center">
            <h2>My Profile</h2>
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
                  disabled={isEdit}
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
                  disabled={isEdit}
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
                  disabled={isEdit}
                />
                {emailError ? <p className="error">{emailError}</p> : ""}
                {errors && errors.hasOwnProperty("email") ? (
                  <p className="error">{errors.email[0]}</p>
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
                  disabled={isEdit}
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
                  disabled={isEdit}
                >
                  {cities && cities.length > 0 && (
                    <option>Please select city</option>
                  )}
                  {cities && cities.length > 0 ? (
                    cities.map((item) => {
                      return <option value={item.City}>{item.City}</option>;
                    })
                  ) : (
                    <option value="">No city found</option>
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
                  placeholder={DOB ? DOB : "xx/xx/xxxx"}
                  value={DOB}
                  onChange={handleDob}
                  disabled={isEdit}
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
                      onChange={handleGender}
                      disabled={isEdit}
                      checked={Gender === "M"}
                    />
                    <Form.Check.Label>{` Male`}</Form.Check.Label>
                  </div>
                  <div className="d-flex  radio-option">
                    <Form.Check
                      type="radio"
                      aria-label="Female"
                      value="F"
                      name="gender"
                      onChange={handleGender}
                      disabled={isEdit}
                      checked={Gender === "F"}
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
                  disabled={isEdit}
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
                <Button variant="primary" type="button" onClick={handleEdit}>
                  {!isEdit ? "Save" : "Edit"}
                </Button>
                {!isEdit ? (
                  <a className="btn btn-primary" href={routes.HOME_ROUTE}>
                    Cancel
                  </a>
                ) : (
                  ""
                )}
              </center>
            </Form>
          </div>
          <div className="col-sm-3"></div>
        </Row>
      </Container>
    </>
  );
};
export default Profile;

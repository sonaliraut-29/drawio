import React, { useState, useEffect, useRef } from "react";
import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Dropdown,
  Accordion,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import {
  CATEGORIES,
  SUBCATEGORIES,
} from "../../redux/reduxConstants/EndPoints";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ReactSlider from "react-slider";
import api from "../../redux/services/api";

const Banner = () => {
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [actualSubcategories, setActualSubCategories] = useState([]);
  const [actualCategories, setActualCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  useEffect(() => {
    const subCategoriesTemp = [];
    if (subCategories && subCategories.length > 0) {
      subCategories.forEach((item) => {
        const Category = item.Category;
        subCategoriesTemp[Category] = subCategoriesTemp[Category] || [];
        subCategoriesTemp[Category].push(item.Sub_Category);
      });
      const resultKeys = Object.keys(subCategoriesTemp);
      const resultArray = Object.values(subCategoriesTemp);

      setActualSubCategories(resultArray);
      setActualCategories(resultKeys);
    }
  }, [subCategories]);

  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const fetchCategories = () => {
    api(baseUrl)
      .get(CATEGORIES)
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const fetchSubcategories = () => {
    api(baseUrl)
      .get(SUBCATEGORIES)
      .then((res) => {
        if (res.data.success) {
          setSubcategories(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="Banners mb-5">
      <Container className="mt-5">
        <section id="home__leaflet" className="mt-5 text-center">
          <Row>
            <Col className="d-flex justify-content-center align-items-center title-wrap mt-sm-5 mt-2 mb-sm-4 mb-0 col col">
              <h2 className="section-title mb-1">Banners</h2>
              <span></span>
            </Col>
          </Row>

          <Row className="mt-4">
            <section className="col-sm-3 cat-left">
              <section className="cat-for-desktop">
                {actualSubcategories && actualSubcategories.length > 0 ? (
                  <Accordion defaultActiveKey={["0"]} alwaysOpen>
                    {actualSubcategories.map((item, index) => {
                      return (
                        <Accordion.Item eventKey={index}>
                          <Accordion.Header>
                            {actualCategories[index]}
                          </Accordion.Header>
                          <Accordion.Body>
                            <ul>
                              {item.map((innerItem) => {
                                return (
                                  <li>
                                    <Form.Check
                                      type="checkbox"
                                      id="1"
                                      label={innerItem}
                                    />
                                  </li>
                                );
                              })}
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                      );
                    })}
                  </Accordion>
                ) : (
                  ""
                )}
              </section>

              <section className="cat-for-mobile">
                <div className="catfilter-mob mb-4">
                  <button className="btn">
                    <img src="dist/assets/images/filter.png"></img> Filter
                  </button>
                </div>
              </section>
            </section>
            <section className="col-sm-9 banner-list">
              <div className="inner-wrapper mb-4">
                <Row>
                  <div className="seller-name text-left mb-3">
                    <h4>Seller Name </h4>
                  </div>
                </Row>
                <Row>
                  <div className="col-12 mb-4">
                    <div className="seller-banner">
                      <img
                        src="/dist/assets/images/banner.png"
                        alt="banner image"
                      ></img>
                    </div>
                  </div>
                  <div className="col-12 mb-4">
                    <div className="seller-banner">
                      <img
                        src="/dist/assets/images/banner.png"
                        alt="banner image"
                      ></img>
                    </div>
                  </div>
                </Row>
              </div>

              <div className="inner-wrapper">
                <Row>
                  <div className="seller-name text-left mb-3">
                    <h4>Seller Name </h4>
                  </div>
                </Row>
                <Row>
                  <div className="col-12 mb-4">
                    <div className="seller-banner">
                      <img
                        src="/dist/assets/images/banner.png"
                        alt="banner image"
                      ></img>
                    </div>
                  </div>
                </Row>
              </div>
            </section>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default Banner;

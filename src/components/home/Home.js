import React, { useEffect, useState } from "react";
import api from "../../redux/services/api";
import { LEAFLETS, BANNERS } from "../../redux/reduxConstants/EndPoints";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import moment from "moment";
import * as images from "../constant/Assets";
import Search from "../search/Search";
import SearchDetails from "../searchDetails/SearchDetails";

const Home = () => {
  const [leaflets, setLeaflets] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchLeafts();
    fetchBanners();
  }, []);

  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const fetchLeafts = () => {
    api(baseUrl)
      .get(LEAFLETS + "?days_tolerance=-25&num_of_rows_required=10")
      .then((res) => {
        if (res.data.success) {
          setLeaflets(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const fetchBanners = () => {
    api(baseUrl)
      .get(BANNERS + "?days_tolerance=-25&num_of_rows_required=10")
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setBanners(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="Home">
      <Container className="mt-5">
        <section id="home__banner">
          <Row>
            {banners && banners.length > 0 ? (
              <Carousel>
                {banners.map((item) => {
                  return (
                    <Carousel.Item>
                      <a
                        href={
                          item.Banner_Link && "" !== item.Banner_Link
                            ? item.Banner_Link
                            : "#"
                        }
                      >
                        <img
                          src={
                            item.Banner_Image && "" !== item.Banner_Image
                              ? item.Banner_Image
                              : images.homeBannerImage
                          }
                          alt="banner"
                        />
                      </a>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            ) : (
              ""
            )}
          </Row>
        </section>

        <section id="home__search" className="mt-5">
          <Row>
            <Col sm={12}>
              <Form className="d-flex">
                <Form.Control
                  type="Find the best offer products"
                  placeholder="Find the best offer products"
                  className=""
                  aria-label="Find the best offer products"
                />
                <Button>
                  <img src="./dist/assets/images/search.svg" />
                </Button>
              </Form>
            </Col>
          </Row>
        </section>

        <section id="home__categories" className="mt-5 text-center">
          <Row>
            <h2 className="section-title mb-4">Categories</h2>
          </Row>

          <Row>
            <OwlCarousel className="owl-theme" loop margin={30} nav items={5}>
              <div className="item">
                <div className="cat-item mobile">
                  <div className="cat-img">
                    <img src="./dist/assets/images/c1.svg" alt="img" />
                  </div>
                  <div className="cat-txt">
                    <span>Mobile and Tablets</span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="cat-item perfume">
                  <div className="cat-img">
                    <img src="./dist/assets/images/c2.svg" alt="img" />
                  </div>
                  <div className="cat-txt">
                    <span>Perfumes & Fragrances</span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="cat-item watches">
                  <div className="cat-img">
                    <img src="./dist/assets/images/c3.svg" alt="img" />
                  </div>
                  <div className="cat-txt">
                    <span>Watches & Eyewear</span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="cat-item fashion">
                  <div className="cat-img">
                    <img src="./dist/assets/images/c4.svg" alt="img" />
                  </div>
                  <div className="cat-txt">
                    <span>Fashion</span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="cat-item beauty">
                  <div className="cat-img">
                    <img src="./dist/assets/images/c5.svg" alt="img" />
                  </div>
                  <div className="cat-txt">
                    <span>Beauty & Health</span>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          </Row>
        </section>

        <section id="home__popular" className="mt-5 text-center">
          <Row>
            <Col className="d-flex justify-content-center align-items-center title-wrap mt-5 mb-4">
              <h2 className="section-title mb-1">Popular Products</h2>
              <span>
                <a href="#">View All</a>
              </span>
            </Col>
          </Row>

          <Row>
            <OwlCarousel className="owl-theme" loop margin={20}>
              <div className="item">
                <div className="item-wrap">
                  <img src="./dist/assets/images/image.png" alt="img" />
                  <div className="item-desc">
                    <img src="./dist/assets/images/vendor.png" alt="img" />
                    <h5>iPhone 15</h5>
                    <p>Description</p>
                  </div>
                  <div className="price">
                    <span>KD 4.000 </span>
                    <small>
                      <strike>Old Price</strike>
                    </small>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="item-wrap">
                  <img src="./dist/assets/images/image.png" alt="img" />
                  <div className="item-desc">
                    <img src="./dist/assets/images/vendor.png" alt="img" />
                    <h5>iPhone 15</h5>
                    <p>Description</p>
                  </div>
                  <div className="price">
                    <span>KD 4.000 </span>
                    <small>
                      <strike>Old Price</strike>
                    </small>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="item-wrap">
                  <img src="./dist/assets/images/image.png" alt="img" />
                  <div className="item-desc">
                    <img src="./dist/assets/images/vendor.png" alt="img" />
                    <h5>iPhone 15</h5>
                    <p>Description</p>
                  </div>
                  <div className="price">
                    <span>KD 4.000 </span>
                    <small>
                      <strike>Old Price</strike>
                    </small>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="item-wrap">
                  <img src="./dist/assets/images/image.png" alt="img" />
                  <div className="item-desc">
                    <img src="./dist/assets/images/vendor.png" alt="img" />
                    <h5>iPhone 15</h5>
                    <p>Description</p>
                  </div>
                  <div className="price">
                    <span>KD 4.000 </span>
                    <small>
                      <strike>Old Price</strike>
                    </small>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="item-wrap">
                  <img src="./dist/assets/images/image.png" alt="img" />
                  <div className="item-desc">
                    <img src="./dist/assets/images/vendor.png" alt="img" />
                    <h5>iPhone 15</h5>
                    <p>Description</p>
                  </div>
                  <div className="price">
                    <span>KD 4.000 </span>
                    <small>
                      <strike>Old Price</strike>
                    </small>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          </Row>
        </section>
        {leaflets && leaflets.length > 0 ? (
          <section id="home__leaflet" className="mt-5 text-center">
            <Row>
              <Col className="d-flex justify-content-center align-items-center title-wrap mt-5 mb-4">
                <h2 className="section-title mb-1">Leaflets</h2>
                <span>
                  <a href="#">View All</a>
                </span>
              </Col>
            </Row>

            <Row>
              <OwlCarousel className="owl-theme" loop margin={20}>
                {leaflets &&
                  leaflets.length > 0 &&
                  leaflets.map((item) => {
                    return (
                      <div className="item">
                        <div className="item-wrap">
                          <img
                            src={
                              item.leaflet_image && "" !== item.leaflet_image
                                ? item.leaflet_image
                                : images.homeLeafletImage
                            }
                            alt="img"
                          />
                          <div className="item-desc">
                            <div className="vendor-logo">
                              <img
                                src="./dist/assets/images/v2.png"
                                alt="img"
                              />
                            </div>
                            <h5>{item.leaflet_name}</h5>
                            <p>
                              Created:{" "}
                              {moment(item.data_asof).format("MM/DD/YYYY")}
                            </p>
                          </div>
                          <div className="view">
                            <span>
                              <a href={item.leaflet_link}>View Leaflet</a>
                              <img
                                src="./dist/assets/images/arrow.svg"
                                alt="arrow"
                                className="angle-right-icon"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </OwlCarousel>
            </Row>
          </section>
        ) : (
          ""
        )}

        <section id="home__hotdeals" className="mt-5 text-center">
          <Row>
            <Col className="d-flex justify-content-center align-items-center title-wrap mt-5 mb-4">
              <h2 className="section-title mb-1">Todays Hot Deals</h2>
              <span>
                <a href="#">View All</a>
              </span>
            </Col>
          </Row>

          <Row>
            <div className="col-6 left-image">
              <img
                src="./dist/assets/images/d1.png"
                className="img-fluid"
                alt="hot deal"
              />
            </div>
            <div className="col-6 right-image">
              <Row>
                <div className="col-12 top">
                  <img
                    src="./dist/assets/images/d2.png"
                    className="img-fluid"
                    alt="hot deal"
                  />
                </div>
                <div className="col-12 bottom">
                  <img
                    src="./dist/assets/images/d3.png"
                    className="img-fluid"
                    alt="hot deal"
                  />
                </div>
              </Row>
            </div>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default Home;

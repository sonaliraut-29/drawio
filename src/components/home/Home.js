import React, { useEffect, useState } from "react";
import api from "../../redux/services/api";
import {
  LEAFLETS,
  BANNERS,
  POPULAR_PRODUCTS,
  CATEGORIES,
} from "../../redux/reduxConstants/EndPoints";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import moment from "moment";
import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";

const Home = ({ history }) => {
  const [leaflets, setLeaflets] = useState([]);
  const [banners, setBanners] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [popularProducts, setPopularProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchLeafts();
    fetchBanners();
    fetchPopularProducts();
    fetchCategories();
  }, []);

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

  const fetchLeafts = () => {
    api(baseUrl)
      .get(LEAFLETS + "?days_tolerance=-10&num_of_rows_required=10")
      .then((res) => {
        if (res.data.success) {
          setLeaflets(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const fetchBanners = () => {
    api(baseUrl)
      .get(BANNERS + "?days_tolerance=-10&num_of_rows_required=10")
      .then((res) => {
        if (res.data.success) {
          setBanners(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const fetchPopularProducts = () => {
    api(baseUrl)
      .get(POPULAR_PRODUCTS)
      .then((res) => {
        if (res.data.success) {
          setPopularProducts(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleChange = (e) => {
    if (e.target.value) {
      setSearchValue(e.target.value);
    } else {
      setSearchValue("");
    }
  };

  const handleSearch = () => {
    history.push({
      pathname: `${routes.SEARCH_ROUTE}`,
      search: `?query=${searchValue}`,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchValue.trim().length > 0) {
      history.push({
        pathname: `${routes.SEARCH_ROUTE}`,
        search: `?query=${searchValue}`,
      });
    }
  };

  const handleRedirect = (link) => {
    window.open(link, "_blank");
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
                  value={searchValue}
                  onChange={(e) => handleChange(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <Button
                  onClick={handleSearch}
                  disabled={searchValue && "" !== searchValue ? false : true}
                >
                  <img src={images.searchImage} />
                </Button>
              </Form>
            </Col>
          </Row>
        </section>

        <section id="categories" className="mt-5 text-center">
          <Row>
            <h2 className="section-title mb-4">Categories</h2>
          </Row>
          {categories && categories.length > 0 ? (
            <Row>
              <OwlCarousel className="owl-theme" loop margin={30} nav items={5}>
                {categories.map((item) => {
                  const imageName = item.Category.replace(",", "")
                    .replace(" ", "_")
                    .replace("&", "and")
                    .replace(" ", "_")
                    .replace(" ", "_");

                  return (
                    <div className="item">
                      <div className="cat-item mobile">
                        <div className="cat-img">
                          <img
                            src={
                              imageName && images[imageName]
                                ? images[imageName]
                                : "./dist/assets/images/Smartphones,_Tablets_&_Wearables.svg"
                            }
                            alt="img"
                          />
                        </div>
                        <div className="cat-txt">
                          <span>{item.Category}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </OwlCarousel>
            </Row>
          ) : (
            ""
          )}
        </section>

        <section id="home__popular" className="mt-5 text-center">
          <Row>
            <Col className="d-flex justify-content-center align-items-center title-wrap mt-5 mb-4">
              <h2 className="section-title mb-1">Popular Products</h2>
              <span>{/* <a href="#">View All</a> */}</span>
            </Col>
          </Row>

          <Row>
            <OwlCarousel className="owl-theme" loop margin={20}>
              {popularProducts && popularProducts.length > 0
                ? popularProducts.map((item) => {
                    let vendorName = item.Vendor.replace(
                      " ",
                      "-"
                    ).toLowerCase();
                    return (
                      <div
                        className="item"
                        onClick={() => handleRedirect(item.Item_URL)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="item-wrap">
                          <img src={item && item.Item_Image_URL} alt="img" />
                          <div className="item-desc">
                            <img
                              src={
                                item.vendor
                                  ? images[vendorName]
                                  : "./dist/assets/images/v2.png"
                              }
                              alt="img"
                            />
                            <h5>{item.Brand}</h5>
                            <p>{item.Item_name}</p>
                          </div>
                          <div className="price">
                            <span>KD {item.Selling_Price} </span>
                            <small>
                              <strike>Old Price</strike>
                            </small>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </OwlCarousel>
          </Row>
        </section>
        {leaflets && leaflets.length > 0 ? (
          <section id="home__leaflet" className="mt-5 text-center item-design">
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
                    let vendorName = item.vendor
                      .replace(" ", "-")
                      .toLowerCase();

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
                                src={
                                  item.vendor
                                    ? images[vendorName]
                                    : "./dist/assets/images/v2.png"
                                }
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
                              <a href={item.leaflet_link} target="_blank">
                                View Leaflet
                              </a>
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
              <span>{/* <a href="#">View All</a> */}</span>
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

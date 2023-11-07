import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import api from "../../redux/services/api";
import { BANNERS } from "../../redux/reduxConstants/EndPoints";

import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";

const Search = ({ history }) => {
  const [banners, setBanners] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchBanners();
  }, []);

  const baseUrl = process.env.REACT_APP_API_BASEURL;

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

  return (
    <div className="main-search-page">
      <section id="home__banner">
        <Row>
          {banners && banners.length > 0 ? (
            <Carousel>
              {banners.map((item) => {
                let vendorName = item.Vendor.replace(" ", "-").toLowerCase();
                return (
                  <Carousel.Item>
                    <a
                      href={
                        item.Banner_Link && "" !== item.Banner_Link
                          ? item.Banner_Link
                          : "#"
                      }
                      target="_blank"
                    >
                      <img
                        src={
                          item.Banner_Image && "" !== item.Banner_Image
                            ? item.Banner_Image
                            : images.homeBannerImage
                        }
                        alt="banner"
                      />
                      <span className="banner-vendor-logo">
                        <img
                          src={
                            item.Vendor
                              ? images[vendorName]
                              : "./dist/assets/images/default-logo-sm.png"
                          }
                          alt="image"
                        ></img>
                      </span>
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

      <Container>
        <section id="home__search" className="mt-5">
          <Row>
            <div className="col-12 text-center s_logo mb-5">
              <img src="/dist/assets/images/genie-saves-logo2.svg" alt="logo" />
            </div>
          </Row>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <Form className="d-flex">
                <Form.Control
                  type="Find the best offer products"
                  placeholder="Find the best offer products"
                  className=""
                  aria-label="Find the best offer products"
                  onChange={(e) => handleChange(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  value={searchValue}
                />
                <Button disabled={"" !== searchValue ? false : true}>
                  <img src={images.searchImage} alt="search" />
                </Button>
              </Form>
            </Col>
            <Col sm={2}></Col>
          </Row>
        </section>

        <section>
          <Row>
            <div className="col-12 text-center mt-5">
              <button className="btn btn-search" onClick={handleSearch}>
                Search
              </button>
            </div>

            <div className="col-12 text-center mt-5 pt-5 pb-5 home-link">
              <a href="/home" className="mt-5">
                Go to Home Page
              </a>
              <p>Explore the best delas </p>
            </div>
          </Row>
        </section>
      </Container>
    </div>
  );
};
export default Search;

import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import api from "../../redux/services/api";
import { BANNERS } from "../../redux/reduxConstants/EndPoints";

import * as images from "../constant/Assets";

const Search = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const baseUrl = process.env.REACT_APP_API_BASEURL;

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
    <>
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

      <Container>
        <section id="home__search" className="mt-5">
          <Row>
            <div className="col-12 text-center s_logo mb-4">
              <img src="./dist/assets/images/logo.png" alt="logo" />
            </div>
          </Row>
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

        <section>
          <Row>
            <div className="col-12 text-center mt-5">
              <button className="btn btn-search">Search</button>
            </div>

            <div className="col-12 text-center mt-5 pt-5 home-link">
              <a href="#" className="mt-5">
                Go to Home Page
              </a>
              <p>Explore the best delas </p>
            </div>
          </Row>
        </section>
      </Container>
    </>
  );
};
export default Search;

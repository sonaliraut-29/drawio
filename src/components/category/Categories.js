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
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";

const Category = () => {
  const [value, setValue] = useState(0);

  return (
    <main className="category-page">
      <Container>
        <section id="categories" className="text-center mb-5">
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

        <section className="pt-0 pt-sm-5 pb-5">
          <Row>
            <div className="col-sm-3 cat-left">
              <section className="cat-for-desktop">
                <Accordion defaultActiveKey={["0"]} alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Category One</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        <li>Sub Category list</li>
                        <li>Sub Category list</li>
                        <li>Sub Category list</li>
                        <li>Sub Category list</li>
                        <li>Sub Category list</li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Category Two</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        <li>Sub Category list</li>
                        <li>Sub Category list</li>
                        <li>Sub Category list</li>
                        <li>Sub Category list</li>
                        <li>Sub Category list</li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </section>
              <section>
                <div>Price</div>
                <RangeSlider
                  value={value}
                  onChange={(changeEvent) => setValue(changeEvent.target.value)}
                  max="100000"
                  min="0"
                  tooltip="on"
                />
                <div>0</div>
                <div>100000</div>
              </section>
              <section className="cat-for-mobile"></section>
            </div>

            <div className="col-sm-9 cat-right">
              {/* sort row */}
              <Row>
                <div className="col-sm-9 mb-4 mt-sm-0 mt-4">
                  <h4>Selected Category Name</h4>
                </div>
                <div className="col-sm-3">
                  <section className="cat-for-mobile mb-4">
                    <Row>
                      <div className="col-6">
                        <div className="sort-dropdown">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                            >
                              Sort by
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1">
                                Best Product
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-1">
                                Price Low to High
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-1">
                                Price High to Low
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-1">
                                Newest First
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="cat-list">Category</div>
                      </div>
                    </Row>
                  </section>
                </div>
              </Row>

              {/* category product list */}

              <section className="cat-products">
                <Row>
                  <div className="col-6 col-sm-3 mb-4">
                    <div class="item">
                      <div className="item-wrap">
                        <div className="offer-tag">30% OFF</div>
                        <div className="img-wrap">
                          <img
                            src="./dist/assets/images/image.png"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>

                        <div className="item-desc">
                          <img
                            src="./dist/assets/images/vendor.png"
                            alt="img"
                          />
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
                  </div>
                  <div className="col-6 col-sm-3 mb-4">
                    <div class="item">
                      <div className="item-wrap">
                        {/* <div className="offer-tag">30% OFF</div> */}
                        <div className="img-wrap">
                          <img
                            src="./dist/assets/images/image.png"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>

                        <div className="item-desc">
                          <img
                            src="./dist/assets/images/vendor.png"
                            alt="img"
                          />
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
                  </div>
                  <div className="col-6 col-sm-3 mb-4">
                    <div class="item">
                      <div className="item-wrap">
                        <div className="offer-tag">30% OFF</div>
                        <div className="img-wrap">
                          <img
                            src="./dist/assets/images/image.png"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>

                        <div className="item-desc">
                          <img
                            src="./dist/assets/images/vendor.png"
                            alt="img"
                          />
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
                  </div>
                  <div className="col-6 col-sm-3 mb-4">
                    <div class="item">
                      <div className="item-wrap">
                        <div className="offer-tag">30% OFF</div>
                        <div className="img-wrap">
                          <img
                            src="./dist/assets/images/image.png"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>

                        <div className="item-desc">
                          <img
                            src="./dist/assets/images/vendor.png"
                            alt="img"
                          />
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
                  </div>

                  <div className="col-6 col-sm-3 mb-4">
                    <div class="item">
                      <div className="item-wrap">
                        {/* <div className="offer-tag">30% OFF</div> */}
                        <div className="img-wrap">
                          <img
                            src="./dist/assets/images/image.png"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>

                        <div className="item-desc">
                          <img
                            src="./dist/assets/images/vendor.png"
                            alt="img"
                          />
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
                  </div>
                  <div className="col-6 col-sm-3 mb-4">
                    <div class="item">
                      <div className="item-wrap">
                        {/* <div className="offer-tag">30% OFF</div> */}
                        <div className="img-wrap">
                          <img
                            src="./dist/assets/images/image.png"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>

                        <div className="item-desc">
                          <img
                            src="./dist/assets/images/vendor.png"
                            alt="img"
                          />
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
                  </div>
                  <div className="col-6 col-sm-3 mb-4">
                    <div class="item">
                      <div className="item-wrap">
                        <div className="offer-tag">30% OFF</div>
                        <div className="img-wrap">
                          <img
                            src="./dist/assets/images/image.png"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>

                        <div className="item-desc">
                          <img
                            src="./dist/assets/images/vendor.png"
                            alt="img"
                          />
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
                  </div>
                  <div className="col-6 col-sm-3 mb-4">
                    <div class="item">
                      <div className="item-wrap">
                        <div className="offer-tag">30% OFF</div>
                        <div className="img-wrap">
                          <img
                            src="./dist/assets/images/image.png"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>

                        <div className="item-desc">
                          <img
                            src="./dist/assets/images/vendor.png"
                            alt="img"
                          />
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
                  </div>
                </Row>
              </section>
            </div>
          </Row>
        </section>
      </Container>
    </main>
  );
};
export default Category;

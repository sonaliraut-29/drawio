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

const Category = () => {
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

  const handleSlider = (value, index) => {
    setValue(value);
  };

  return (
    <main className="category-page">
      <Container>
        <section id="categories" className="text-center mb-5">
          <Row>
            <h2 className="section-title mb-4">Categories</h2>
          </Row>
          {categories && categories.length > 0 ? (
            <Row>
              <OwlCarousel className="owl-theme" loop margin={30} items={5}>
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

        <section className="pt-0 pt-sm-5 pb-5">
          <Row>
            <div className="col-sm-3 cat-left">
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
              <section className="cat-price-filter">
                <h6>Price</h6>
                <ReactSlider
                  className="horizontal-slider"
                  thumbClassName="example-thumb"
                  trackClassName="example-track"
                  defaultValue={[0, 100000]}
                  ariaLabel={["Lower thumb", "Upper thumb"]}
                  ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                  renderThumb={(props, state) => (
                    <div {...props}>{state.valueNow}</div>
                  )}
                  pearling
                  minDistance={10}
                  onChange={handleSlider}
                />
              </section>
              <section className="cat-for-mobile"></section>
            </div>

            <div className="col-sm-9 cat-right">
              {/* sort row */}
              <Row>
                <div className="col-sm-12 mb-4 mt-sm-0 mt-4 category-title-wrapper">
                  <h4>Selected Category Name</h4>
                  <div className="sort-dropdown">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
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
                <div className="col-sm-12">
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
              <Row>
                <div className="col-sm-12 mb-4 mt-sm-0 mt-4 category-tags">
                  <span class="badge badge-primary">
                    Category
                    <button type="button" class="close" aria-label="Dismiss">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </span>
                  <span class="badge badge-primary">
                    Category
                    <button type="button" class="close" aria-label="Dismiss">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </span>
                  <span class="badge badge-primary">
                    Category
                    <button type="button" class="close" aria-label="Dismiss">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </span>
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

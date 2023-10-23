import React, { useEffect, useState, useRef } from "react";
import api from "../../redux/services/api";
import { LEAFLETS } from "../../redux/reduxConstants/EndPoints";

import * as images from "../constant/Assets";
import moment from "moment";
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

const Leaflet = () => {
  const [leaflets, setLeaflets] = useState([]);
  const [leafletList, setLeafletsList] = useState({ list: [] });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const loaderProfile = useRef(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [actualSubcategories, setActualSubCategories] = useState([]);
  const [actualCategories, setActualCategories] = useState([]);

  useEffect(() => {
    fetchLeafts();
  }, []);

  useEffect(() => {
    if (leafletList && leafletList.list.length > 0) {
      var options = {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      };

      const observer = new IntersectionObserver(handleObserver, options);
      if (loaderProfile.current) {
        observer.observe(loaderProfile.current);
      }
    }
  }, [leafletList]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    page > 1 && fetchLeafts();
  }, [page]);

  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const fetchLeafts = () => {
    setLoading(true);
    api(baseUrl)
      .get(LEAFLETS + "?days_tolerance=-35&num_of_rows_required=10")
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setLeaflets(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

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
    <div className="Leaflet">
      <Container className="mb-5 mt-4">
        {leaflets && leaflets.length > 0 ? (
          <section
            id="home__leaflet"
            className="mt-5 text-center item-design leaflet-detail"
          >
            <Row>
              <Col className="d-flex justify-content-center align-items-center title-wrap mt-sm-5 mt-2 mb-sm-4 mb-0 col col">
                <h2 className="section-title mb-1">Leaflets</h2>
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

              <section className="col-sm-9 leaflet-list">
                <Row>
                  {leaflets &&
                    leaflets.length > 0 &&
                    leaflets.map((item) => {
                      let vendorName = item.vendor
                        .replace(" ", "-")
                        .toLowerCase();

                      return (
                        <div className="item col-sm-4 col-6 pb-4">
                          <div className="main-item-wrap">
                            <div className="item-wrap">
                              <div className="img-wrap">
                                <img
                                  src={
                                    item.leaflet_image &&
                                    "" !== item.leaflet_image
                                      ? item.leaflet_image
                                      : images.homeLeafletImage
                                  }
                                  alt="img"
                                />
                              </div>
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
                        </div>
                      );
                    })}
                </Row>
              </section>
            </Row>
          </section>
        ) : (
          ""
        )}
        <div className="loadingTemp" ref={loaderProfile} />
        {loading && <InlineLoader />}
      </Container>
    </div>
  );
};

export default Leaflet;

const InlineLoader = () => {
  return (
    <div id="floatingBarsG" style={{ marginBottom: "12px" }}>
      <div className="blockG" id="rotateG_01"></div>
      <div className="blockG" id="rotateG_02"></div>
      <div className="blockG" id="rotateG_03"></div>
      <div className="blockG" id="rotateG_04"></div>
      <div className="blockG" id="rotateG_05"></div>
      <div className="blockG" id="rotateG_06"></div>
      <div className="blockG" id="rotateG_07"></div>
      <div className="blockG" id="rotateG_08"></div>
      <div className="blockG" id="rotateG_09"></div>
      <div className="blockG" id="rotateG_10"></div>
      <div className="blockG" id="rotateG_11"></div>
      <div className="blockG" id="rotateG_12"></div>
    </div>
  );
};

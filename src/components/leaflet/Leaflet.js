import React, { useEffect, useState, useRef } from "react";
import api from "../../redux/services/api";

import * as images from "../constant/Assets";
import moment from "moment";
import { Col, Container, Form, Row, Accordion } from "react-bootstrap";
import {
  CATEGORIES,
  SUBCATEGORIES,
  ALL_LEAFLETS,
  VENDORS,
} from "../../redux/reduxConstants/EndPoints";
import Pagination from "../../uikit/Paginate";

const Leaflet = () => {
  const [leaflets, setLeaflets] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [actualSubcategories, setActualSubCategories] = useState([]);
  const [actualCategories, setActualCategories] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const [totalCount, setTotalCount] = useState(0);

  const [vendors, setVendors] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);

  const [isShowFilter, setIsShowFilter] = useState(false);
  const handleCloseFilter = () => setIsShowFilter(false);
  const handleShowFilter = () => setIsShowFilter(true);

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

  const handleCategories = (e) => {
    setPage(1);
    const prevValues = [...selectedCategories];

    if (e.target.checked) {
      prevValues.push(e.target.value);
      setSelectedCategories(prevValues);
    } else {
      const newArray = prevValues.filter((item) => item !== e.target.value);
      setSelectedCategories(newArray);
    }
  };

  const handleSubcategories = (e, key) => {
    const prevValues = [...selectedSubCategories];
    const prevCategories = [...selectedCategories];

    const removeCategory = actualCategories[key];

    if (removeCategory) {
      const newArray = prevCategories.filter((item) => item !== removeCategory);
      setSelectedCategories(newArray);
    }
    if (e.target.checked) {
      prevValues.push(e.target.value);
      setSelectedSubCategories(prevValues);
    } else {
      const newArray = prevValues.filter((item) => item !== e.target.value);
      setSelectedSubCategories(newArray);
    }
  };

  useEffect(() => {
    fetchLeafts();
    fetchVendors();
  }, []);

  useEffect(() => {
    fetchLeafts();
  }, [selectedVendors, selectedCategories]);

  const fetchVendors = () => {
    api(baseUrl)
      .get(VENDORS)
      .then((res) => {
        if (res.data.success) {
          setVendors(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const fetchLeafts = () => {
    setLoading(true);

    const offset_rows = (page - 1) * limit;
    let category = "*";
    if (selectedCategories && selectedCategories.length > 0) {
      const newselectedCategories = selectedCategories.map((item) => {
        return item.replace(/ & /g, "_and_").replace(/&/g, "and");
      });

      category = newselectedCategories.join("|");
    }

    let vendor = "*";
    if (selectedVendors && selectedVendors.length > 0) {
      vendor = selectedVendors.join(",");
    }

    setLoading(true);

    api(baseUrl)
      .get(
        ALL_LEAFLETS +
          "?days_tolerance=-35&num_of_rows_required=" +
          limit +
          "&Start_offset=" +
          offset_rows +
          "&Category=" +
          category +
          "&Vendor=" +
          vendor
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setLeaflets(res.data.data);
          setTotalCount(res.data.totalCount);
        }
      })
      .catch((e) => console.log(e));
  };

  const handlePageClick = (currentpage) => {
    window.scroll(0, 0);

    setPage(currentpage.selected + 1);
    const currentPageSelected = currentpage.selected + 1;
    const offset_rows = (currentPageSelected - 1) * limit;

    setLoading(true);
    let category = "*";
    if (selectedCategories && selectedCategories.length > 0) {
      const newselectedCategories = selectedCategories.map((item) => {
        return item.replace(/ & /g, "_and_").replace(/&/g, "and");
      });
      category = newselectedCategories.join("|");
    }

    let vendor = "*";
    if (selectedVendors && selectedVendors.length > 0) {
      vendor = selectedVendors.join(",");
    }

    api(baseUrl)
      .get(
        ALL_LEAFLETS +
          "?days_tolerance=-35&num_of_rows_required=" +
          limit +
          "&Start_offset=" +
          offset_rows +
          "&Category=" +
          category +
          "&Vendor=" +
          vendor
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setLeaflets(res.data.data);
          setTotalCount(res.data.totalCount);
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

  const handleVendor = (e) => {
    setPage(1);
    const prevValues = [...selectedVendors];

    if (e.target.checked) {
      prevValues.push(e.target.value);
      setSelectedVendors(prevValues);
    } else {
      const newArray = prevValues.filter((item) => item !== e.target.value);
      setSelectedVendors(newArray);
    }
  };

  const handleClick = (item) => {
    window.open(item.leaflet_link, "_blank");
  };
  return (
    <div className="Leaflet">
      <Container className="mb-5 mt-4">
        <section
          id="home__leaflet"
          className="mt-5 text-center item-design leaflet-detail"
        >
          <Row>
            <Col className="d-flex justify-content-center align-items-center title-wrap mt-sm-5 mt-2 mb-sm-4 mb-0 col col">
              <h2 className="section-title mb-1">Leaflets</h2>
              <span></span>
            </Col>
            <Row>
              <div className="col-sm-2 mb-3 for-desktop">
                <button
                  className="btn-simple btn-show-filter"
                  type="button"
                  onClick={() => setIsShowFilter(!isShowFilter)}
                >
                  {isShowFilter ? "Hide Filter" : "Show Filter"}
                </button>
              </div>
            </Row>
          </Row>

          <Row className="mt-4">
            {isShowFilter && (
              <section className="col-sm-3 cat-left">
                <section className="cat-for-desktop">
                  <div className="filter-layout">
                    <h6>Vendors with Category</h6>
                    {categories && categories.length > 0 ? (
                      <>
                        {categories.map((item, index) => {
                          return (
                            <>
                              <Form.Check
                                type="checkbox"
                                id={index}
                                label={item.Category}
                                value={item.Category}
                                onChange={handleCategories}
                                checked={selectedCategories.includes(
                                  item.Category
                                )}
                              />
                            </>
                          );
                        })}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mt-4 vendors-filter">
                    <h6>Vendors</h6>
                    {vendors && vendors.length > 0
                      ? vendors.map((item, index) => {
                          return (
                            <Form.Check
                              type="checkbox"
                              id={index}
                              label={item.Vendor}
                              value={item.Vendor}
                              onChange={handleVendor}
                              checked={selectedVendors.includes(item.Vendor)}
                            />
                          );
                        })
                      : ""}
                  </div>
                </section>

                <section className="cat-for-mobile">
                  <div className="catfilter-mob mb-4">
                    <button className="btn">
                      <img src="dist/assets/images/filter.png"></img> Filter
                    </button>
                  </div>
                </section>
              </section>
            )}

            <section
              className={
                isShowFilter
                  ? "col-sm-9 leaflet-list"
                  : "col-sm-12 leaflet-list"
              }
            >
              <Row>
                {leaflets && leaflets.length > 0
                  ? leaflets.map((item) => {
                      let vendorName = item.vendor
                        .replace(" ", "-")
                        .toLowerCase();

                      return (
                        <div className="item col-sm-4 col-6 pb-4">
                          <div className="main-item-wrap">
                            <div
                              className="item-wrap"
                              onClick={() => handleClick(item)}
                            >
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
                    })
                  : "No data found"}
              </Row>
              <Row className="">
                <Col md={9} xs={12} className="pagination">
                  <Pagination
                    totalCount={totalCount}
                    limitValue={limit}
                    currentPage={page}
                    handlePageClick={handlePageClick}
                  />
                </Col>
              </Row>
            </section>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default Leaflet;

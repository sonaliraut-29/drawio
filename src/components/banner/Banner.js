import React, { useState, useEffect, useRef } from "react";
import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";
import {
  Col,
  Container,
  Form,
  Row,
  Accordion,
  Carousel,
} from "react-bootstrap";
import {
  CATEGORIES,
  SUBCATEGORIES,
  ALL_BANNERS,
  VENDORS,
} from "../../redux/reduxConstants/EndPoints";
import api from "../../redux/services/api";
import Pagination from "../../uikit/Paginate";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [actualSubcategories, setActualSubCategories] = useState([]);
  const [actualCategories, setActualCategories] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const [vendors, setVendors] = useState([]);

  const [vendorsAll, setVendorsAll] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);

  const [results, setResults] = useState([]);

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
    fetchCategories();
    fetchSubcategories();
    fetchBanners();
    fetchVendors();
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [selectedCategories, selectedVendors]);

  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const fetchVendors = () => {
    api(baseUrl)
      .get(VENDORS)
      .then((res) => {
        if (res.data.success) {
          setVendorsAll(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };
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

  const fetchBanners = () => {
    setLoading(true);

    const offset_rows = (page - 1) * limit;
    let category = "*";
    if (selectedCategories && selectedCategories.length > 0) {
      const newselectedCategories = selectedCategories.map((item) => {
        return item.replace(/ & /g, "_and_").replace(/&/g, "and");
      });
      category = newselectedCategories.join("|");
    }

    setLoading(true);

    let vendor = "*";
    if (selectedVendors && selectedVendors.length > 0) {
      vendor = selectedVendors.join(",");
    }

    api(baseUrl)
      .get(
        ALL_BANNERS +
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
          setBanners(res.data.data);
          setTotalCount(res.data.totalCount);
          const uniqueIds = res.data.data.map((x) => x.Vendor);

          const uniqueVendors = [...new Set(uniqueIds)];

          setVendors(uniqueVendors);
          let result = [];

          for (const element of res.data.data) {
            if (result[element.Vendor]) {
              result[element.Vendor] = {
                venodrName: element.Vendor,
                items: [...result[element.Vendor].items, element],
              };
            } else {
              result[element.Vendor] = {
                venodrName: element.Vendor,
                items: [element],
              };
            }
          }

          setResults(Object.values(result));
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
        ALL_BANNERS +
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
          setBanners(res.data.data);
          setTotalCount(res.data.totalCount);
          const uniqueIds = res.data.data.map((x) => x.Vendor);

          const uniqueVendors = [...new Set(uniqueIds)];

          setVendors(uniqueVendors);

          let result = [];

          for (const element of res.data.data) {
            if (result[element.Vendor]) {
              result[element.Vendor] = {
                venodrName: element.Vendor,
                items: [...result[element.Vendor].items, element],
              };
            } else {
              result[element.Vendor] = {
                venodrName: element.Vendor,
                items: [element],
              };
            }
          }

          setResults(Object.values(result));
        }
      })
      .catch((e) => console.log(e));
  };

  const handleVendor = (e) => {
    // setSelectedVendors([e.target.value]);
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

  const handleLink = (item) => {
    window.open(item.Banner_Link, "_blank");
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
                  {vendorsAll && vendorsAll.length > 0
                    ? vendorsAll.map((item, index) => {
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

            <section className="col-sm-9 banner-list">
              <>
                {results &&
                selectedCategories &&
                selectedCategories.length == 0 &&
                selectedVendors &&
                selectedVendors.length == 0
                  ? results.map((item) => {
                      return (
                        <>
                          <div className="seller-name text-left mb-3">
                            <h3>{item.venodrName}</h3>
                          </div>
                          <Row className="mt-5 banner-1">
                            <Carousel>
                              {item.items.map((inItem) => {
                                return (
                                  <Carousel.Item>
                                    <a
                                      href={inItem.Banner_Link}
                                      target="_blank"
                                    >
                                      <img
                                        src={inItem.Banner_Image}
                                        alt="banner"
                                      />
                                    </a>
                                  </Carousel.Item>
                                );
                              })}
                            </Carousel>
                          </Row>
                        </>
                      );
                    })
                  : vendors &&
                    ((selectedCategories && selectedCategories.length !== 0) ||
                      (selectedVendors && selectedVendors.length !== 0)) &&
                    vendors.map((ve) => {
                      return (
                        <div className="inner-wrapper mb-4">
                          <Row>
                            <div className="seller-name text-left mb-3">
                              <h3>{ve}</h3>
                            </div>
                          </Row>
                          <Row>
                            {banners && banners.length > 0
                              ? banners.map((item) => {
                                  return (
                                    <>
                                      {item.Vendor == ve ? (
                                        <div className="col-12 mb-4">
                                          <div
                                            className="seller-banner"
                                            onClick={() => handleLink(item)}
                                          >
                                            <img
                                              src={
                                                item.Banner_Image
                                                  ? item.Banner_Image
                                                  : "/dist/assets/images/banner.png"
                                              }
                                              alt="banner image"
                                            ></img>
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  );
                                })
                              : ""}
                          </Row>
                        </div>
                      );
                    })}
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
              </>
            </section>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default Banner;

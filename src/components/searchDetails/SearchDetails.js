import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import * as images from "../constant/Assets";

import api from "../../redux/services/api";
import { SEARCH } from "../../redux/reduxConstants/EndPoints";
import Pagination from "../../uikit/Paginate";
import CommunityLoaderCircularDash from "../../uikit/CommunityLoaderCircularDash";

const SearchDetails = ({ history }) => {
  const [productList, setProductList] = useState([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  let fullSlug = "";
  let slugString = "";
  let slug = "";
  let searchArr = "";
  let searchText = "";

  if (window !== undefined && typeof window !== "undefined") {
    const paramArray = window.location.href.split("/");

    fullSlug = paramArray[paramArray.length - 1];
    if (fullSlug.includes("?")) {
      slugString = fullSlug.split("?");
      slug = slugString[1];

      if (slug) {
        searchArr = slug.split("=");
        searchText = searchArr[1];
      }
    } else {
      slug = paramArray[paramArray.length - 1];
    }
  }

  useEffect(() => {
    if (searchText && "" !== searchText) {
      fetchProductList(searchText);
    }
  }, [searchText]);

  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const fetchProductList = (searchText) => {
    setLoading(true);

    const offset_rows = (page - 1) * limit;

    api(baseUrl)
      .get(
        SEARCH +
          "?search_text=" +
          searchText +
          "&offset_rows=" +
          offset_rows +
          "&page_size=" +
          limit
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setProductList(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleLink = (link) => {
    window.open(link, "_blank");
  };

  const handleChange = (e) => {
    if (e.target.value) {
      setPage(1);
      setSearchValue(e.target.value);
      if (e.target.value.length >= 2) {
        fetchProductList(e.target.value);
      }
    } else {
      setSearchValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handlePageClick = (currentpage) => {
    window.scroll(0, 0);

    setPage(currentpage.selected + 1);
    const currentPageSelected = currentpage.selected + 1;
    const offset_rows = (currentPageSelected - 1) * limit;

    setLoading(true);
    api(baseUrl)
      .get(
        SEARCH +
          "?search_text=" +
          searchText +
          "&offset_rows=" +
          offset_rows +
          "&page_size=" +
          limit
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setProductList(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <main className="search-page test">
      <Container>
        {loading && <CommunityLoaderCircularDash isbackground={false} />}

        <section id="search-bar" className="mb-4 px-0 ">
          <Row>
            <div className="col-10">
              <Form className="d-flex">
                <Form.Control
                  type="Search product here"
                  placeholder="Search product here"
                  className=""
                  aria-label="Search product here"
                  value={searchValue}
                  onChange={(e) => handleChange(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <Button
                  // onClick={handleSearch}
                  disabled={searchValue && "" !== searchValue ? false : true}
                >
                  <img src={images.SearchBack} alt="searchBack" />
                </Button>
              </Form>
            </div>
            <div className="col-2 d-flex align-items-center">Filter</div>
          </Row>
        </section>

        {productList && productList.length > 0 ? (
          <section className="search-products">
            <Row>
              {productList &&
                productList.map((item, index) => {
                  let vendorName = item.Vendor.replace(" ", "-").toLowerCase();
                  return (
                    <div
                      className="col-6 col-sm-3 mb-4"
                      onClick={() => handleLink(item.Item_URL)}
                      style={{
                        cursor: "pointer",
                      }}
                      key={"result" + index}
                    >
                      <div className="item">
                        <div className="item-wrap">
                          <img
                            src={item.Item_Image_URL}
                            alt="img"
                            className="img-fluid"
                          />
                          <div className="item-desc">
                            <img
                              src={
                                item.Vendor
                                  ? images[vendorName]
                                  : "./dist/assets/images/default-logo-sm.png"
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
                    </div>
                  );
                })}
            </Row>
            <Row className="">
              <Col md={9} xs={12} className="pagination">
                <Pagination
                  totalCount={500}
                  limitValue={limit}
                  currentPage={page}
                  handlePageClick={handlePageClick}
                />
              </Col>
            </Row>
          </section>
        ) : (
          <p className="loading-msg">
            Hang tight! Genie is searching high and low to find the best results
            for you. Sit back, relax, and let us do the work. Your wait will be
            worth it!
          </p>
        )}
      </Container>
    </main>
  );
};
export default SearchDetails;

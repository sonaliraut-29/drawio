import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";

import api from "../../redux/services/api";
import { SEARCH } from "../../redux/reduxConstants/EndPoints";

const SearchDetails = ({ history }) => {
  const [productList, setProductList] = useState([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultList, setResultList] = useState({ list: [] });
  const loaderProfile = useRef(null);

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
    const arrActualData = resultList && resultList.list;

    const arrListData = productList;

    const tempArr = [...resultList.list, ...arrListData];

    setResultList({
      list: tempArr,
    });
  }, [productList]);

  useEffect(() => {
    if (resultList && resultList.list.length > 0) {
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
  }, [resultList]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    if (searchText && "" !== searchText) {
      fetchProductList(searchText);
    }
  }, [searchText]);

  useEffect(() => {
    page > 1 &&
      fetchProductList(
        searchValue && "" !== searchValue ? searchValue : searchText
      );
  }, [page]);

  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const fetchProductList = (searchText) => {
    setLoading(true);
    api(baseUrl)
      .get(
        SEARCH +
          "?search_text=" +
          searchText +
          "&offset_rows=" +
          page +
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
      setSearchValue(e.target.value);
      if (e.target.value.length > 3) {
        fetchProductList(searchValue);
      }
    } else {
      setSearchValue("");
    }
  };

  // const handleSearch = () => {
  //   fetchProductList(searchValue);
  // };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter" && searchValue.trim().length > 0) {
  //     fetchProductList(searchValue);
  //   }
  // };

  return (
    <main className="search-page">
      <Container>
        <section id="search-bar" className="mb-4 px-0">
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
                  // onKeyDown={(e) => handleKeyDown(e)}
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
        {resultList && resultList.list.length > 0 ? (
          <section className="search-products">
            <Row>
              {resultList &&
                resultList.list.map((item, index) => {
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
                    </div>
                  );
                })}
            </Row>
            <div className="loadingTemp" ref={loaderProfile} />
            {loading && <InlineLoader />}
          </section>
        ) : (
          ""
        )}
      </Container>
    </main>
  );
};
export default SearchDetails;

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

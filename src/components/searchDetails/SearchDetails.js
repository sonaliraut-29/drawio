import React, { useState, useEffect } from "react";
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
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <Button
                  onClick={handleSearch}
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
              {productList.map((item, index) => {
                return (
                  <div
                    className="col-6 col-sm-3 mb-4"
                    onClick={() => handleLink(item.Item_URL)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <div className="item">
                      <div className="item-wrap">
                        <img
                          src={item.Item_Image_URL}
                          alt="img"
                          className="img-fluid"
                        />
                        <div className="item-desc">
                          <img src={images.vendor} alt="img" />
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
          </section>
        ) : (
          ""
        )}
      </Container>
    </main>
  );
};
export default SearchDetails;

import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Accordion,
  Dropdown,
} from "react-bootstrap";

import * as images from "../constant/Assets";

import api from "../../redux/services/api";
import {
  SEARCH,
  CATEGORIES,
  SUBCATEGORIES,
} from "../../redux/reduxConstants/EndPoints";
import Pagination from "../../uikit/Paginate";
import CommunityLoaderCircularDash from "../../uikit/CommunityLoaderCircularDash";
import ReactSlider from "react-slider";

const SearchDetails = ({ history }) => {
  const [value, setValue] = useState([]);
  const [productList, setProductList] = useState([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [actualSubcategories, setActualSubCategories] = useState([]);
  const [actualCategories, setActualCategories] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [OrderBy, setOrderBy] = useState("NEWID()");
  const [sort, setSort] = useState("");

  const [title, setTitle] = useState();

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

  const handleCategories = (e) => {
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
  }, [searchText, OrderBy, sort, value]);

  const fetchProductList = (searchText) => {
    setLoading(true);

    const offset_rows = (page - 1) * limit;
    let text = "";
    if (value.length > 0) {
      text = "&price_from=" + value[0] + "&price_to=" + value[1];
    }
    api(baseUrl)
      .get(
        SEARCH +
          "?search_text=" +
          searchText +
          "&offset_rows=" +
          offset_rows +
          "&page_size=" +
          limit +
          "&order_by=" +
          OrderBy +
          "&sort=" +
          sort +
          text
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setProductList(res.data.data);
          setTotalCount(res.data.totalCount);
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
    let text = "";
    if (value.length > 0) {
      text = "&price_from=" + value[0] + "&price_to=" + value[1];
    }

    api(baseUrl)
      .get(
        SEARCH +
          "?search_text=" +
          searchText +
          "&offset_rows=" +
          offset_rows +
          "&page_size=" +
          limit +
          "&order_by=" +
          OrderBy +
          "&sort=" +
          sort +
          text
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setProductList(res.data.data);
          setTotalCount(res.data.totalCount);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleRemoveCategory = (item) => {
    const prevValues = [...selectedCategories];

    const newArray = prevValues.filter((itemIn) => itemIn !== item);
    setSelectedCategories(newArray);
  };

  const handleRemoveSubCategory = (item) => {
    const prevValues = [...selectedSubCategories];

    const newArray = prevValues.filter((itemIn) => itemIn !== item);
    setSelectedSubCategories(newArray);
  };

  const handleSort = (value, sort, titleValue) => {
    setOrderBy(value);
    setSort(sort);
    setTitle(titleValue);
  };

  const handleSlider = (value, index) => {
    setValue(value);
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
        <section className="pt-0 pt-sm-5 pb-5">
          <Row>
            <div className="col-sm-3 cat-left">
              <section className="cat-for-desktop">
                {actualSubcategories && actualSubcategories.length > 0 ? (
                  <Accordion defaultActiveKey={["0"]}>
                    {actualSubcategories.map((item, index) => {
                      return (
                        <Accordion.Item eventKey={index}>
                          <Accordion.Header>
                            <Form.Check
                              type="checkbox"
                              id={index}
                              label={actualCategories[index]}
                              value={actualCategories[index]}
                              onChange={handleCategories}
                              checked={selectedCategories.includes(
                                actualCategories[index]
                              )}
                            />
                          </Accordion.Header>
                          <Accordion.Body>
                            <ul>
                              {item.map((innerItem, idx) => {
                                return (
                                  <li>
                                    <Form.Check
                                      type="checkbox"
                                      id={idx}
                                      label={innerItem}
                                      value={innerItem}
                                      onChange={(e) =>
                                        handleSubcategories(e, index)
                                      }
                                      checked={selectedSubCategories.includes(
                                        innerItem
                                      )}
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
              <section>
                <div>Price</div>

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
              <Row>
                <div className="col-sm-12 mb-4 mt-sm-0 mt-4 category-title-wrapper">
                  <h4>
                    Search Result of{" "}
                    {searchValue && "" !== searchValue
                      ? searchValue
                      : searchText}
                  </h4>
                  <div className="sort-dropdown">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {title ? title : "Sort by"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            handleSort(
                              "Selling_Price",
                              "asc",
                              "Price Low to High"
                            );
                          }}
                        >
                          Price Low to High
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            handleSort(
                              "Selling_Price",
                              "desc",
                              "Price High to Low"
                            );
                          }}
                        >
                          Price High to Low
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            handleSort(
                              "Discount_Percent",
                              "asc",
                              "Discount Low to High"
                            );
                          }}
                        >
                          Discount % Low to High
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            handleSort(
                              "Discount_Percent",
                              "desc",
                              "Discount High to Low"
                            );
                          }}
                        >
                          Discount % High to Low
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            handleSort("Category", "asc", "Category");
                          }}
                        >
                          Category Asc
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            handleSort("Category", "desc", "Category");
                          }}
                        >
                          Category Desc
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            handleSort("Item_name", "asc", "Title");
                          }}
                        >
                          Title Asc
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            handleSort("Item_name", "desc", "Title");
                          }}
                        >
                          Title Desc
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            handleSort("Brand", "asc", "Brand");
                          }}
                        >
                          Brand Asc
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            handleSort("Brand", "desc", "Brand");
                          }}
                        >
                          Brand Desc
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
                  {selectedCategories && selectedCategories.length > 0
                    ? selectedCategories.map((item) => {
                        return (
                          <span className="badge badge-primary">
                            {item}
                            <button
                              type="button"
                              className="close"
                              aria-label="Dismiss"
                              onClick={() => {
                                handleRemoveCategory(item);
                              }}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </span>
                        );
                      })
                    : ""}
                  {selectedSubCategories && selectedSubCategories.length > 0
                    ? selectedSubCategories.map((item) => {
                        return (
                          <span className="badge badge-primary">
                            {item}
                            <button
                              type="button"
                              className="close"
                              aria-label="Dismiss"
                              onClick={() => {
                                handleRemoveSubCategory(item);
                              }}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </span>
                        );
                      })
                    : ""}
                  {/* 
                  <span className="badge badge-primary">
                    Category
                    <button type="button" className="close" aria-label="Dismiss">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </span>
                  <span className="badge badge-primary">
                    Category
                    <button type="button" className="close" aria-label="Dismiss">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </span> */}
                </div>
              </Row>
              {productList && productList.length > 0 ? (
                <section className="cat-products">
                  <Row>
                    {productList &&
                      productList.map((item, index) => {
                        let vendorName = item.Vendor.replace(
                          " ",
                          "-"
                        ).toLowerCase();
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
                        totalCount={totalCount}
                        limitValue={limit}
                        currentPage={page}
                        handlePageClick={handlePageClick}
                      />
                    </Col>
                  </Row>
                </section>
              ) : (
                <p className="loading-msg">
                  Hang tight! Genie is searching high and low to find the best
                  results for you. Sit back, relax, and let us do the work. Your
                  wait will be worth it!
                </p>
              )}
            </div>
          </Row>
        </section>
      </Container>
    </main>
  );
};
export default SearchDetails;

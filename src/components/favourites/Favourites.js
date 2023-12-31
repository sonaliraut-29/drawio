import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";
import api from "../../redux/services/api";
import {
  FAVOURITES,
  REMOVE_FAVOURITES,
} from "../../redux/reduxConstants/EndPoints";
import Pagination from "../../uikit/Paginate";
import CommunityLoaderCircularDash from "../../uikit/CommunityLoaderCircularDash";
import { getCookie } from "../../lib/helpers";

const Favourites = ({ history }) => {
  const token = getCookie("token");
  const user_id = getCookie("user_id");
  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const [productList, setProductList] = useState([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (token) {
      fetchFavourites();
    } else {
      history.push({ pathname: routes.HOME_ROUTE });
    }
  }, []);

  const fetchFavourites = () => {
    setLoading(true);
    const COUNTRY_ID = 1;
    const offset_rows = 0;

    const headers = {
      Authorization: "bearer " + token,
    };

    api(baseUrl, headers)
      .get(
        FAVOURITES +
          "/" +
          COUNTRY_ID +
          "/" +
          user_id +
          "?Start_offset=" +
          offset_rows +
          "&num_of_rows_required=" +
          limit
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

  const handlePageClick = (currentpage) => {
    window.scroll(0, 0);

    setPage(currentpage.selected + 1);
    const currentPageSelected = currentpage.selected + 1;
    const offset_rows = (currentPageSelected - 1) * limit;

    setLoading(true);
    const COUNTRY_ID = 1;

    const headers = {
      Authorization: "bearer " + token,
    };

    api(baseUrl, headers)
      .get(
        FAVOURITES +
          "/" +
          COUNTRY_ID +
          "/" +
          user_id +
          "?Start_offset=" +
          offset_rows +
          "&num_of_rows_required=" +
          limit
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

  const removeFavourites = (item) => {
    setLoading(true);
    const COUNTRY_ID = 1;

    const headers = {
      Authorization: "bearer " + token,
    };

    const data = {
      Country_ID: COUNTRY_ID,
      User_ID: user_id,
      Vendor: item.Vendor,
      Item_Key: item.Item_Key,
    };

    api(baseUrl, headers)
      .post(REMOVE_FAVOURITES, data)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          let prevProducts = [...productList];

          let prevTotalCount = totalCount;

          const changeProducts = prevProducts.filter(
            (itemIn) => itemIn.Item_Key !== item.Item_Key
          );

          setProductList(changeProducts);
          setTotalCount(prevTotalCount > 0 ? prevTotalCount - 1 : 0);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleProductDetail = (item) => {
    // history.push({
    //   pathname: routes.PRODUCTDETAIL,
    //   search: "?Vendor=" + item.Vendor + "&Item_Key=" + item.Item_Key,
    //   state: { Vendor: item.Vendor, ItemKey: item.Item_Key },
    // });

    window.open(
      routes.PRODUCTDETAIL +
        "?Vendor=" +
        item.Vendor +
        "&Item_Key=" +
        item.Item_Key,
      "_blank"
    );
  };
  return (
    <>
      {token ? (
        <main className="search-page test">
          <Container>
            {loading && <CommunityLoaderCircularDash isbackground={false} />}

            <section className="pt-0 pt-sm-5 pb-5">
              <Row>
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
                              className="col-6 col-sm-3 mb-4 item-design"
                              // onClick={() => handleLink(item.Item_URL)}
                              style={{
                                cursor: "pointer",
                              }}
                              key={"result" + index}
                            >
                              <div className="item">
                                <div className="main-item-wrap">
                                  <div className="item-wrap">
                                    <div className="img-wrap">
                                      <div
                                        className="heart-icon"
                                        onClick={() => removeFavourites(item)}
                                      >
                                        <i
                                          className="fa fa-heart"
                                          aria-hidden="true"
                                        ></i>
                                      </div>

                                      <img
                                        src={item.Item_Image_URL}
                                        alt="img"
                                        className="img-fluid"
                                        onClick={() =>
                                          handleProductDetail(item)
                                        }
                                      />
                                    </div>
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
                                      <span>KD {item.Latest_Price} </span>
                                      <small>
                                        <strike>{item.Price_when_Added}</strike>
                                      </small>
                                    </div>
                                  </div>
                                </div>{" "}
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
                  <p className="loading-msg">You don't have any favourites.</p>
                )}
              </Row>
            </section>
          </Container>
        </main>
      ) : (
        ""
      )}
    </>
  );
};

export default Favourites;

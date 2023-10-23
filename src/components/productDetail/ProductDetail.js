import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import api from "../../redux/services/api";
import { PRODUCT } from "../../redux/reduxConstants/EndPoints";

import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";

const ProductDetail = ({ history }) => {
  const [product, setProduct] = useState([]);

  const Vendor =
    history &&
    history.location &&
    history.location.state &&
    history.location.state.Vendor;

  const ItemKey =
    history &&
    history.location &&
    history.location.state &&
    history.location.state.ItemKey;

  useEffect(() => {
    Vendor && ItemKey && fetchProduct();
  }, [Vendor, ItemKey]);

  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const fetchProduct = () => {
    api(baseUrl)
      .get(PRODUCT + "/" + Vendor + "/" + ItemKey)
      .then((res) => {
        if (res.data.success) {
          setProduct(
            res.data.data && res.data.data.length > 0 ? res.data.data[0] : {}
          );
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <main className="search-page test">
      <Container>
        <section className="pt-0 pt-sm-5 pb-5">
          <Row>
            <div
              className="col-6 col-sm-3 mb-4"
              // onClick={() => handleLink(item.Item_URL)}
              style={{
                cursor: "pointer",
              }}
              key={"result"}
            >
              <div className="item">
                <div className="item-wrap">
                  <img
                    src={product.Item_Image_URL}
                    alt="img"
                    className="img-fluid"
                  />
                  <div className="item-desc">
                    <img
                      src={
                        product.Vendor
                          ? images[
                              product.Vendor.replace(" ", "-").toLowerCase()
                            ]
                          : "./dist/assets/images/default-logo-sm.png"
                      }
                      alt="img"
                    />
                    <h5>{product.Brand}</h5>
                    <p>{product.Item_name}</p>
                  </div>
                  <div className="price">
                    <span>KD {product.Regular_Price} </span>
                    <small>
                      <strike>Old Price</strike>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </section>
      </Container>
    </main>
  );
};
export default ProductDetail;

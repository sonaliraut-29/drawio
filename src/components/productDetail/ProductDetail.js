import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import api from "../../redux/services/api";
import { PRODUCT } from "../../redux/reduxConstants/EndPoints";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import * as images from "../constant/Assets";
import * as routes from "../constant/Routes";

const ProductDetail = ({ history }) => {
  const [product, setProduct] = useState([]);
  const query = new URLSearchParams(history.location.search);

  const Vendor =
    history &&
    history.location &&
    history.location.state &&
    history.location.state.Vendor
      ? history.location.state.Vendor
      : query.get("Vendor")
      ? query.get("Vendor")
      : "";

  const ItemKey =
    history &&
    history.location &&
    history.location.state &&
    history.location.state.ItemKey
      ? history.location.state.ItemKey
      : query.get("Item_Key")
      ? query.get("Item_Key")
      : "";

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

  const options = {
    margin: 15,
    items: 4,
    loop: true,
    responsiveClass: true,
    responsive: {
      margin: 15,
      0: {
        items: 2,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  return (
    <main className="product-detail-page">
      <section className="prod-slider text-center">
        <Container>
          <section className="prod-title d-flex justify-content-between">
            <h4>{product.Item_name}</h4>
          </section>
          {/* <a href="#" target="_blank"> */}
          <img src={product.Item_Image_URL} alt="prod image" />
          {/* </a> */}
        </Container>
      </section>

      <Container>
        <section className="prod-deatils">
          <div className="product-name-price-wrapper d-flex justify-content-between">
            <div className="product-name">{product.Item_name}</div>
            <div className="product-price">
              {product.Discount_Percent > 0 ? (
                <strike>{product.Regular_Price}</strike>
              ) : (
                ""
              )}{" "}
              <price>KD {product.Selling_Price}</price>
            </div>
          </div>
          <div className="product-vendor-wrapper d-flex">
            <div className="vendor-logo">
              <img
                src={
                  product.Vendor
                    ? images[product.Vendor.replace(" ", "-").toLowerCase()]
                    : "./dist/assets/images/default-logo-sm.png"
                }
              />
            </div>
            <div className="vendor-name">{product.Vendor}</div>
          </div>

          <div className="product-description-wrapper">
            {/* <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </p> */}
            <p>
              <a
                href={product.Item_URL}
                className="visit-website-link"
                target="_blank"
              >
                {" "}
                VISIT WEBSITE
              </a>
            </p>
          </div>
        </section>

        {/* <section className="related-products">
          <h6>Related products</h6>

          <section className="mt-3 text-center item-design">
            <Row>
              <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                nav
                responsiveClass={true}
                responsive={{
                  1: {
                    items: 2,
                  },
                  1025: {
                    items: 4,
                  },
                }}
              >
                <div className="item">
                  <div className="main-item-wrap">
                    <div className="img-wrap">
                      <img src="dist/assets/images/image.png" alt="img" />
                    </div>
                    <div className="item-desc">
                      <div className="vendor-logo">
                        <img src="dist/assets/images/Xcite.jpg" alt="img" />
                      </div>
                      <h5>Brand name</h5>
                      <p>item name </p>
                    </div>
                    <div className="price">
                      <span>KD 10</span>
                      <small>
                        <strike>Old Price</strike>
                      </small>
                    </div>
                  </div>
                </div>

                <div className="item">
                  <div className="main-item-wrap">
                    <div className="img-wrap">
                      <img src="dist/assets/images/image.png" alt="img" />
                    </div>
                    <div className="item-desc">
                      <div className="vendor-logo">
                        <img src="dist/assets/images/Xcite.jpg" alt="img" />
                      </div>
                      <h5>Brand name</h5>
                      <p>item name </p>
                    </div>
                    <div className="price">
                      <span>KD 10</span>
                      <small>
                        <strike>Old Price</strike>
                      </small>
                    </div>
                  </div>
                </div>
              </OwlCarousel>
            </Row>
          </section>
        </section> */}
      </Container>
    </main>
  );
};
export default ProductDetail;

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Category = () => {
  return (
    <main className="category-page">
      <Container >


        <section id="categories" className="mt-5 text-center mb-5">
          <Row>
            <h2 className="section-title mb-4">Categories</h2>
          </Row>

          <Row>
            <OwlCarousel className="owl-theme" loop margin={30} nav items={5}>
              <div className="item">
                <div className="cat-item mobile">
                  <div className="cat-img">
                    <img src="./dist/assets/images/c1.svg" alt="img" />
                  </div>
                  <div className="cat-txt">
                    <span>Mobile and Tablets</span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="cat-item perfume">
                  <div className="cat-img">
                    <img src="./dist/assets/images/c2.svg" alt="img" />
                  </div>
                  <div className="cat-txt">
                    <span>Perfumes & Fragrances</span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="cat-item watches">
                  <div className="cat-img">
                    <img src="./dist/assets/images/c3.svg" alt="img" />
                  </div>
                  <div className="cat-txt">
                    <span>Watches & Eyewear</span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="cat-item fashion">
                  <div className="cat-img">
                    <img src="./dist/assets/images/c4.svg" alt="img" />
                  </div>
                  <div className="cat-txt">
                    <span>Fashion</span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="cat-item beauty">
                  <div className="cat-img">
                    <img src="./dist/assets/images/c5.svg" alt="img" />
                  </div>
                  <div className="cat-txt">
                    <span>Beauty & Health</span>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          </Row>
        </section>


        <section className="mt-5 mb-5">
          <Row>
            <div className="col-sm-6">
               Sub Category Listing
            </div>
            <div className="col-sm-3">
              Sort
            </div>
            <div className="col-sm-3">
               Filter
            </div>
          </Row>
          </section>




        <section className="search-products ">
          <Row>
            <div className="col-6 col-sm-3 mb-4">
              <div class="item">
                <div className="item-wrap">
                  <img src="./dist/assets/images/image.png" alt="img" className="img-fluid" />
                  <div className="item-desc">
                    <img src="./dist/assets/images/vendor.png" alt="img" />
                    <h5>iPhone 15</h5>
                    <p>Description</p>
                  </div>
                  <div className="price">
                    <span>KD 4.000 </span>
                    <small>
                      <strike>Old Price</strike>
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-3 mb-4">
              <div class="item">
                <div className="item-wrap">
                  <img src="./dist/assets/images/image.png" alt="img" className="img-fluid" />
                  <div className="item-desc">
                    <img src="./dist/assets/images/vendor.png" alt="img" />
                    <h5>iPhone 15</h5>
                    <p>Description</p>
                  </div>
                  <div className="price">
                    <span>KD 4.000 </span>
                    <small>
                      <strike>Old Price</strike>
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-3 mb-4">
              <div class="item">
                <div className="item-wrap">
                  <img src="./dist/assets/images/image.png" alt="img" className="img-fluid" />
                  <div className="item-desc">
                    <img src="./dist/assets/images/vendor.png" alt="img" />
                    <h5>iPhone 15</h5>
                    <p>Description</p>
                  </div>
                  <div className="price">
                    <span>KD 4.000 </span>
                    <small>
                      <strike>Old Price</strike>
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-3 mb-4">
              <div class="item">
                <div className="item-wrap">
                  <img src="./dist/assets/images/image.png" alt="img" className="img-fluid" />
                  <div className="item-desc">
                    <img src="./dist/assets/images/vendor.png" alt="img" />
                    <h5>iPhone 15</h5>
                    <p>Description</p>
                  </div>
                  <div className="price">
                    <span>KD 4.000 </span>
                    <small>
                      <strike>Old Price</strike>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </Row>

          <Row>
            <div className="col-6 col-sm-3 mb-4">
              <div class="item">
                <div className="item-wrap">
                  <img src="./dist/assets/images/image.png" alt="img" className="img-fluid" />
                  <div className="item-desc">
                    <img src="./dist/assets/images/vendor.png" alt="img" />
                    <h5>iPhone 15</h5>
                    <p>Description</p>
                  </div>
                  <div className="price">
                    <span>KD 4.000 </span>
                    <small>
                      <strike>Old Price</strike>
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-3 mb-4">
              <div class="item">
                <div className="item-wrap">
                  <img src="./dist/assets/images/image.png" alt="img" className="img-fluid" />
                  <div className="item-desc">
                    <img src="./dist/assets/images/vendor.png" alt="img" />
                    <h5>iPhone 15</h5>
                    <p>Description</p>
                  </div>
                  <div className="price">
                    <span>KD 4.000 </span>
                    <small>
                      <strike>Old Price</strike>
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-3 mb-4">
              <div class="item">
                <div className="item-wrap">
                  <img src="./dist/assets/images/image.png" alt="img" className="img-fluid" />
                  <div className="item-desc">
                    <img src="./dist/assets/images/vendor.png" alt="img" />
                    <h5>iPhone 15</h5>
                    <p>Description</p>
                  </div>
                  <div className="price">
                    <span>KD 4.000 </span>
                    <small>
                      <strike>Old Price</strike>
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-3 mb-4">
              <div class="item">
                <div className="item-wrap">
                  <img src="./dist/assets/images/image.png" alt="img" className="img-fluid" />
                  <div className="item-desc">
                    <img src="./dist/assets/images/vendor.png" alt="img" />
                    <h5>iPhone 15</h5>
                    <p>Description</p>
                  </div>
                  <div className="price">
                    <span>KD 4.000 </span>
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
export default Category;

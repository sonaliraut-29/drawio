import { Button, Col, Container, Form, Row } from "react-bootstrap";

const searchDetails = () => {
  return (
    <main className="search-page">
      <Container >
      <section id="search-bar" className=" mb-4 px-0">
          <Row>
           <div className="col-10">
           <Form className="d-flex">
                <Form.Control
                  type="Search product here"
                  placeholder="Search product here"
                  className=""
                  aria-label="Search product here"
                />
                <Button>
                  <img src="./dist/assets/images/search-black.svg" />
                </Button>
              </Form>
           </div>
           <div className="col-2 d-flex align-items-center">Filter</div>
              
            
          </Row>
        </section>



        <section className="search-products">
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
export default searchDetails;

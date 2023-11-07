import React from "react";
import { Col, Container, Row } from "react-bootstrap";
const Footer = () => {
  return (
    <>
      <div className="footer-section">
        <Container>
          <Row>
            <div className="col-12 col-sm-3">
              <img src="./dist/assets/images/logo.png" />
              <ul className="social-media mt-3">
                <li>
                  <a href="#">
                    <i class="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fa fa-twitter" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-12 col-sm-3">
              <ul>
                <li>
                  <a href="/home">All In One Place</a>
                </li>
                <li>
                  <a href="#">Search Anything You Need</a>
                </li>
                <li>
                  <a href="/leaflets">View All Leaflet</a>
                </li>
                <li>
                  <a href="/banners">View All Banners</a>
                </li>
                <li>
                  <a href="/login">Login To Account</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-sm-3">
              <ul>
                <li>
                  <a href="#">Know More About Us </a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="http://localhost:3000/register#">Register</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms And Condition</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-sm-3">
              <ul>
                <li>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                  eu, pretium quis, sem.
                </li>
              </ul>
            </div>
          </Row>
        </Container>
      </div>

      <div className="copywrite">
        <Container>
          <Row>
            <Col>© 2023 Genie Saves. All rights reserved.</Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Footer;

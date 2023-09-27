import React from "react";
import { Col, Container, Row } from "react-bootstrap";
const Footer = () => {
  return (
    <>
      <div className="footer-section">
        <Container>
          <Row>
          <div className="col-12 col-sm-3"><img src="./dist/assets/images/logo.png" /></div>
          <div className="col-12 col-sm-3">
              <ul>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
              </ul>
            </div>
            <div className="col-12 col-sm-3">
              <ul>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
              </ul>
            </div>
            <div className="col-12 col-sm-3">
              <ul>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
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

import React from "react";
import { Col, Container, Row } from "react-bootstrap";
const Footer = () => {
  return (
    <>
      <div className="footer-section">
        <Container>
          <Row>
            <Col><img src="./dist/assets/images/logo.png" /></Col>
            <Col>
              <ul>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
              </ul>
            </Col>
            <Col>
              <ul>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
              </ul>
            </Col>
            <Col>
              <ul>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
              </ul>
            </Col>
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

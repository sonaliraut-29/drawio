import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Banner = () => {
  return (
    <div className="Banners">
      <Container className="mt-5">
        <section id="home__leaflet" className="mt-5 text-center">
          <Row>
            <Col className="d-flex justify-content-center align-items-center title-wrap mt-5 mb-4">
              <h2 className="section-title mb-1">Category</h2>
              <span></span>
            </Col>
          </Row>

          <Row></Row>
        </section>
      </Container>
    </div>
  );
};

export default Banner;

import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        backgroundcolor: "grey",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Project-V</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
import React, { Component } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import "./SuccessRegister.css";

export default class SuccessRegister extends Component {
  onSubmit = (e) => {
    localStorage.getItem("register_status");
    localStorage.removeItem("register_status");
    window.location.href = "/login";
  };
  render() {
    let redirectVar = null;

    if (localStorage.getItem("register_status")) {
      if (!localStorage.getItem("register_status") === "true") {
        redirectVar = <Redirect to="/" />;
        alert("registration not done");
      }
    } else {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div className="D">
        {redirectVar}
        <Container>
          <Row>
            <div className="auth-inner">
              <div className="intro-text">
                <h1 className="title">Succesfully Registered</h1>
              </div>
              <div className="buttonContainer">
                <a>
                  <Button
                    size="lg"
                    className="landingButton"
                    variant="outline-primary"
                    onClick={this.onSubmit}
                  >
                    {" "}
                    Login{" "}
                  </Button>
                </a>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

import { Axios } from "axios";
import React, { Component } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router";

export default class SlotSuccess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slotId: "",
      slotDate: "",
      slotTime: "",
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        slotId: this.props.location.state.slotId,
        slotDate: this.props.location.state.slotDate,
        slotTime: this.props.location.state.slotTime,
      });
    }
  }

  render() {
    localStorage.setItem("slot-id",this.props.location.state.slotId);
    return (
      <div className="D">
        <Container>
          <Row>
            <div className="auth-inner">
              <div className="intro-text">
                <h3 className="title">Slot booked succesfully</h3>
                <p>Your Slot Id is : {this.state.slotId}</p>
                <br />
                <p>Your Slot Date is : {this.state.slotDate}</p>
                <br />
                <p>Your Slot Time is : {this.state.slotTime}</p>
              </div>
              <div className="buttonContainer">
                <a href="/slotUpdate">
                  <Button
                    size="lg"
                    className="landingButton"
                    variant="outline-primary"
                  >
                    {" "}
                    Manage my slot{" "}
                  </Button>
                </a>
                <a href="/">
                  <Button size="lg" className="landingButton">
                    {" "}
                    Logout{" "}
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

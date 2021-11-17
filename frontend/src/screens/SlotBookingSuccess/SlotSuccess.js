import Axios  from "axios";
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
      cmessage:""
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        slotId: this.props.location.state.slotId,
        slotDate: this.props.location.state.slotDate,
        slotTime: this.props.location.state.slotTime,
        cmessage:""
      });
    }
  }
  handleOnLogout = e =>{
    localStorage.removeItem("slot-id");
  }
  clear = (e)=>{
    let sid = localStorage.getItem("slot-id"); 
     let data = {
       SlotId: sid
     };
    Axios.post("http://localhost:5000/admin/decline", data).then((response)=>{
      alert("Slot Cancelled Successfully");
      if (response.data) {
        alert("data");
        this.setState({
          cmessage: response.data.message,
        });
      }

    });
    alert("slot cancelled successfully");
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
                    className="landingButton1">
                    Manage slot
                  </Button>
                </a>
              <a href="/slot">
]                  <Button
                    size="lg"
                    onClick = {this.clear}
                    className="landingButton1">
                    Cancel slot
                  </Button>
                  </a>
                <a href="/">
                  <Button size="lg" 
                  className="landingButton1"
                  onClick = {this.handleOnLogout}>
                    Logout
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

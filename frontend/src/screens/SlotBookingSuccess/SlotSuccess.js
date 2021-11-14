import React, { Component } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router";


export default class SlotSuccess extends Component {
 
  render() {
    return (
      <div className="D">
        <Container>
          <Row>
            <div className="auth-inner">
              <div className="intro-text">
                <h3 className="title">Slot booked succesfully</h3>
                <p>The details of your slot are ...</p>
              </div>
              <div className="buttonContainer">
              < a href ="/slot">
                            <Button size='lg' className='landingButton' variant='outline-primary' > Manage my slot </Button>
                        </a>
                        < a href ="/">
                            <Button size='lg' className='landingButton' > Logout </Button>
                        </a>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

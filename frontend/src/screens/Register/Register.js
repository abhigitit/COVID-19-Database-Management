import { Container, form, Button } from "react-bootstrap";
import "./Register.css";
import React, { Component } from "react";
import axios from "axios";
var responseStatus;


export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
    };
  }

  onChange = (e) => {
    console.log("e.target.name" + e.target.name);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = () => {
    let data = {
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Email: this.state.Email,
      Password: this.state.Password,
    };

    axios
      .post("http://localhost:5000/register", data)
      .then((response) => {
        responseStatus =  response.status;
      })
      .catch((err) => {
        console.log("err" + err);
      });      
      this.props.history.push('/success');
      
  };

  render() {
    return (
      <div className="Register">
        <Container className="C">
          <div>
            <form onSubmit={this.onSubmit}>
              <h3>Register</h3>
              <div className="form-group">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  name="FirstName"
                  onChange={this.onChange}
                  value={this.state.fields["FirstName"]}
                />
              </div>

              <div className="form-group">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  name="LastName"
                  onChange={this.onChange}
                  value={this.state.fields["LastName"]}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="Email"
                  onChange={this.onChange}
                  value={this.state.fields["Email"]}
                />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Enter DOB"
                  name="DOB"
                  onChange={this.onChange}
                  value={this.state.fields["DOB"]}
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Address"
                  name="address"
                  onChange={this.onChange}
                  value={this.state.fields["address"]}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Home Phone"
                  name="homephone"
                  onChange={this.onChange}
                  value={this.state.fields["homephone"]}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Mobile"
                  name="mobile"
                  onChange={this.onChange}
                  value={this.state.fields["mobile"]}
                />
              </div>

              <div className="form-group">
                <label>Emergency Contact</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  onChange={this.onChange}
                  value={this.state.fields["name"]}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  name="phone"
                  onChange={this.onChange}
                  value={this.state.fields["phone"]}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="Password"
                  onChange={this.onChange}
                  value={this.state.fields["Password"]}
                />
              </div>
              <div className="registerButton">
              <Button type="submit">
                  Register
                </Button>
                <div>
                  <p className="AlreadyRegistered">
                    Already registered <a href="/login">log in?</a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

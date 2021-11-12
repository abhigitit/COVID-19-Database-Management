import { Container, Button } from "react-bootstrap";
import "./Register.css";
import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      message: "",
    };
  }

  onChange = (e) => {
    console.log("e.target.name" + e.target.name);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    let data = {
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Email: this.state.Email,
      Password: this.state.Password,
      DOB: this.state.DOB,
      address: this.state.address,
    };

    Axios.post("http://localhost:5000/register", data).then((response) => {
      console.log(response.data.message);
      if (response.data) {
        this.setState({
          message: response.data.message,
        });
      }
    });
  };

  render() {
    console.log(this.props);
    let redirectVar = null;

    if (this.state.message === "ok") {
      localStorage.setItem("register_status", "true");
      redirectVar = <Redirect to="/success" />;
      alert("Registered successfully");
    } else if (this.state.message === "notok") {
      alert("Registration failed");
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div className="Register">
        {redirectVar}
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
                  name="Ename"
                  onChange={this.onChange}
                  value={this.state.fields["Ename"]}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  name="Ephone"
                  onChange={this.onChange}
                  value={this.state.fields["Ephone"]}
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
                <Button type="submit">Register</Button>
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

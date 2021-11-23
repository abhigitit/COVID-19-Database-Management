import { Container, Button } from "react-bootstrap";
import "./Register.css";
import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router";
import moment from "moment";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      message: "",
      isSafe: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
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
      HomePhone: this.state.homePhone,
      Mobile: this.state.mobile,
      ECName: this.state.EContactName,
      ECPhone: this.state.EContactPhone,
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
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="Email"
                  onChange={this.onChange}
                  value={this.state.fields["Email"]}
                  required
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
                  required
                />
              </div>
              <div className="form-group">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter First name"
                  name="FirstName"
                  onChange={this.onChange}
                  value={this.state.fields["FirstName"]}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last name"
                  name="LastName"
                  onChange={this.onChange}
                  value={this.state.fields["LastName"]}
                  required
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
                  max={moment().format("YYYY-MM-DD")}
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
                <label>Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Mobile Phone"
                  name="mobile"
                  onChange={this.onChange}
                  value={this.state.fields["mobile"]}
                  required
                />
              </div>
              <div className="form-group">
                <label>Home Phone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Home Phone"
                  name="homePhone"
                  onChange={this.onChange}
                  value={this.state.fields["homePhone"]}
                />
              </div>

              <div className="form-group">
                <label>Emergency Contact Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Emergency Contact Name"
                  name="EContactName"
                  onChange={this.onChange}
                  value={this.state.fields["EContactName"]}
                />
              </div>
              <div className="form-group">
                <label>Emergency Contact Phone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Emergency Contact Phone"
                  name="EContactPhone"
                  onChange={this.onChange}
                  value={this.state.fields["EContactPhone"]}
                />
              </div>
              <div className="form-group">
                <input
                  name="isSafe"
                  type="checkbox"
                  checked={this.state.isSafe}
                  onChange={this.handleInputChange}
                />
                <label className="checkbox-label">
                  I dont have any covid symptoms from past 15 days
                </label>
              </div>
              <div className="registerButton">
                <Button disabled={!this.state.isSafe} type="submit">
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

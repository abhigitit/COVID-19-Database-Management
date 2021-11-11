import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "./Login.css";
import Axios from "axios";
import { Redirect } from "react-router";

export default class Login extends Component {
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
      Email: this.state.Email,
      Password: this.state.Password,
    };
    Axios.post("http://localhost:5000/login", data).then((response) => {
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
      localStorage.setItem("login_status", "true");
      alert("Logged in successfully");
      redirectVar = <Redirect to="/slot" />;
    } else if (this.state.message === "notok") {
      alert("Log in failed");
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div className="Login">
        {redirectVar}
        <Container className="C">
          <div>
            <form className="f" onSubmit={this.onSubmit}>
              <h3>Sign In</h3>
              <div className="form-group"></div>
              <div className="form-group">
                <label>Email address</label>
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

              <div className="buttonContainer">
                <button type="submit" className="btn btn-primary btn-block">
                  Log In
                </button>
              </div>
              <div className="forgot-password">
                <p>
                  Forgot <a href="/">password?</a>
                </p>
              </div>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

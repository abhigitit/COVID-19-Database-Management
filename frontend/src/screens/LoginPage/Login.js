import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import "./Login.css";
import axios from "axios";

export default class Login extends Component {
    constructor(){
        super();
        this.state ={
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
          Email: this.state.Email,
          Password: this.state.Password,
        };
        let error = false;
        axios
          .post("http://localhost:5000/login", data)
          .then((response) => {
            //alert(response.status);
            //   responseCode = response.status;
            //this.props.history.push('/success');
          })
          .catch((err) => {
            console.log("err" + err);
            error = true;
            alert(err);

          });

          //alert(responseCode ==200);
          // if(!error){
          //   this.props.history.push('/success');
          // }
          // else{
          //   this.props.history.push('/error');

          // }
        this.props.history.push('/success');
      };


    render() {
        return (
        <div className="Login">        
        <Container className= "C">
        <div>
            <form className="f" onSubmit={this.onSubmit}>
                <h3>Sign In</h3>
                <div className="form-group">
                
              </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" 
                    className="form-control"
                    placeholder="Enter email" 
                    name="Email"
                    onChange={this.onChange} 
                    value={this.state.fields["Email"]}                   
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" 
                    className="form-control" 
                    placeholder="Enter password"
                    name="Password"
                    onChange={this.onChange} 
                    value={this.state.fields["Password"]}  />
                </div>
                
                <div className="buttonContainer">
                <button type="submit" 
                className="btn btn-primary btn-block" 
                >
                    Log In
                    </button>
                </div>
                <div className="forgot-password">
                    <p >
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




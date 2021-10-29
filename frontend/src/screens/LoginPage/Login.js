import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import "./Login.css";
import axios from "axios"




export default class Login extends Component {
    constructor(){
        super();
        this.state ={
            Age: "Not yet decided"
        };
    }
   
    componentDidMount = () => {
        axios.get("/getAge").then(response => {
            // console.log(response.data);
            
            this.setState({
                Age: response.data.age
            })
        });
    };
    render() {
        return (
        <div className="Login">

        
        <Container className= "C">
            <div>
            
            <form className="f">
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                
                <div className="buttonContainer"><button type="submit" className="btn btn-primary btn-block">Submit</button></div>
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




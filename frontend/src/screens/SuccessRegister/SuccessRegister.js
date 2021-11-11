import React, { Component } from 'react'
import { Container,Row , Button} from 'react-bootstrap'

import './SuccessRegister.css'

export default class SuccessRegister extends Component {
    render() {
        return (          
            <div className="main">
            <Container>
                <Row>
                    <div className="auth-inner">
                    <div className="intro-text">
                        <h1 className='title'>Succesfully Registered</h1>
                    </div>
                    <div className = "buttonContainer">
                        < a href ="/login">
                            <Button size='lg' className='landingButton' variant='outline-primary' > Login </Button>
                        </a>
                    </div>
                    </div>
                    </Row>
            </Container>
            
        </div>
        );
    }
}

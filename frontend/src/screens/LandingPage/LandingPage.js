import React from 'react'
import { Container,Row , Button} from 'react-bootstrap'
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <h1 className='title'>Welcome to Project-V</h1>
                        <p className='subtitle'> Dont have an account? Click on register </p>

                    </div>
                    <div className = "buttonContainer">
                        < a href ="/login">
                            <Button size='lg' className='landingButton' variant='outline-primary' > Login </Button>
                        </a>
                        < a href ="/register">
                            <Button size='lg' className='landingButton' > Register </Button>
                        </a>
                    </div>
                    </Row>
            </Container>
            
        </div>
    )
}

export default LandingPage

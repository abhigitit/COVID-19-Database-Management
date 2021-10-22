import React from 'react'
import { Container,Row } from 'react-bootstrap'
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <h1>Welcome to V-Vaccination</h1>

                    </div>
                    </Row>
            </Container>
            
        </div>
    )
}

export default LandingPage

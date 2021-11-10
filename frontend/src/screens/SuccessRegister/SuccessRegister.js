import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

import './SuccessRegister.css'

export default class SuccessRegister extends Component {
    render() {
        return (          
            <div className="D">            
                   <div className = "buttonContainer">                
                        < a href ="/login">
                            <Button size='lg' className='landingButton' variant='outline-primary' > Login </Button>
                        </a>
                       </div>
                    </div>
            
        );
    }
}

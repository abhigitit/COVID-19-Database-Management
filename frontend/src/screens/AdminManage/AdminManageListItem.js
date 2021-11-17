import React, { Component } from 'react'
import { Container, Button } from "react-bootstrap";
import Axios from "axios";


export class AdminManageListItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
          disabled : false

        }
        this.onApprove = this.onApprove.bind(this);
        this.onDecline = this.onDecline.bind(this);

    }

    onDecline = (e) => {
      if (this.state.disabled) {
        return;
    }
    this.setState({disabled: true});
        e.preventDefault();
        let data = {
          SlotId: this.props.data.slot_id,
        };
        Axios.post("http://localhost:5000/admin/decline", data).then((response) => {
          alert(response);
          if (response.data) {
            this.setState({
              message: response.data.message,
            });
          }
        });
      };

    onApprove = (e) => {
      if (this.state.disabled) {
        return;
    }
    this.setState({disabled: true});
        e.preventDefault();
        let data = {
          SlotId: this.props.data.slot_id,
        };
        Axios.post("http://localhost:5000/admin/authorize", data).then((response) => {
          alert(response.data.message);
          if (response.data) {
            this.setState({
              message: response.data.message,
            });
          }
        });
      };

    render() {
        return (
            <div>
            <li className="list-group-item"> 
                <div className="row">
                    <div className="col-md-2">{this.props.data.p_id}</div>
                    <div className="col-md-2 ">{this.props.data.v_name}</div>
                    <div className="col-md-6">
                        <button className="btn btn-danger mr-4"  disabled={this.state.disabled} onClick={this.onDecline}> Decline</button>
                        <button className="btn btn-primary" disabled={this.state.disabled} onClick={this.onApprove}> Approve</button>
                    </div>       
                </div>
            </li>
            </div>
            
            
        )
    }
}

export default AdminManageListItem

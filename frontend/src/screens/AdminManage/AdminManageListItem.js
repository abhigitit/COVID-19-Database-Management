import React, { Component } from 'react'

export class AdminManageListItem extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <li className="list-group-item"> 
                <div className="row">
                    <div className="col-md-2 ">{this.props.data}</div>
                    <div className="col-md-2">{this.props.data}</div>
                    <div className="col-md-2">{this.props.data}</div>
                    <div className="col-md-6">
                        <button className="btn btn-danger mr-4"> Decline</button>
                        <button className="btn btn-primary"> Approve</button>
                    </div>

                    {/* <div className="col-md-3"> */}
                    {/* </div> */}
                </div>
            </li>
        )
    }
}

export default AdminManageListItem

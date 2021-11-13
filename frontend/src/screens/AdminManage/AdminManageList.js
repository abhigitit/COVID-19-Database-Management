import React, { Component } from 'react'
import AdminManageListItem from './AdminManageListItem'

export class AdminManageList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            appointmentList:['test1','test2']
        }
    }

    render() {
        return (
            <div className="container mt-4">
                <ul className="list-group">
                    {this.state.appointmentList.map(app=>{
                        return <AdminManageListItem data={app}></AdminManageListItem>
                    })}
                </ul>
            </div>
        )
    }
}

export default AdminManageList

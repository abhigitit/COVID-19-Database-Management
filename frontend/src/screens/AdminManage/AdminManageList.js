import React, { Component } from 'react'
import AdminManageListItem from './AdminManageListItem'
import { Container, Button } from "react-bootstrap";
import Axios from "axios";

export class AdminManageList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            vaccineData: [],
        };
    }

    componentDidMount(props) {
        let vaccineNameUrl = "http://localhost:5000/slotbookingfetch/slot";
        // let vaccineCenterUrl =
        //   "http://localhost:5000/slotbookingfetch/vaccinationcenter";
        Axios.all([Axios.get(vaccineNameUrl)]).then(
          (res) => {
              console.log(res);
            this.setState({
                 slotId: res[0].data[0]?.slot_id,
                 vaccineData: res[0].data,
                // vaccineName: res[0].data,
                // vaccineNameControl: res[0].data[0]?.v_name,
                // vaccineCenterControl: res[1].data[0]?.vc_name,
            });
          }
        );
        // Axios.get(vaccineNameUrl).then((res)=>{
        //   console.log(res.data)
        //   this.setState({vaccineName:res.data})
        // })
      }
    




    render() {
        // console.log("🚀 ~ file: AdminManageList.js ~ line 13 ~ AdminManageList ~ constructor ~ vaccineName", this.state.vaccineName)


        return (
            <div className="container mt-4">
                {/* <ul className="list-group"> */}
                   
                       {this.state.vaccineData.map((i) => {
                                 console.log("🚀 yo", i)

                return <AdminManageListItem data={i}></AdminManageListItem>

            })}
                    

                {/* </ul> */}
                < a href ="/managestock">
                <Button 
                type="submit">Manage Stock</Button>
                </a>
                <Button 
                type="submit">Log Out</Button>
            </div>
        )
    }
}

export default AdminManageList

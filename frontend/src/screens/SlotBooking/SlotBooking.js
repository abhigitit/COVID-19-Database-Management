import React, { Component } from 'react'
import './SlotBooking.css'
import Axios from "axios";
import { Container,Row , Button} from 'react-bootstrap'
import moment from 'moment';
import DatePicker from "react-datepicker";
export default class SlotBooking extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       vaccineName:[],
       vaccineCenters:[],
       vaccineNameControl:'',
       vaccineCenterControl:'',
       appointmentDate:'',
    }
  }
  
   componentDidMount(props)
  {
    let vaccineNameUrl="http://localhost:5000/slotbookingfetch/vaccine";
    let vaccineCenterUrl="http://localhost:5000/slotbookingfetch/vaccinationcenter";
    Axios.all([Axios.get(vaccineNameUrl),Axios.get(vaccineCenterUrl)]).then((res)=>{
      this.setState({
        vaccineName:res[0].data,
        vaccineCenters:res[1].data,
        vaccineNameControl:res[0].data[0]?.v_name,
        vaccineCenterControl:res[1].data[0]?.vc_name
      })
    })
    // Axios.get(vaccineNameUrl).then((res)=>{
    //   console.log(res.data)
    //   this.setState({vaccineName:res.data})
    // })
  }

  handleOnSubmit=(e)=>{
    console.log(this.state.vaccineCenterControl)
    console.log(this.state.vaccineNameControl)
    console.log(this.state.appointmentDate)
    e.preventDefault();
  }
  handleVaccineName=(e)=>{
    console.log(e.target.value)
    this.setState({vaccineNameControl:e.target.value})
  }
  handleVaccineCenter=(e)=>{
    console.log(e.target.value)
    this.setState({vaccineCenterControl:e.target.value})
  }
  handleAppointmentDate=(e)=>{
    console.log(e.target.value)
    this.setState({appointmentDate:e.target.value})
  }
  render() {
    return (
      <div className="container mt-2">
  <form onSubmit={this.handleOnSubmit} name=""> 
        <label id = "label" >Vaccine Name</label>
        <select className="form-control" name="vaccineName" onChange={this.handleVaccineName}>
          {this.state.vaccineName.map(i=>{
            return <option value={i.v_name} key={i.v_name}>{i.v_name}</option>
          })}
        </select>

        <label class="labelSlot">Vaccine Center</label>
        <select className="form-control" name="vaccineCenter" onChange={this.handleVaccineCenter}>
          {this.state.vaccineCenters.map(i=>{
            return <option value={i.vc_name} key={i.vc_name}>{i.vc_name}</option>
          })}
        </select>

        <label class="labelSlot">Appointment Date</label>
        <input type="date" className="form-control" name="appointmentDate" onChange={this.handleAppointmentDate}></input>
       

        <label class="labelSlot">Appointment Time</label>
        <input type="text" className="form-control" name="timeOfSlot"></input>

        <div>
        <div className = "buttonContainer">
            < a href ="/login">
            <Button size='lg' className='landingButton' variant='outline-primary' > Book Slot </Button>
            </a>
            < a href ="/">
            <Button size='lg' className='landingButton' > Logout </Button>
            </a>
             </div>
        </div>
</form>
      </div>
    )
  }
}
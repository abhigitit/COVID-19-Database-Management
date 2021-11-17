import React, { Component } from "react";
import "./SlotBooking.css";
import Axios from "axios";
import { Button } from "react-bootstrap";
import moment from "moment";
import { Redirect } from "react-router";

export default class SlotBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vaccineName: [],
      vaccineCenters: [],
      vaccineNameControl: "",
      vaccineCenterControl: "",
      appointmentDate: "",
      appointmentTime: "",
      message: "",
      hideSuccess: true,
      successEmail: "",
      Email: JSON.parse(localStorage.getItem("login_status")).emailId,

    };
  }

  componentDidMount(props) {
    let vaccineNameUrl = "http://localhost:5000/slotbookingfetch/vaccine";
    let vaccineCenterUrl =
      "http://localhost:5000/slotbookingfetch/vaccinationcenter";
    Axios.all([Axios.get(vaccineNameUrl), Axios.get(vaccineCenterUrl)]).then(
      (res) => {
        this.setState({
          vaccineName: res[0].data,
          vaccineCenters: res[1].data,
          vaccineNameControl: res[0].data[0]?.v_name,
          vaccineCenterControl: res[1].data[0]?.vc_name,
        });
      }
    );
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    alert(this.state.vaccineCenterControl);
    alert(this.state.vaccineNameControl);
    console.log(this.state.appointmentDate);
    console.log(this.state.appointmentTime);
    console.log(this.state.Email);
    let data = {
      Slotid: localStorage.getItem("slot-id"),
      VC_name: this.state.vaccineCenterControl,
      V_name: this.state.vaccineNameControl,
      FDate: this.state.appointmentDate,
      Ftime: this.state.appointmentTime,
      Email: this.state.Email,
    };
    Axios.post("http://localhost:5000/slotbookingfetch/slotUpdate", data).then(
      (response) => {
        console.log(response.data.message);
        if (response.status === 200) {
          var slotId = new String(response.data.id);
          this.setState({
            message: response.data.message,
            hideSuccess: false,
            successEmail: JSON.parse(localStorage.getItem("login_status"))
              .emailId,
            slotId: slotId.toString(),
          });
          Axios.post(
            "http://localhost:5000/slotbookingfetch/updateStockOnBooking",
            data
          ).then((response) => {
            console.log(response.data.message);
            if (response.status === 200) {
              alert("Stock reduced");
            }
          });
      }
      });
  };
  handleVaccineName = (e) => {
    console.log(e.target.value);
    this.setState({ vaccineNameControl: e.target.value });
  };
  handleVaccineCenter = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({ vaccineCenterControl: e.target.value });
    let data = {
      vc_name: e.target.value,
    };
    Axios.post("http://localhost:5000/slotbookingfetch/vaccine", data).then(
      (response) => {
        console.log(response.data.message);
        if (response.data) {
          this.setState({
            message: response.data.message,
            vaccineName: response.data,
          });
        }
      }
    );
  };

  handleAppointmentDate = (e) => {
    console.log(e.target.value);
    this.setState({ appointmentDate: e.target.value });
  };
  handleAppointmentTime = (e) => {
    console.log(e.target.value);
    this.setState({ appointmentTime: e.target.value });
  };
  render() {

    let redirectVar = null;
    //alert(localStorage.getItem("slot-id"));

    if (this.state.successEmail) {
      redirectVar = (
        <Redirect
          to={{
            pathname: "/slotBookingSuccess",
            state: {
              slotId: localStorage.getItem("slot-id"),
              slotDate: this.state.appointmentDate,
              slotTime: this.state.appointmentTime,
            },
          }}
        />
      );
    }

    return (
      <div className="container mt-2">
        {redirectVar}
        <form name="" hidden={!this.state.hideSuccess}>
          <label class="labelSlot">Vaccine Center</label>
          <select
            className="form-control"
            name="vaccineCenter"
            onChange={this.handleVaccineCenter}
          >
            {this.state.vaccineCenters.map((i) => {
              return (
                <option value={i.vc_name} key={i.vc_name}>
                  {i.vc_name}
                </option>
              );
            })}
          </select>
          <label id="label">Vaccine Name</label>
          <select
            className="form-control"
            name="vaccineName"
            onChange={this.handleVaccineName}
          >
            {this.state.vaccineName.map((i) => {
              return (
                <option value={i.v_name} key={i.v_name}>
                  {i.v_name}
                </option>
              );
            })}
          </select>

          <label class="labelSlot">Appointment Date</label>
          <input
            type="date"
            className="form-control"
            name="appointmentDate"
            onChange={this.handleAppointmentDate}
            min={moment().format("YYYY-MM-DD")}
          ></input>

          <label class="labelSlot">Appointment Time</label>
          <input
            type="time"
            className="form-control"
            name="timeOfSlot"
            onChange={this.handleAppointmentTime}
          ></input>

          <div>
            <div className="buttonContainer">
              <a href="/slotBookingSuccess">
                <Button
                  size="lg"
                  className="landingButton"
                  variant="outline-primary"
                  onClick={this.handleOnSubmit}
                >
                  {" "}
                  Book Slot{" "}
                </Button>
              </a>
              <a href="/">
                <Button size="lg" className="landingButton">
                  {" "}
                  Logout{" "}
                </Button>
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

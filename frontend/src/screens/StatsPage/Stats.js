import React, { Component } from "react";
import "./Stats.css";

import Axios from "axios";
import Table from "../Table/Table";

export default class stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: [],
    };
  }
  componentDidMount(props) {
    Axios.get("http://localhost:5000/stats").then((response) => {
      console.log(response);
      this.setState({
        stats: response.data,
      });

    });
  }



  render() {
        
        
    return (
      <div className="Table">
        <Table data={this.state.stats}/>
      </div>
      
    );
}


}

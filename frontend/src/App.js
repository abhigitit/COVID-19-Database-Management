import React, { Component } from "react";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
// import { BrowserRouter, Route, Switch } from "react-router-dom";


class App extends Component {
  render() {
    
    return (
      <>
      <Header/>
      <main>
        <LandingPage/>
      </main>

      <Footer/>
      </>
    );
  }
}
 
export default App;

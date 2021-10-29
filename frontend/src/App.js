import React from "react";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route} from "react-router-dom";

import Stats from "./screens/StatsPage/Stats";
import Login from "./screens/LoginPage/Login";
import Register from "./screens/Register/Register";
import SuccessRegister from "./screens/SuccessRegister/SuccessRegister";



const App = () => (
  <BrowserRouter>
    <Header/>
      <main>
       <Route path ='/' component ={LandingPage} exact />
       <Route path ='/stats' component ={Stats} />
       <Route path ='/login' component ={Login} />
       <Route path ='/register' component ={Register} />
       <Route path ='/success' component ={SuccessRegister} />
      </main>

      <Footer/>
      </BrowserRouter>
);


export default App


 


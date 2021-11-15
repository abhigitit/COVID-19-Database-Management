import React from "react";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Stats from "./screens/StatsPage/Stats";
import Login from "./screens/LoginPage/Login";
import Register from "./screens/Register/Register";
import SuccessRegister from "./screens/SuccessRegister/SuccessRegister";
import SlotBooking from "./screens/SlotBooking/SlotBooking";
import AdminLogin from "./screens/AdminLogin/AdminLogin";
import AdminManage, {
  AdminManageList,
} from "./screens/AdminManage/AdminManageList";
import SlotBookingSuccess from "./screens/SlotBookingSuccess/SlotSuccess";
import ManageStock from "./screens/AdminManage/Stock/ManageStock";

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" component={LandingPage} exact />
      <Route path="/stats" component={Stats} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/success" component={SuccessRegister} />
      <Route path="/slot" component={SlotBooking} />
      <Route path="/adminlogin" component={AdminLogin} />
      <Route path="/admin/manage" component={AdminManageList} />
      <Route path="/slotsuccess" component={SlotBookingSuccess} />
      <Route path="/managestock" component={ManageStock} />
      <Route path="/slotBookingSuccess" component={SlotBookingSuccess} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default App;

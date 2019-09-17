import React from "react";
// import logo from "./logo.svg";
import { RouterGuard } from "react-router-guard";
import { BrowserRouter } from "react-router-dom";
// import Home from "./pages/home/home";
// import Login from "./pages/login/login";
// import ForgotPassword from "./pages/forgot-password/forgot-password";
import "./App.css";
import routes from "./route-config";

function App() {
  return (
    <div className="App">
      <BrowserRouter forceRefresh={true}>
        <RouterGuard config={routes} />
        {/* <Switch>
          <Route path="/" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch> */}
      </BrowserRouter>
    </div>
  );
}

function getAuthorization() {
  let token = JSON.parse(localStorage.getItem(Constants.loggedInUser)).token;
  return `Bearer ${token}`;
}

function formatDate(date) {
  let dateWhole = new Date(date);

  date = `${dateWhole.getDate()} , ${dateWhole.getMonth()} ${dateWhole.getFullYear()}`;
  return date;
}

export const Constants = {
  baseUrl: "http://localhost:3500",
  loggedInUser: "logged_in_user",
  getAuthorization: getAuthorization,
  formatDate: formatDate
};

export default App;

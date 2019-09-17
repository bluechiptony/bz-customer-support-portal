import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "font-awesome/css/font-awesome.min.css";
import "./styles/styles.scss";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import ForgotPassword from "./pages/forgot-password/forgot-password";
import SetPassword from "./pages/set-password/set-password";
import TicketPage from "./pages/ticket-page/ticket-page";
import NotFound from "./pages/not-found/not-found";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// import App from "./App";
import * as serviceWorker from "./serviceWorker";

export const ParentVar = React.createContext([{}, () => {}]);

const RoutingApp = () => {
  const [sample, setSample] = useState({ name: "tony", age: 45 });
  return (
    <ParentVar.Provider value={[sample, setSample]}>
      <Router>
        <Switch>
          <Route exact path="/" render={props => <Login {...props} />} />
          <Route exact path="/dashboard" component={Home} />
          {/* <Route exact path="/dashboard/tickets" component={Home} /> */}
          <Route exact path="/dashboard/ticket/:ticketNumber" component={TicketPage} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password/:token" component={SetPassword} />
          <Route path="/activate-account/:token" component={SetPassword} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ParentVar.Provider>
  );
};

const routing = <RoutingApp />;

ReactDOM.render(routing, document.getElementById("root"));
// ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

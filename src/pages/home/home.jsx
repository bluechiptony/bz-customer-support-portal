import React from "react";
// import { Route, Switch } from "react-router-dom";
import TicketBay from "../ticket-bay/ticket-bay";
// import TicketPage from "../ticket-page/ticket-page";
// import Overview from "../overview/overview";
import AppHeader from "../../components/header/header";

// const InnerRoutes = props => {
//   return (
//     <div>
//       <Switch>
//         <Route path="/" component={TicketBay} />
//         <Route path={`/ticket/:ticketNumber`} exact component={TicketPage} />
//       </Switch>
//     </div>
//   );
// };

const Home = props => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <div className="row">
            <div className="col-lg-12">
              <AppHeader {...props} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {/* <InnerRoutes {...props} /> */}
              <TicketBay {...props} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { Component } from "react";
// import Overview from "../overview/overview";
import TicketContent from "../../components/ticket-content/ticket-content";
import TicketResponse from "../../components/ticket-response/ticket-response";
import AppHeader from "../../components/header/header";
class TicketPage extends Component {
  constructor(props) {
    super(props);
    console.log("Props");
    console.log(this.props);
  }
  render = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="row">
              <div className="col-lg-12">
                <AppHeader {...this.props}/>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-7">
                <TicketContent {...this.props} />
              </div>
              <div className="col-lg-5">
                <TicketResponse {...this.props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default TicketPage;

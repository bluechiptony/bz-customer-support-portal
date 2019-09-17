import React, { Component } from "react";
import renderHTML from "react-render-html";
import { Constants } from "../../App";
class Ticket extends Component {
  state = {};
  constructor(props) {
    super(props);

    this.openTicketPage = this.openTicketPage.bind(this);
  }

  componentDidMount = () => {};

  componentWillUnmount = () => {};

  formatDate = date => {
    let dateWhole = new Date(date);

    date = `${dateWhole.getDate()} , ${dateWhole.getMonth()} ${dateWhole.getFullYear()}`;
    return date;
  };

  openTicketPage = () => {
    this.props.history.push(`/dashboard/ticket/${this.props.ticket.ticketNumber}`);
  };
  render = () => {
    const { ticketNumber, createdDate, subject, description, resolved } = this.props.ticket;
    return (
      <div className="col-lg-4">
        <div className="ticket animated fadeIn">
          <div className="ticket-header">
            <div className="row">
              <div className="col-lg-7">
                <span className="ticket-prompt uppercase ">ticket Number</span>
                <br />
                <span className="ticket-number ">{ticketNumber}</span>
              </div>
              <div className="col-lg-5">
                <div className="right-text clearfix">
                  {resolved ? <span className="status-pill-closed">Closed</span> : <span className="status-pill-open">Open</span>}
                </div>
              </div>
            </div>
          </div>
          <div className="ticket-body">
            <div className="">
              <span className="ticket-title inline-block">{subject} </span>
              <br />
              <span className="ticker-excerpt ovr">{renderHTML(`${description}`)}</span>
            </div>
          </div>
          <div className="ticket-footer">
            <div className="row">
              <div className="col-lg-7">
                <div className="">
                  <span className="ticket-prompt uppercase ">ticket Date</span>
                  <br />
                  <span className="ticket-subtitle">{Constants.formatDate(createdDate)}</span>
                </div>
              </div>
              <div className="col-lg-5">
                <button className="pull-right ticket-button" onClick={this.openTicketPage}>
                  View Ticket
                </button>
              </div>
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    );
  };
}

export default Ticket;

import React, { Component } from "react";
import Comment from "../../components/comment/comment";
import { Constants } from "../../App";
import axios from "axios";
import renderHTML from "react-render-html";

// const  = props => {
class TicketContent extends Component {
  responseRender = null;
  constructor(props) {
    super(props);
    const { ticketNumber } = this.props.match.params;
    this.state = {
      ticketNumber: ticketNumber,
      loading: false,
      ticket: {},
      responsesToRender: []
    };
  }
  componentDidMount = () => {
    this.getTicketInformation = this.getTicketInformation.bind(this);
    this.getTicketCorrrespondence = this.getTicketCorrrespondence.bind(this);
    this.renderResponses = this.renderResponses.bind(this);
    this.closeTicket = this.closeTicket.bind(this);
    this.getTicketInformation();
    this.getTicketCorrrespondence();
  };

  getTicketInformation = () => {
    this.setState({ loading: true });
    axios
      .get(`${Constants.baseUrl}/tickets/get/${this.state.ticketNumber}`, { headers: { Authorization: Constants.getAuthorization() } })
      .then(dataObject => {
        this.setState({ loading: false });
        let { data } = dataObject;

        if (data.success) {
          console.log(data.data);
          this.setState({ ticket: data.data });
        }
      })
      .catch(errorObject => {
        this.setState({ loading: false });
        console.log(errorObject.response);
      });
  };

  getTicketCorrrespondence = () => {
    axios
      .get(`${Constants.baseUrl}/tickets/responses/${this.state.ticketNumber}`, { headers: { Authorization: Constants.getAuthorization() } })
      .then(dataObject => {
        let { data } = dataObject;
        if (data.success) {
          console.log(data.data);

          this.renderResponses(data.data);
        }
      })
      .catch(errorObject => {
        console.log(errorObject.response);
      });
  };

  closeTicket = () => {};

  reopenTicket = () => {};

  renderResponses = responses => {
    this.responseRender = responses.map(response => {
      if (response.showCustomer) {
        return <Comment {...this.props} response={response} key={response.id} />;
      }
    });
    this.setState({ responsesToRender: this.responseRender });
  };

  render = () => {
    const { ticket, loading, responsesToRender } = this.state;
    return (
      <div className="container-fluid">
        <div className="col-lg-12">
          <div className="component-boundary">
            {loading ? (
              <div className="row">
                <div className="center-text animated pulse infinite load-holder-smaller">
                  <span className="loading-mega block">Loading ticket</span>
                  <span className="loading-sub block">Please wait</span>
                </div>
              </div>
            ) : (
              <div className="animated fadeIn">
                <div className="app-row-spacer">
                  <div className="row ">
                    <div className="col-lg-6">
                      <span className="ticket-prompt block">Ticket Number</span>
                      <span className="ticket-number">{ticket.ticketNumber}</span>
                    </div>
                    <div className="col-lg-6 right-text">
                      <span className="ticket-prompt block">Ticket Status</span>
                      {ticket.resolved ? (
                        <span className="status-pill-closed">Closed</span>
                      ) : (
                        <span>
                          <span className="status-pill-open block">Open</span> <br />
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 app-row-spacer">
                    <div className="">
                      <span className="ticket-prompt block">Product</span>
                      <span className="ticket-number block">{ticket.solutionName}</span>
                    </div>
                  </div>
                  <div className="col-lg-12 app-row-spacer">
                    <span className="block ticket-title">{ticket.subject}</span>
                    <span className="ticket-text">{renderHTML(`${ticket.description}`)}</span>
                  </div>
                </div>

                {!ticket.resolved && ticket !== undefined ? (
                  <div className="row">
                    <div className="col-lg-12">
                      <button className="app-button text-whoite background-main pull-right">Close this Ticket</button>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-lg-12">
                      <button className="app-button text-whoite background-red pull-right">Reopen this Ticket</button>
                    </div>
                  </div>
                )}

                <div className="app-row-spacer" />
              </div>
            )}

            <div className="row">{responsesToRender}</div>
          </div>
        </div>
      </div>
    );
  };
}

export default TicketContent;

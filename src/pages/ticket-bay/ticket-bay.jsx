import React, { Component } from "react";
import Ticket from "../../components/ticket/ticket";
import Modal from "react-modal";
import Select from "react-select";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

import { Constants } from "../../App";

Modal.setAppElement("#root");
Modal.defaultStyles.overlay.backgroundColor = "#1b4d5664";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "600px",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// const options = [{ value: "gopos", label: "GoPOS" }, { value: "goteller", label: "goTeller" }, { value: "gopay", label: "goPay" }];

class TicketBay extends Component {
  state = {};
  ticketRender = null;
  solutions = [];
  issues = [];

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      editorState: EditorState.createEmpty(),
      comment: "",
      selectedSolution: "",
      selectedIssue: "",
      subject: "",
      description: "",
      solutions: [],
      issues: [],
      ticketsToRender: this.ticketRender,
      loading: false,
      hasTickets: false,
      hasError: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.filterTickets = this.filterTickets.bind(this);
    this.getRawEditorContent = this.getRawEditorContent.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleIssueChange = this.handleIssueChange.bind(this);
    this.getSolutions = this.getSolutions.bind(this);
    this.getIssues = this.getIssues.bind(this);
    this.getTicketsForUser = this.getTicketsForUser.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  tickets = [];

  //get tickets for user
  getTicketsForUser = () => {
    this.setState({ loading: true });
    axios
      .get(Constants.baseUrl + "/tickets/customer", {
        params: {
          pagesize: 20,
          pagenumber: 1,
          customer: JSON.parse(localStorage.getItem(Constants.loggedInUser)).emailAddress
        },
        headers: { Authorization: Constants.getAuthorization() }
      })
      .then(dataObject => {
        this.setState({ loading: false });
        let { data } = dataObject;
        if (data.success) {
          this.renderTickets(data.data);
        }
      })
      .catch(errorObject => {
        this.setState({ loading: false });
        console.log(errorObject);
      });
  };

  getRawEditorContent = editorState => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };
  onEditorStateChange = editorState => {
    this.setState({
      editorState: editorState,
      comment: this.getRawEditorContent(editorState),
      description: this.getRawEditorContent(editorState)
    });
  };

  getSolutions = () => {
    axios
      .get(Constants.baseUrl + "/solutions/get")
      .then(dataResponse => {
        console.log(dataResponse);
        const { success, data } = dataResponse.data;
        if (success) {
          let solns = data.map(dat => {
            return { value: dat.solutionCode, label: dat.solutionName };
          });
          this.setState({ solutions: solns });
        }
      })
      .catch(errorObject => {
        console.log(errorObject);
      });
  };

  getIssues = solution => {
    axios
      .get(Constants.baseUrl + "/issues/get/solution/" + solution, { headers: { Authorization: Constants.getAuthorization() } })
      .then(dataResponse => {
        console.log(dataResponse);
        const { success, data } = dataResponse.data;
        if (success) {
          let solns = data.map(dat => {
            return { value: dat.issueCode, label: dat.issueName };
          });
          this.setState({ issues: solns });
        }
      })
      .catch(errorObject => {
        console.log(errorObject);
      });
  };

  //select change
  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
  };
  handleSolutionChange = selectedOption => {
    this.setState({ selectedSolution: selectedOption.value });
    this.getIssues(selectedOption.value);
  };

  handleIssueChange = selectedOption => {
    this.setState({ selectedIssue: selectedOption.value });
  };

  componentDidMount = () => {
    this.setState({});
    this.renderTickets(this.tickets);
    this.getSolutions();
    this.getTicketsForUser();
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  filterTickets = event => {
    event.preventDefault();

    let ticks = this.tickets.filter(ticket => {
      // console.log(ticket.ticketNumber.includes(event.target.value));
      return ticket.ticketNumber.includes(event.target.value);
    });

    // console.log(ticks);

    this.renderTickets(ticks);
  };
  renderTickets = tickets => {
    this.ticketRender = tickets.map(ticket => {
      return <Ticket {...this.props} ticket={ticket} key={ticket.id} />;
    });
    this.setState({ ticketsToRender: this.ticketRender });
  };

  validateForm = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitForm = event => {
    event.preventDefault();

    let user = JSON.parse(localStorage.getItem(Constants.loggedInUser));
    let { description, subject, selectedSolution, selectedIssue } = this.state;
    let ticket = {
      customerName: `${user.firstName} ${user.lastName}`,
      customerEmailAddress: user.emailAddress,
      subject: subject,
      solution: selectedSolution,
      issue: selectedIssue,
      description: description,
      creator: user.userCode
    };
    console.log(ticket);

    axios
      .post(Constants.baseUrl + "/tickets/create", ticket, { headers: { Authorization: Constants.getAuthorization() } })
      .then(dataObject => {
        let { data } = dataObject;

        if (data.success) {
          this.closeModal();
        }
      })
      .catch(errorObject => {
        console.log(errorObject.response);
      });
  };

  render = () => {
    const { editorState, solutions, issues, loading } = this.state;
    const hackPadding = {
      paddingTop: "10px",
      paddingBottom: "10px"
    };
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 ">
            <div className="row-spacer col-lg-12 block">
              <button className="app-button background-main text-whoite pull-right" onClick={this.openModal}>
                Create Ticket
              </button>
              <input type="text" placeholder="search for ticket number ..." onChange={this.filterTickets} className="search-text-box  pull-right" />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="row">
            <div className="center-text animated pulse infinite load-holder">
              <span className="loading-mega block">Loading tickets</span>
              <span className="loading-sub block">Please wait</span>
            </div>
          </div>
        ) : (
          <div className="row">{this.ticketRender}</div>
        )}

        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={modalStyles} contentLabel="Test Modal">
          <div className="col-lg-12">
            {/* <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>
             */}
            <div>
              <span className="modal-heading">Create new ticket</span>
              <span className="pull-right pointer" onClick={this.closeModal}>
                close
              </span>
            </div>
          </div>
          <form onSubmit={this.submitForm}>
            <div className="col-lg-12">
              <div className="row" style={hackPadding}>
                <div className="col-lg-6">
                  <span className="form-prompt">Select Solution</span>
                  <Select options={solutions} onChange={this.handleSolutionChange} />
                </div>
                <div className="col-lg-6">
                  <div className="block">
                    <span className="form-prompt">Select Issue Category</span>
                    <Select options={issues} onChange={this.handleIssueChange} />
                  </div>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  className="app-text-box"
                  placeholder="Ticket Subject"
                  name="subject"
                  value={this.state.subject}
                  onChange={this.validateForm}
                />
              </div>

              <div className="form-row">
                <div>
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    // editorStyle={editorStyle}
                    placeholder="Say how we can help you..."
                    onEditorStateChange={this.onEditorStateChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="block-width">
                  <button className="app-button text-whoite background-main pull-right">submit</button>
                </div>
              </div>
            </div>
            <div className="col-lg-12" />
          </form>
        </Modal>
      </div>
    );
  };
}

export default TicketBay;

import React from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { Constants } from "../../App";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

// const editorStyle = {
//   border: "1px solid black",
//   padding: "5px 10px",
//   fontSize: "14px"
// };
class TicketResponse extends React.Component {
  constructor(props) {
    super(props);
    const { ticketNumber } = this.props.match.params;
    this.state = {
      editorState: EditorState.createEmpty(),
      comment: "",
      ticketNumber: ticketNumber,
      loading: false
    };
  }

  getRawEditorContent = editorState => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };
  onEditorStateChange = editorState => {
    this.setState({
      editorState: editorState,
      comment: this.getRawEditorContent(editorState)
    });
  };

  componentDidMount = () => {
    console.log(this.props);
    this.submitCorrespondence = this.submitCorrespondence.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.getRawEditorContent = this.getRawEditorContent.bind(this);
    this.submitResponse = this.submitResponse.bind(this);
  };

  submitCorrespondence = event => {
    event.preventDefault();
    let { comment, ticketNumber } = this.state;
    let user = JSON.parse(localStorage.getItem(Constants.loggedInUser));
    let response = {
      response: comment,
      ticketNumber: ticketNumber,
      showCustomer: true,
      isCustomer: true,
      respondeeUserCode: user.userCode,
      respondeeEmailAddress: user.respondeeEmailAddress
    };

    this.submitResponse(response);
  };

  validateForm(event) {}

  submitResponse(data) {
    this.setState({ loading: true });
    axios
      .post(Constants.baseUrl + "/tickets/response/create", data, { headers: { Authorization: Constants.getAuthorization() } })
      .then(dataObject => {
        console.log(dataObject);
        this.setState({ loading: false });

        let { data } = dataObject;

        if (data.success) {
        }
      })
      .catch(errorObject => {
        this.setState({ loading: false });
        console.log(errorObject);
      });
  }

  //   onEditorStateChange = () => {};

  render = () => {
    const { editorState, loading } = this.state;
    return (
      <div className="container-fluid">
        <div className="col-lg-12">
          <div className="component-boundary">
            <div className="row">
              <div className="col-lg-12" />
            </div>
            <div className="row">
              <div className="col-lg-12">
                <form onSubmit={this.submitCorrespondence}>
                  <div className="form-row ">
                    <div>
                      <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        // editorStyle={editorStyle}
                        placeholder="Say Something"
                        onEditorStateChange={this.onEditorStateChange}
                      />
                    </div>
                  </div>
                  <div className="form-row clearfix" />
                  <div className="form-row">
                    <div className="block-width">
                      <button className="app-button text-whoite background-main pull-right">{loading ? <span>Loading</span> : <span>Submit</span>}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default TicketResponse;

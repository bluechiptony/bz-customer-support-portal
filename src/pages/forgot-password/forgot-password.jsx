import React, { Component } from "react";
import { Link } from "react-router-dom";

class ForgotPassword extends Component {
  state = {};

  componentDidMount = () => {
    this.setState({
      emailAddress: ""
    });
  };

  componentWillUnmount = () => {};

  handleInputChange = () => {};

  submitHandler = () => {};
  validateForm = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render = () => {
    return (
      <div className="container-fluid page-height centered-flex background-main">
        <div className="fotgot-password-box col-lg-4">
          <form onSubmit={this.submitHandler}>
            <div className="form-row center-text">
              <span className="login-notice text-whoite">Forgot your password?</span>
            </div>
            <div className="form-row center-text">
              <span className="text-whoite">We can help you with that. Just give us your email address and we'll send you your recovery instructions</span>
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="Email address"
                name="emailAddress"
                className="app-text-box"
                value={this.state.emailAddress}
                onChange={this.validateForm}
              />
              <span />
            </div>
            <div className="form-row centered-flex">
              <button type="submit" className="login-button uppercase">
                recover my password
              </button>
              <span />
            </div>
            <div className="form-row center-text">
              <span className="text-whoite">
                Dont need this now? &nbsp;
                <Link to={`/`}>
                  {" "}
                  <span className="link-up">Go back</span>
                </Link>
              </span>
              <span />
            </div>
          </form>
        </div>
      </div>
    );
  };
}

export default ForgotPassword;

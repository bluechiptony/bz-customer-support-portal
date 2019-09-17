import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
class SetPassword extends Component {
  state = {
    password: "",
    confirmPassword: "",
    token: "",
    showSuccess: false,
    showError: false,
    succesMessage: "",
    errorMessage: ""
  };
  componentDidMount = () => {
    console.log(this.props);

    const { token } = this.props.match.params;
    this.setState({ token: token });
    this.submitHandler = this.submitHandler.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
    this.validateForm = this.validateForm.bind(this);
  };

  componentWillUnmount = () => {};

  handleInputChange = () => {};

  submitHandler = e => {
    e.preventDefault();
    this.submitRequest();
  };

  submitRequest = () => {
    let request = {
      password: this.state.password,
      activationToken: this.state.token
    };

    axios
      .put("http://localhost:3500/auth/activate-account", request)
      .then(data => {
        console.log(data);
        if (data.data.success && data.status === 202) {
          this.setState({ showSuccess: true });
        }
      })
      .catch(errorObject => {
        let { success, error } = errorObject.response.data;
        if (!success) {
          this.setState({
            showError: true,
            errorMessage: error
          });
        }
      });
  };

  validateForm = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render = () => {
    const { showError, showSuccess, errorMessage } = this.state;
    return (
      <div className="container-fluid page-height centered-flex background-main">
        {!showError && !showSuccess && (
          <div className="fotgot-password-box col-lg-4">
            <form onSubmit={this.submitHandler}>
              <div className="form-row center-text centered-flex">
                <span className="login-notice text-whoite">
                  Reset your password <br />
                </span>
              </div>
              <div className="form-row center-text">
                <span className="text-whoite">Please set your new password and confirm it to be able to continue</span>
              </div>
              <div className="form-row">
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="app-text-box"
                  value={this.state.password}
                  onChange={this.validateForm}
                />
                <span />
              </div>
              <div className="form-row">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  className="app-text-box"
                  value={this.state.confirmPassword}
                  onChange={this.validateForm}
                />
                <span />
              </div>
              <div className="form-row centered-flex">
                <button type="submit" className="login-button uppercase">
                  reset password
                </button>
                <span />
              </div>
              <div className="form-row center-text centered-flex">
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
        )}

        {showError && (
          <div className="fotgot-password-box col-lg-4">
            {/* <span>Error</span> */}
            <div className="form-row center-text centered-flex">
              <span className="login-notice text-whoite">
                Application error <br />
              </span>
            </div>
            <div className="form-row center-text centered-flex">
              <span className="text-whoite">{errorMessage}</span>
            </div>
          </div>
        )}
        {showSuccess && (
          <div className="fotgot-password-box col-lg-4">
            <span>Success</span>
          </div>
        )}
      </div>
    );
  };
}

export default SetPassword;

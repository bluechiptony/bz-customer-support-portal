import React, { Component } from "react";
import { Link } from "react-router-dom";
class ProfileBox extends Component {
  state = {};
  errors = {};
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount = () => {
    this.setState({
      firstName: "John",
      lastName: "Doe",
      emailAddress: "john.doe@gmail.com",
      loggedIn: true
    });

    this.submitHandler = this.submitHandler.bind(this);
    this.validateForm = this.validateForm.bind(this);
  };

  componentWillUnmount = () => {};

  submitHandler = event => {
    event.preventDefault();
    // this.props.history.push("/dashboard");
  };

  validateForm = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render = () => {
    const { firstName, lastName, emailAddress, loggedIn } = this.state;
    return (
      <div className="col-lg-12">
        <div className="profile-box">
          <span className="">
            {firstName} {lastName}
          </span>
          <span className="">
            {firstName} {lastName}
          </span>
          {loggedIn && <span> Log Out</span>}
        </div>
      </div>
    );
  };
}

export default ProfileBox;

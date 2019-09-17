import React from "react";
import logo from "../../assets/imgs/bizzdeskgroup-tight.jpg";
import { Constants } from "../../App";
import { Link } from "react-router-dom";

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem(Constants.loggedInUser))
    };

    this.logOut = this.logOut.bind(this);
  }

  componentDidMount = () => {};

  logOut = () => {
    localStorage.removeItem(Constants.loggedInUser);
    this.props.history.push("/");
  };

  render = () => {
    const { firstName } = this.state.user;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="header ">
              <Link to="/dashboard">
                <span className="">
                  {" "}
                  <img src={logo} alt="" height={25} />
                </span>
              </Link>
              <span className="pull-right">
                Welcome, <span className="user-name"> {`${firstName}`} &nbsp;</span>
                <span className="logout-cta" onClick={this.logOut} className="pointer">
                  Log Out
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default AppHeader;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/imgs/bizzdeskgroup-tight-white.png";
import axios from "axios";
import { Constants } from "../../App";

// import { ParentVar } from "../../index";

// const LoginBox2 = () => {
//   const [sample, setSample] = useContext(ParentVar);
//   console.log(sample);

//   const clicker = () => {
//     setSample({ name: "Muyiwa", age: 467 });
//   };

//   return (
//     <span className="login-notice text-whoite" onClick={clicker}>
//       Please enter your login {sample.name} credentials
//     </span>
//   );
// };

class LoginBox extends Component {
  state = {
    emailAddress: "",
    password: ""
  };
  errors = {};
  constructor(props) {
    super(props);
    this.state = { emailAddress: "", password: "" };
  }
  componentDidMount = prevProps => {
    this.setState({
      errors: this.errors,
      emailAddress: "",
      password: "",
      loading: false
    });

    this.submitHandler = this.submitHandler.bind(this);
    this.validateForm = this.validateForm.bind(this);
  };

  componentWillUnmount = () => {};

  submitHandler = event => {
    event.preventDefault();
    // this.props.history.push("/dashboard");
    this.makeLoginRequest();
  };

  makeLoginRequest = () => {
    this.setState({ loading: true });
    const { emailAddress, password } = this.state;
    let user = {
      emailAddress: emailAddress,
      password: password
    };

    axios
      .post(`${Constants.baseUrl}/auth/login`, user)
      .then(dataObject => {
        this.setState({ loading: false });
        const { data: userData, status } = dataObject;
        if (status === 200) {
          localStorage.setItem(Constants.loggedInUser, JSON.stringify(userData));
          this.props.history.push("/dashboard");
        }
      })
      .catch(errorObject => {
        this.setState({ loading: false });
        console.log(errorObject);
      });
  };

  validateForm = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render = () => {
    const { loading, emailAddress, password } = this.state;
    return (
      <div className="col-lg-12">
        <form onSubmit={this.submitHandler}>
          <div className="form-row center-text centered-flex">
            <img src={logo} alt="" height={25} />
          </div>
          <div className="form-row center-text centered-flex">
            <span className="login-notice text-whoite">Please enter your login credentials</span>
            <span />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Email address" name="emailAddress" className="app-text-box" value={emailAddress} onChange={this.validateForm} />
            <span />
          </div>
          <div className="form-row">
            <input type="password" placeholder="Password" className="app-text-box" name="password" value={password} onChange={this.validateForm} />
            <span />
          </div>
          <div className="form-row center-text centered-flex">
            <span className="text-whoite">
              Forgot your password? &nbsp;
              <Link to={`/forgot-password`}>
                {" "}
                <span className="link-up">Click here</span>
              </Link>
            </span>
            <span />
          </div>
          <div className="form-row centered-flex">
            <button type="submit" className="login-button uppercase">
              {loading ? (
                <span>
                  <i className="fa fa-spin fa-spinner"></i>
                </span>
              ) : (
                <span>Login</span>
              )}
            </button>

            <span />
          </div>
        </form>
      </div>
    );
  };
}

export default LoginBox;

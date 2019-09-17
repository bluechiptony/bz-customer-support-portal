import React from "react";
import LoginBox from "../../components/login-box/login-box";
// import { ParentVar } from "../../index";

const Login = props => {
  // const [sample, setSample] = useContext(ParentVar);
  return (
    <div className="container-fluid login-bg">
      <div className="row text-whoite">
        <div className="col-lg-7" />

        <div className="col-lg-5 centered-flex page-height background-main">
          <div className="col-lg-8">
            <LoginBox {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

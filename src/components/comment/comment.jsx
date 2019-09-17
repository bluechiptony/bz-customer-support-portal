import React from "react";
import { Constants } from "../../App";
import renderHTML from "react-render-html";

const Comment = props => {
  // console.log(this.props);

  return (
    <div className="container-fluid">
      <div className="col-lg-12">
        <div className="comment-box">
          <div className="comment-owner">
            {props.response.isCustomer ? <span className="owner-text">You </span> : <span className="owner-text">We </span>}
            <span>said:</span>
          </div>
          <div className="comment">
            <span>{renderHTML(`${props.response.response}`)}</span>
          </div>

          <div className="comment-footer">
            <span className="comment-footer-text">{Constants.formatDate(props.response.createdDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;

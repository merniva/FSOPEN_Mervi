import React from "react";

const Error = ({ msg }) => {
    if (msg === null) {
      return null;
    }
    return <div className="errorMsg">{msg}</div>;
  };

export default Error;
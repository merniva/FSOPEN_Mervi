import React from "react";
import { connect } from "react-redux";

const Notification = (props) => {

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  }
  if (!props.notifications) {
    return null;
  }
  return (
    <div style={style}>
      {props.notifications}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
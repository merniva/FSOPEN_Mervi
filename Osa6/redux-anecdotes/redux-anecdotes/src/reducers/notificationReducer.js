const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return action.msg;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export const clearNotification = (notification) => {
  return async (dispatch) => {
    dispatch({
      type: "CLEAR_NOTIFICATION",
      msg: notification,
    });
  };
};

let timer = null;

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_NOTIFICATION",
      msg: notification,
    });
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      dispatch(clearNotification());
    }, time * 100);
  };
};

export default notificationReducer;

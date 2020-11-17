const filterReducer = (state = "", action) => {
    switch (action.type) {
      case "FILTER_ANECDOTE":
        return action.value;
      default:
        return state;
    }
  };
  
  export const filterBy = (value) => {
    return {
      type: "FILTER_ANECDOTE",
      value: value
    };
  };
  
  export default filterReducer;
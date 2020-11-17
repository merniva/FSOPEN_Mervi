import React from "react";
import { connect } from "react-redux";
import { filterBy } from "../reducers/filterReducer";

const Filter = (props) => {
  const filterResults = (event) => {
    event.preventDefault();
    const content = event.target.value;
    props.filterBy(content);
  };
  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      <span>Rajaa hakusanalla: </span>
      <input name="filter" onChange={filterResults} />
    </div>
  );
};


const ConnectedFilter = connect(null, { filterBy })(Filter);
export default ConnectedFilter;

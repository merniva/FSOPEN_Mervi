import React from "react";
import { useDispatch } from "react-redux";
import { filterBy } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const filterResults = (event) => {
    event.preventDefault();
    const content = event.target.value;
    dispatch(filterBy(content));
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

export default Filter;

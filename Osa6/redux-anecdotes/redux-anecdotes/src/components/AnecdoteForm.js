import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.createAnecdote(content);
    props.setNotification(`Lisäsit anekdootin "${content}"`, 30);
  };

  return (
    <form onSubmit={addAnecdote}>
      <h2>Uusi anekdootti</h2>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">Luo</button>
    </form>
  );
};


const ConnectedAnecdoteForm = connect(null, { createAnecdote, setNotification })(AnecdoteForm);
export default ConnectedAnecdoteForm;

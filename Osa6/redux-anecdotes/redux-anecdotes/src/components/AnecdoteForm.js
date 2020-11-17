import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(setNotification(`Lisäsit anekdootin "${content}"`, 30));
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

export default AnecdoteForm;

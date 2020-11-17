import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const voteFor = (anecdote) => {
    dispatch(addVote(anecdote.id));
    dispatch(setNotification(`Äänestit kohdetta "${anecdote.content}"`, 30));
  };

  return (
    <div>
      <h3>Tulokset:</h3>
      {anecdotes
        .sort((a, b) => a.votes - b.votes)
        .filter(
          ({ content }) =>
            content && content.toLowerCase().includes(filter.toLowerCase())
        )
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              Äänimäärä {anecdote.votes}
              <button onClick={() => voteFor(anecdote)}>Äänestä</button>
            </div>
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default AnecdoteList;

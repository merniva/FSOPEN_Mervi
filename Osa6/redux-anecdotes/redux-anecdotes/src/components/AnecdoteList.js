import React from "react";
import { connect } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {

  const voteFor = (anecdote) => {
    props.addVote(anecdote.id);
    props.setNotification(`Äänestit kohdetta "${anecdote.content}"`, 30);
  };

  return (
    <div>
      <h3>Tulokset:</h3>
      {props.anecdotes
        .sort((a, b) => a.votes - b.votes)
        .filter(
          ({ content }) =>
            content && content.toLowerCase().includes(props.filter.toLowerCase())
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, { addVote, setNotification })(AnecdoteList);
export default ConnectedAnecdoteList;

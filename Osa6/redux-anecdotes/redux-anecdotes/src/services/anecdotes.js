import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createAnecdote = async (content) => {
  const anecdoteObject = { content, votes: 0 };
  const res = await axios.post(baseUrl, anecdoteObject);
  return res.data;
};

const addNewVote = async (anecdote) => {
  const newVotes = anecdote.votes + 1;
  const newAnecdoteObject = { ...anecdote, votes: newVotes };
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdoteObject);
  return res.data;
};

export default { getAll, createAnecdote, addNewVote };

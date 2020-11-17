import anecdoteService from "../services/anecdotes";


const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ANECDOTE":
      return [...state, action.data];
    case "ADD_VOTE":
      const newState = state.filter((anecdote) => anecdote.id !== action.data.id)
      return [...newState, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

/******** Actions *********/ 

export const addVote = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    const index = anecdotes.findIndex((anecdote) => anecdote.id === id);
    const votedAnecdote = await anecdoteService.addNewVote(anecdotes[index]);
    dispatch({
      type: "ADD_VOTE",
      data: votedAnecdote,
    })
  }
  
};

export const createAnecdote = content => {
  return async (dispatch) => {
    const newNote = await anecdoteService.createAnecdote(content);
    dispatch({
      type: "ADD_ANECDOTE",
      data: newNote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default anecdoteReducer;

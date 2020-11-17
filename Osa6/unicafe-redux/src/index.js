import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };

  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };

  const ok = () => {
    store.dispatch({
      type: "OK",
    });
  };

  const zero = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div>
      <button onClick={good}>Hyvä</button>
      <button onClick={ok}>Neutraali</button>
      <button onClick={bad}>Huono</button>
      <button onClick={zero}>Tyhjennä</button>
      <div>Hyvä: {store.getState().good}</div>
      <div>Neutraali: {store.getState().ok}</div>
      <div>Huono: {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);

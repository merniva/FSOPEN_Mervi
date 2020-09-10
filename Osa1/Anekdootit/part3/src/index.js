import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  console.log('pistemäärät', points);

  const addPoints = (selected) => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  const topPoints = Math.max(...points);
  console.log('top pisteet',topPoints)

  const index = points.findIndex((point) => point === topPoints);
  console.log('sijainti',index)

  return (
    <div>
      <h2>Päivän anekdootti:</h2>
      <p>{props.anecdotes[selected]}</p>
      <h4>Ääniä tällä hetkellä: {points[selected]}</h4>
      <Button handleClick={() => addPoints(selected)} text="Äänestä" />
      <Button
        handleClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
        text="Näytä uusi anekdootti"
      />
      <h2>Eniten ääniä saanut anekdootti:</h2>
      <p>{anecdotes[index]}</p>
      <h4>Ääniä yhteensä: {topPoints} </h4>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));

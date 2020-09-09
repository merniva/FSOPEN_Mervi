import React, { useState } from "react";
import ReactDOM from "react-dom";

const StatisticLine = ({ text, value }) => (
  <tr>
    <td> {text} </td>
    <td>{value}</td>
  </tr>
);

const Statistics = (props) => {
  const { good, neutral, bad, all, avg, positive } = props;
  if (props.all === 0) {
    return (
      <tbody>
        <tr>
          <td>Ei annettuja palautteita</td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      <StatisticLine text="Hyvä" value={good} />
      <StatisticLine text="Neutraali" value={neutral} />
      <StatisticLine text="Huono" value={bad} />
      <StatisticLine text="Yhteensä" value={all} />
      <StatisticLine text="Keskiarvo" value={avg} />
      <StatisticLine text="Positiivisia" value={positive} />
    </tbody>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const avg = (good - bad) / all;
  const positive = (good * 100) / all + " %";

  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button handleClick={() => setGood(good + 1)} text="Hyvä" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutraali" />
      <Button handleClick={() => setBad(bad + 1)} text="Huono" />
      <h2>Saadut palautteet</h2>
      <table>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          avg={avg}
          positive={positive}
        />
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

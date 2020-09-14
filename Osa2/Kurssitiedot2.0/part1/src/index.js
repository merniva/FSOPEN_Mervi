import React from "react";
import ReactDOM from "react-dom";

const Part = (props) => (
  <>
    {props.course.map((c) => (
      <p key={c.id}>
        {" "}
        {c.name} {c.exercises}{" "}
      </p>
    ))}
  </>
);

// renderöidään kurssin nimi
const Header = ({ course }) => <h1>{course.name}</h1>;

// renderöidään kurssin osat ja tehtävämäärät
const Content = ({ course }) => {
  return (
    <div>
      <Part course={course.parts} />
    </div>
  );
};

// renderöidään tehtävien yhteismäärä
const Total = ({course}) => {
  let initialValue = 0
  return (
  <h4>
    Number of exercises: {course.parts.reduce(
  (acc, value) => acc + value.exercises
  , initialValue
)}
  </h4>
);
  }

const Course = ({ course }) => (
  <>
    <Header course={course} /> <Content course={course} /> <Total course={course} />
  </>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};
ReactDOM.render(<App />, document.getElementById("root"));

import React from 'react'

const Part = ({course}) => (
    <>
      {course.map((c) => (
        <p key={c.id}>
          {" "}
          {c.name} {c.exercises}{" "}
        </p>
      ))}
    </>
  );
  
  const Header = ({ course }) => <h2>{course.name}</h2>;
  
  const Content = ({ course }) => {
    return (
      <div>
        <Part course={course.parts} />
      </div>
    );
  };
  
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

export default Course
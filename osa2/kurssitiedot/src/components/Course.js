import React from 'react'

const Header = ({ text }) => (
  <h2>{text}</h2>
)

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) =>
    sum + part.exercises, 0)

  return (
    <p><b>Total of {total} exercises</b></p>
  )
}

const Course = ({ courses }) => (
  courses.map(course => {
    return (
      <div key={course.name}>
        <Header text={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  })
)

export default Course
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const Anecdote = ({ anecdote }) => {
  return <div>{anecdote}</div>
}

const Votes = ({ votes }) => {
  return <div>has {votes} votes</div>
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const handleClickNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleClickVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)

    if (newVotes[selected] > votes[mostVotes]) {
      setMostVotes(selected)
    }
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Anecdote anecdote={anecdotes[selected]} />
      <Votes votes={votes[selected]} />
      <Button onClick={() => handleClickVote()} text='vote' />
      <Button onClick={() => handleClickNext()} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <Anecdote anecdote={anecdotes[mostVotes]} />
      <Votes votes={votes[mostVotes]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
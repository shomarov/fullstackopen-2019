import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => {
    return <h1>{text}</h1>
}

const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>
}

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return <p>No feedback given</p>
    }

    const sum = good + neutral + bad
    const average = (good + neutral * 0 + bad * -1) / sum
    const positivePercent = good / sum * 100 + ' %'

    return (
        <table>
            <tbody>
                <Statistic text='good' value={good} />
                <Statistic text='neutral' value={neutral} />
                <Statistic text='bad' value={bad} />
                <Statistic text='all' value={sum} />
                <Statistic text='average' value={average} />
                <Statistic text='positive' value={positivePercent} />
            </tbody>
        </table>
    )
}



const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleClickGood = () => setGood(good + 1)

    const handleClickNeutral = () => setNeutral(neutral + 1)

    const handleClickBad = () => setBad(bad + 1)

    return (
        <div>
            <Header text='give feedback' />
            <Button onClick={() => handleClickGood()} text='good' />
            <Button onClick={() => handleClickNeutral()} text='neutral' />
            <Button onClick={() => handleClickBad()} text='bad' />
            <Header text='statistics' />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
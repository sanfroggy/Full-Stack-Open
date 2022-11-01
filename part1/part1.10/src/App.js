import { useState } from 'react'

//Check if feedback has been given using conditional rendering and if so, show the calculated statistics
const Statistics = (props) => {

    if (props.all === 0) {
        return (
            <>
                <h1>Statistics</h1>
                <p>No feedback given.</p>
            </>
        )
    }

    return (
        <>
            <h1>Statistics</h1>
            <StatisticsLine text="Good: " value={props.good} />
            <StatisticsLine text="Neutral: " value={props.neutral} />
            <StatisticsLine text="Bad: " value={props.bad} />
            <StatisticsLine text="All: " value={props.all} />
            <StatisticsLine text="Average: " value={props.average} />
            <StatisticsLine text="Positive: " value={props.percentage}/>
        </>
    )
}

//Define the StatisticsLine component to be used in displaying statistics
const StatisticsLine = (props) => {
    if (props.text === "Positive: ") {
        return (
            <p>{props.text} {props.value}%</p>
        )
    }
    return (
        <p>{props.text} {props.value}</p>
    )
}

//Define the button component to be used for displaying the buttons
const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

const App = () => {
    //Save the states of each button
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [average, setAverage] = useState(0)
    const [percentage, setPercentage] = useState(0)

    //Add a good feedback and calculate the average value and the percentage of positive feedback
    const handleGood = () => {
        setGood(good + 1)
        setAll(all + 1)
        setAverage(((good + 1) - bad) / (all + 1))
        setPercentage(((good + 1) / (all + 1)) * 100)
    }

    //Add a neutral feedback and calculate the average value and the percentage of positive feedback
    const handleNeutral = () => {
        setNeutral(neutral + 1)
        setAll(all + 1)
        setAverage((good - bad) / (all + 1))
        setPercentage((good / (all + 1)) * 100)
    }

    //Add a bad feedback and calculate the average value and the percentage of positive feedback
    const handleBad = () => {
        setBad(bad + 1)
        setAll(all + 1)
        setAverage(((good) - (bad + 1)) / (all + 1))
        setPercentage((good / (all + 1)) * 100)
    }

    //Handle the click events for each button and show the component that holds the Statistics
    return (
        <>
            <h1>Give feedback</h1>
            <Button handleClick={handleGood} text="Good" />
            <Button handleClick={handleNeutral} text="Neutral" />
            <Button handleClick={handleBad} text="Bad" />
            <Statistics good={good} neutral={neutral} bad={bad} 
            all={all} average={average} percentage={percentage} />
        </>
    )
}

export default App

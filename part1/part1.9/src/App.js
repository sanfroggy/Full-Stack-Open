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
            <p>Good: {props.good}</p>
            <p>Neutral: {props.neutral}</p>
            <p>Bad: {props.bad}</p>
            <p>All: {props.all}</p>
            <p>Average: {props.average}</p>
            <p>Positive: {props.percentage} %</p>
        </>
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

    return (
        //Handle the click events for each button and show the component that holds the Statistics
        <>
            <h1>Give feedback</h1>
            <button onClick={handleGood} > Good</button>
            <button onClick={handleNeutral}> Neutral</button>
            <button onClick={handleBad}>Bad</button>
            <Statistics good={good} neutral={neutral} bad={bad} 
            all={all} average={average} percentage={percentage} />
        </>
    )
}

export default App

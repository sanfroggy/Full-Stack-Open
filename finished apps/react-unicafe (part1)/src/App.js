import { useState } from 'react'


/*Check if feedback has been given using conditional rendering and if so, 
show the calculated statistics in a HTML table*/
const Statistics = (props) => {

    if (props.all === 0) {
        return (
            <>
                <table>
                    <thead><tr><th><h1>Statistics</h1></th></tr></thead>
                    <tbody><tr><td><p>No feedback given.</p></td></tr></tbody>
                </table>
            </>
        )
    }

    return (
        <>
            <table>
            <thead><tr><th><h1>Statistics</h1></th></tr></thead>
            <tbody>
            <StatisticsLine text="Good:" value={props.good} />
            <StatisticsLine text="Neutral:" value={props.neutral} />
            <StatisticsLine text="Bad:" value={props.bad} />
            <StatisticsLine text="All:" value={props.all} />
            <StatisticsLine text="Average:" value={props.average} />
            <StatisticsLine text="Positive:" value={props.percentage} />
            </tbody>
            </table>
        </>
    )
}

//Define the StatisticsLine component to be used in displaying statistics
const StatisticsLine = (props) => {
    if (props.text === "Positive:") {
        return (
            //Create a row in the table defined in the Statistics component
            <tr><td>{props.text}</td><td>{props.value}%</td></tr>
        )
    }
    return (
        //Create a row in the table defined in the Statistics component
        <tr><td>{props.text}</td><td>{props.value}</td></tr>
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

    return (
        //Handle the click events for each button and show the component that holds the Statistics
        <>
            <h1>Give feedback</h1>
            <Button handleClick={handleGood} text="Good" />
            <Button handleClick={handleNeutral} text="Neutral" />
            <Button handleClick={handleBad} text="Bad" />
            <Statistics good={good} neutral={neutral} bad={bad}
                all={all} average={average.toFixed(2)} percentage={percentage.toFixed(2)} />
        </>
    )
}

export default App

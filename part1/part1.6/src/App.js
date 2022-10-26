import { useState } from 'react'

const App = () => {
    //Save the states of each button
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    
    //Handle the click events for eacg button and show feedback statistics
    return (
        <div>
            <h1>Give feedback</h1>
            <button onClick={() => setGood(good + 1)}> Good</button>
            <button onClick={() => setNeutral(neutral + 1)}> Neutral</button>
            <button onClick={() => setBad(bad + 1)}>Bad</button>
            <h1>Staticstics</h1>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
        </div>
    )
}

export default App

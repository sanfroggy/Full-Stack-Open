import { useState } from 'react'

const App = () => {
    
    //Define an array of anecdotes
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
    ]

    //Define a variable to randomize also the initial anecdote
    let random = Math.floor(Math.random() * anecdotes.length)

    //Save the state of the index of the selected anecdote and the given votes
    const [selected, setSelected] = useState(random)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    /*Set the index of the selected state to the redefined random variable, 
    when the button is pressed*/
    const displayRandom = () => {
        random = Math.floor(Math.random() * anecdotes.length)
        setSelected(random)
    }

    //Create a copy of the array of votes and add 1 vote for the selected anecdote
    const addVote = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
    }

    return (
        /*Handle button click events and display the random anecdote,
        as well as votes for the current anecdote*/
        <>
            <p>{anecdotes[selected]}</p>
            <p>(Votes: {votes[selected]})</p>
            <button onClick={addVote}>Vote</button>
            <button onClick={displayRandom}>Next anecdote</button>
        </>
    )
}

export default App

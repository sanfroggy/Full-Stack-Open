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

    /*Save the state of the index of the selected anecdote, given votes 
    and the index of the most voted anecdote*/
    const [selected, setSelected] = useState(random)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
    const [mostvoted, setMostVoted] = useState(0)

    /*Set the index of the selected state to the redefined random variable, 
    when the button is pressed*/
    const displayRandom = () => {
        random = Math.floor(Math.random() * anecdotes.length)
        setSelected(random)
    }

    /*Create a copy of the array of votes, add 1 vote for the selected anecdote
    and set the most voted anecdote.(If two or more are equally voted, then
    which ever index is first in the array is displayed.)*/
    const addVote = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
        setMostVoted(copy.indexOf(copy.reduce((a, b) => Math.max(a, b), -Infinity)))
    }

    return (
        /*Handle button click events and display the random anecdote,
        as well as votes for the current anecdote and 
        the most voted anecdote inside it's own component*/
        <>
            <h1>Anecdote of the day:</h1>
            <p>{anecdotes[selected]}</p>
            <p>(Votes: {votes[selected]})</p>
            <MostVotedAnecdote mostvotedstring={anecdotes[mostvoted]} />
            <button onClick={addVote}>Vote</button>
            <button onClick={displayRandom}>Next anecdote</button>
        </>
    )
}

//Define the MostVotedAnecdote component
const MostVotedAnecdote = (props) => {
    return (
        <>
            <h1>Most voted anecdote:</h1>
            <p>{props.mostvotedstring}</p>
       </>
    )
}

export default App

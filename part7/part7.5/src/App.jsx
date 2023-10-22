/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

/*Importing useState hook, custom useField hook and routing components 
from React Router library. */
import { useState } from 'react'
import {BrowserRouter as Router, Routes,
    Route, Link, useParams, useNavigate
} from 'react-router-dom'
import { useField } from './hooks'

/*Defining a Menu component containing Links, Route, Routes and Router components
used to navigate between different elements on the page. */
const Menu = ({ anecdotes, addNew, notification }) => {
    const padding = {
        paddingRight: 5
    }
    return (
        <Router>
            <div>
                <Link style={padding} to='/anecdotes'>Anecdotes</Link>
                <Link style={padding} to='/create'>Create new</Link>
                <Link style={padding} to='/about'>About</Link>
            </div>

            <Routes>
                <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} notification={notification} />} />
                <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
                <Route path="/create" element={<CreateNew addNew={addNew} />} />
                <Route path="/about" element={<About />} />
                <Route path="/" element={<AnecdoteList anecdotes={anecdotes} notification={notification} />} />
            </Routes>
        </Router>

    )
}

/*Defining an AnecdoteList component displaying a list of existing anecdotes.
Each anecdote content is a link to more specific information about that anecdote. 
The component also contains the Notification component, that displays a message when
necessary. */
const AnecdoteList = ({ anecdotes, notification }) => (
    <div>
        <br/>
        <div>
            <Notification message={notification} />
        </div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map(anecdote => <li key={anecdote.id} >
                <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </li>)}
        </ul>
    </div>
)

/*Defining an Anecdote component containing more specific information about
one anecdote. Id is received from the url with useParams, the specific anecdote
is searched for with find and content, author, votes and info fields are returned. */
const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(anecdote =>
        anecdote.id === Number(id))

    return (
        <div>
            <h2>{`${anecdote.content} by ${anecdote.author}`}</h2>
            has {anecdote.votes} votes.
            <br />
            <br />
            More info available at: {anecdote.info}
            <br />
            <br />
        </div>
    )

}

//Defining an About component to display the definition of an anecdote.
const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
)

/*Displaying a footer that is always visible containing links to course page 
and a repository. */
const Footer = () => (
    <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
)

//Defining a component to create a newAnecdote.
const CreateNew = (props) => {
    const navigate = useNavigate()

    /*Defining variables for the values of the new anecdote using
    a custom hook called useField. */
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    /*Defining a function to create a new anecdote with the values
    of the defined state variables, when the form is submitted. */
    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate('/')
    }

    const handleReset = (e) => {
        e.preventDefault()
        content.reset()
        author.reset()
        info.reset()
    }

    //Returning a form with input fields and a button to submit the form.
    return (
        <div>
            <h2>Create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Content: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input name='contentInput' {...content} />
                </div>
                <br />
                <div>
          Author: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input name='authorInput' { ...author } />
                </div>
                <br />
                <div>
           Url for more info: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input name='infoInput' {...info} />
                </div>
                <br />
                <button>Create</button>&nbsp;&nbsp;<button onClick={handleReset}>Reset</button>
                <br />
                <br />
            </form>
        </div>
    )

}

/*Defining a component thart contains a div to display the string received 
as a message to the user. */
const Notification = ({ message }) => {

    /*Defining an inline-style for the message
    to be displayed. */
    const style = {
        border: 'solid',
        borderColor: 'darkgreen',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    }

    /*If message has a value returns a div that has the message received as child.
    If not returns null. */
    if (message) {
        return (
            <div style={style}>
                {message}
            </div>
        )
    } else {
        return null
    }
}

const App = () => {

    //Defining a "state variable" to store the array of anecdotes.
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2
        }
    ])

    //Defining a "state variable" for displaying notifications, when necessary.
    const [notification, setNotification] = useState('')

    /*Defining a method to add a new anecdote. The new anecdote is added to
    the end of the anecdote array using setAnecdotes and concat. An id is
    also generated randomly. A notification is also set, displayed for 5 seconds 
    and hidden again with setTimeout. */
    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))
        setNotification(`"${anecdote.content}" successfully added.`)
        setTimeout(() => {
            setNotification('')
        }, 5000)
    }

    //Defining a function to get anecdote by id.
    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    /*Defining a function to handle voting for an anecdote.
    The voted anecdote is copied and a vote is added. The new 
    object is then added to the anecdote array with map. */
    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    //Returning a div containing a header the Menu component and the Footer component.
    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu anecdotes={anecdotes} addNew={addNew} notification={notification} />
            <Footer />
        </div>
    )
}

export default App

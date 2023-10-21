/*Importing components, the axios.get method from requests.js and
the useQuery function. */
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './requests'
import { useQuery } from '@tanstack/react-query'

const App = () => {

      //Defining a function to handle adding a vote. 
    const handleVote = (anecdote) => {
        console.log('vote')
    }
      /*Using useQuery function to get anecdote data from db.json
      though JSONServer. In case of error forming a connection is retried
      twice. */
      const result = useQuery({
          queryKey: ['anecdotes'],
          queryFn: getAnecdotes,
          retry: 2
      })

      //If the query returns isLoading an appropriate message is rendered.
      if (result.isLoading) {
          return <div>Fetching data from server... please wait</div>
      }

      //If the query returns isError an appropriate message is rendered.
      if (result.isError) {
          return <div>Anecdote service is currently not available.
              Unable to connect to server. </div>
      }

      /*If the query returns isSuccess the Notification and AnecdoteForm
      components as well as the array of anecdotes received from JSON server
      are rendered. */
      if (result.isSuccess) {
          const anecdotes = result.data

          return (
              <div>
                  <h3>Anecdote app</h3>

                  <Notification />
                  <AnecdoteForm />

                  {anecdotes.map(anecdote =>
                      <div key={anecdote.id}>
                          <div>
                              {anecdote.content}
                          </div>
                          <div>
                              has {anecdote.votes}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <button onClick={() => handleVote(anecdote)}>
                                  Vote</button>
                          </div>
                      </div>
                  )}
              </div>
          )
      }

}

export default App

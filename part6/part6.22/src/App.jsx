/*Importing components, the axios.get and axios.post method from requests.js 
and the useQuery, useMutation and useQueryClient functions. */
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {

    /*Defining variables for useQueryClient and useMutation, that are used to
    update the votes of an anecdote with the updateAnecdote function and 
    to have the list update immediately after a successful operation with 
    invalidateQueries. */
    const queryClient = useQueryClient()
    const updateMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (anecdote) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })

    
    const handleVotes = (anecdote) => {
        updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1})
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
                         <button onClick={() => handleVotes(anecdote)}>
                                 Vote</button>
                         </div>
                     </div>
                 )}
             </div>
         )
    }
}

export default App

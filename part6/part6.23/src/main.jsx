import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MessageContextProvider } from './components/MessageContext'
import App from './App'

const queryClient = new QueryClient()

/*Defining a QueryClientProvider and MessageContextProvider as 
parents of App so that the whole app can use the query functions
and the reducer and it's value controlling the value of the Notification
component. */
ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <MessageContextProvider>
            <App />
        </MessageContextProvider>
    </QueryClientProvider>
)
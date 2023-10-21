/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'

const MessageContext = createContext()

//Creating a reducer for the useReducer to use.
const messageReducer = (state, action) => {
    switch (action.type) {
        case "SHOW":
            return action.payload
        case "HIDE":
            return ''           
        default:
            return state
    }
}

/*Exporting a MessageCentextProvider to make the reducer
and the value of the message accessible to it's children. */
export const MessageContextProvider = (props) => {
    const [message, messageDispatch] = useReducer(messageReducer, '')
    return (
        <MessageContext.Provider value={[message, messageDispatch]}>
            {props.children}
        </MessageContext.Provider>
    )
}

//Exporting the variable containing the value of the message.
export const useMessageValue = () => {
    const counterAndDispatch = useContext(MessageContext)
    return counterAndDispatch[0]
}

/*Exporting the variable containing the dispatcher used to change
the message value. */
export const useMessageDispatch = () => {
    const counterAndDispatch = useContext(MessageContext)
    return counterAndDispatch[1]
}


export default MessageContext



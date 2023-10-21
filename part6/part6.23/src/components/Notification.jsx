import { useMessageValue } from './MessageContext'

const Notification = () => {

    /*Defining an inline-style for the message
    to be displayed. */
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    }

    /*Creating a variable for the value of the message
    to be displayed. */
    const message = useMessageValue()
   
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

export default Notification

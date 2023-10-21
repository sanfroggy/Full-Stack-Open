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

    /*Returning a div with the defined inline-style and
    the value of message, if message has a value. If not
    null is returned. */
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

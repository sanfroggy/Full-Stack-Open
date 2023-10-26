//Importing the useSelector hook.
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

/*Defining the Notification component containing a message to be displayed,
when an operation is completed and setting a css-style to the div element
according to the type of message to be displayed. The 2 usable styles are
defined as inline styles successStyle and errorStyle */
const Notification = () => {

    //Getting the notification object state from the store.
    const notification = useSelector((state) => state.notification)

    /*If no message is defined, nothing is returned. If a message
    is defined the display style is defined according to the
    type of message displayed. */
    if (notification.message === null || notification.message === undefined) {
        return null
    } else {
        if (notification.error === false) {
            return (
                <div className="successMsg">
                    <Alert variant="success">
                        {notification.message}
                    </Alert>
                </div>
            )
        }
        if (notification.error === true) {
            return (
                <div className="errorMsg">
                    <Alert variant="danger">
                        {notification.message}
                    </Alert>
                </div>
            )
        }
    }
}

export default Notification

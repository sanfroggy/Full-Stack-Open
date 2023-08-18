/*Defining the Notification component containing a message to be displayed,
when an operation is completed and adding a css-style to the div element. */
import '../index.css'

const Notification = ({ message, isError }) => {

    if (message === null) {
        return null
    } else {
        if (isError === false) {
            return (
                <div className="success">
                    {message}
                </div>
            )
        } else {
            return (
                <div className="error">
                    {message}
                </div>
            )
        }
    }

}

export default Notification

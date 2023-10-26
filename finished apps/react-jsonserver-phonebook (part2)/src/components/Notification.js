import '../index.css'

/*Defining the Notification component containing a message to be displayed,
when an operation is completed and setting a css-style to the div element
according to the value of received isError. The 2 usable styles are
defined in the imported index.css file */
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

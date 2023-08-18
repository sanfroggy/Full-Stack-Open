import '../index.css'

/*Defining the Notification component containing a message to be displayed,
when an operation is completed and adding a css-style to the div element. */
const Notification = ({ message }) => {

    if (message === null) {
        return null
    } else {
        return (
            <div className="success">
                {message}
            </div>
        )
    }

}

export default Notification

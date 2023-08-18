import '../index.css'

/*Defining the Notification component containing a message to be displayed,
when an operation is completed and setting a css-style to the div element. 
The 2 usable styles are defined in the imported index.css file*/
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

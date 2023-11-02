const Notification = ({ message }) => {

    //Defining an appropriate inline style for error messages.
    const errorStyle = {
        color: 'darkred',
        background: 'lightgrey',
        fontSize: '18px,',
        borderStyle: 'solid',
        borderRadius: '4px',
        padding: '8px',
        marginBottom: '25px'
    }

    /*If no message is defined, nothing is returned. If a message
    is defined it is displayed with the defined inline style. */
    if (!message) {
        return null
    } else {
        return (
            <div style={errorStyle}>
                {message}
            </div>
        )
    }
}

export default Notification

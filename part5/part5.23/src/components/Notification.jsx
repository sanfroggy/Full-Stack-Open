/*Defining the Notification component containing a message to be displayed,
when an operation is completed and setting a css-style to the div element
according to the type of message to be displayed. The 2 usable styles are
defined as inline styles successStyle and errorStyle */
const Notification = (props) => {

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '18px,',
        borderStyle: 'solid',
        borderRadius: '4px',
        padding: '8px',
        marginBottom: '25px'
    }
    const errorStyle = {
        color: 'darkred',
        background: 'lightgrey',
        fontSize: '18px,',
        borderStyle: 'solid',
        borderRadius: '4px',
        padding: '8px',
        marginBottom: '25px'
    }

    if (props.msg === null && props.errorMsg === null) {
        return null
    } else {
        if (props.errorMsg === null && props.msg !== null) {
            return (
                <div className='successMsg' style={successStyle}>
                    {props.msg}
                </div>
            )
        }
        if (props.msg === null && props.errorMsg !== null) {
            return (
                <div className='errorMsg' style={errorStyle}>
                    {props.errorMsg}
                </div>
            )
        }
    }

}

export default Notification

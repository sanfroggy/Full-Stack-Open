//Importing the useSelector function from react-redux.
import { useSelector } from 'react-redux'

//Defining a Notification component with an inline style.
const Notification = () => {

    //Defining a variable used to display the message in the store.
    const notification = useSelector(state => state.message)

    //Defining a style for the message to be displayed.
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }

    //Returning the defined message.    
    if (notification !== '') {
        return (
            <div style={style}>
                {notification}
            </div>
        )
    } else {
        return null
    }
}

export default Notification

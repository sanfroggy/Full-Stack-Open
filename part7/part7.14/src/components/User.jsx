//Importing prop-types
import PropTypes from 'prop-types'

//Defining a User component.
const User = (props) => {

    //Defining different styles for the 2 divs.
    const indentedRelativeStyle = {
        position: 'relative',
        left: '100px',
        top: '16px',
        margin: '0px'
    }

    const NotIndentedStyle = {
        position: 'absolute',
        left: '5px'
    }

    //Retuning the name of the user and the number of blogs created by that user.
    return (
        <div>
            <p style={NotIndentedStyle}>{props.name}</p> <p style={indentedRelativeStyle}>{props.blogs}</p>
        </div>
    )
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    blogs: PropTypes.number.isRequired,
}

export default User

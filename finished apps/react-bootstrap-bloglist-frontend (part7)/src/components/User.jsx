//Importing prop-types
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

//Defining a User component.
const User = ({ user }) => {

    //Defining different styles for the 2 divs.
    const indentedRelativeStyle = {
        position: 'relative',
        left: '100px',
        top: '16px',
        margin: '0px'
    }

    const NotIndentedStyle = {
        position: 'relative',
        left: '5px',
        top: '38px'
    }

    //Retuning the name of the user and the number of blogs created by that user.
    return (
        <div>
            <Link to={`/users/${user.id}`} style={NotIndentedStyle}>{user.name}</Link>
            <p style={indentedRelativeStyle}>{user.blogs.length}</p>
        </div>
    )
}

User.propTypes = {
    user: PropTypes.object.isRequired,
}

export default User

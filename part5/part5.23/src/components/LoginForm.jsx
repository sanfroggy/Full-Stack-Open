//Importing prop-types
import PropTypes from 'prop-types'

/*Defining a LoginForm component with text and password type input
fields and a submit button. The required methods and data are received
from props. */
const LoginForm = ({
    loginMethod,
    handleUsrInputChangeMethod,
    handlePwdInputChangeMethod,
    usr,
    pwd
}) => {
    return (
        <form onSubmit={loginMethod}>
            <h2>Log in to application: </h2>
            <div>
                Username: <input id='usrInput' type="text" value={usr} onChange={handleUsrInputChangeMethod} />
            </div>
            <br></br>
            <div>
                Password: <input id='pwdInput' type="password" value={pwd} onChange={handlePwdInputChangeMethod} />
            </div>
            <br></br>
            <div>
                <button id='loginBtn' type="submit">Login</button>
            </div>
        </form>
    )
}

//Using prop-types to give a warning if necessary values are not received correctly.
LoginForm.propTypes = {
    loginMethod: PropTypes.func.isRequired,
    handleUsrInputChangeMethod: PropTypes.func.isRequired,
    handlePwdInputChangeMethod: PropTypes.func.isRequired,
    usr: PropTypes.string.isRequired,
    pwd: PropTypes.string.isRequired
}

export default LoginForm

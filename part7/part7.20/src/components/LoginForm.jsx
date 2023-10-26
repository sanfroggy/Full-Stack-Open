/*Importing prop-types, as well as From and Button components
from react-bootstrap. */
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

/*Defining a LoginForm component with text and password type input
fields and a submit button. The required methods and data are received
from props. */
const LoginForm = ({ loginMethod, handleUsrInputChangeMethod, handlePwdInputChangeMethod, usr, pwd }) => {
    return (
        <Form onSubmit={loginMethod}>
            <Form.Group>
                <h4>Log in to application: </h4>
                <br />
                <div>
                    <Form.Label>Username:</Form.Label> &nbsp;&nbsp;&nbsp;&nbsp;
                    <Form.Control size="sm" id="usrInput" type="text" value={usr}
                        style={{ width: '180px' }} onChange={handleUsrInputChangeMethod} />
                </div>
                <br></br>
                <div>
                    <Form.Label>Password:</Form.Label> &nbsp;&nbsp;&nbsp;&nbsp;
                    <Form.Control size="sm" id="pwdInput" type="password" value={pwd}
                        style={{ width: '180px' }} onChange={handlePwdInputChangeMethod} />
                </div>
                <br></br>
                <div>
                    <Button variant="primary" id="loginBtn" type="submit">
                        Login
                    </Button>
                </div>
            </Form.Group>
        </Form>
    )
}

//Using prop-types to give a warning if necessary values are not received correctly.
LoginForm.propTypes = {
    loginMethod: PropTypes.func.isRequired,
    handleUsrInputChangeMethod: PropTypes.func.isRequired,
    handlePwdInputChangeMethod: PropTypes.func.isRequired,
    usr: PropTypes.string.isRequired,
    pwd: PropTypes.string.isRequired,
}

export default LoginForm

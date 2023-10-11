/*Defining a LoginForm component with text and password type input
fields and a submit button. The required methods and data are received
from props. */
const LoginForm = (props) => {
    return (
        <form onSubmit={props.loginMethod}>
            <h2>Log in to application: </h2>
            <div>
                Username: <input type="text" value={props.usr} onChange={props.handleUsrInputChangeMethod} />
            </div>
            <br></br>
            <div>
                Password: <input type="password" value={props.pwd} onChange={props.handlePwdInputChangeMethod} />
            </div>
            <br></br>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default LoginForm

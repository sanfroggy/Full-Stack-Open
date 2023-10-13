//Importing the useState hook.
import { useState } from 'react'

//Defining a Blog component for displaying the data of a single blog.
const Blog = ({ blog }) => {

    const blogStyle = {
        border: 'solid',
        borderWidth: 2.5,
        marginBottom: 12,
        alignItems: 'center',
        backgroundColor: '#D7DBDD',
        color: 'black'
    }

    const titleButtonStyle = {
        border: 'none',
        backgroundColor: '#D7DBDD',
        fontSize: 14
    }

    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none' }
    const [buttonLabel, setButtonLabel] = useState('View')

    const toggleVisibility = () => {
        setVisible(!visible)
        if (buttonLabel === 'View') {
            setButtonLabel('Hide')
        }
        if (buttonLabel === 'Hide') {
            setButtonLabel('View')
        }
    }

        return (
            <div style={blogStyle}>
                <b>Title:</b> <button style={titleButtonStyle} onClick={toggleVisibility}> {blog.title}</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={toggleVisibility}>{buttonLabel}</button>
                <div style={showWhenVisible}>
                    <br /><b>Url:</b> {blog.url}<br />
                    <br /><b>Likes:</b> {blog.likes}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button>Like</button><br />
                    <br /><b>Author:</b> {blog.author}<br />
                    {blog.user && <div><br /><b>Added by:</b> {blog.user.name}</div>}
                </div>
            </div>
        )
}

export default Blog

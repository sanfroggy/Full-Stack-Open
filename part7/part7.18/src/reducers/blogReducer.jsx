//Importing the createSlice function, blogService and setMessageDisplay action creator.
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/Blogs'
import { setMessageDisplay } from './notificationReducer'

//Defining a reducer with the createSlice function. As an initialState it has an empty array.
const initialState = []

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {

        //Defining an action to create a new Blog object.
        newBlog(state, action) {
            state.concat(action.payload)
        },

        /*Defining an action to be able to set a value for
        the array of blogs. */
        setBlogs(state, action) {
            return action.payload
        },

        /*Defining an action to be able to set a value for
        the array of blogs and sort the array according to votes. */
        setAndSortBlogs(state, action) {
            return action.payload.sort((a, b) => b.likes - a.likes)
        },

        /*Defining an action to be able to updated the value of likes
        for a Blog object in the array of blogs. */
        likeBlog(state, action) {

            const id = action.payload.id
            const blogToUpdate = state.find(blog => blog.id === id)
            const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

            state.map(blog => {
                blog.id !== id ?
                    blog : updatedBlog
            })

        },

        //Defining an action to be able to remove a Blog object in the array of blogs.
        remove(state, action) {
            const id = action.payload
            state.filter(blog => {
                blog.id !== id
            })
        },

    },
})

export default blogSlice.reducer

export const { newBlog, setBlogs, setAndSortBlogs, likeBlog, remove } = blogSlice.actions

/*Exporting an action creator for creating a new Blog object using async/await and
useDispatch hook to post data to the backend and save it to the store. If the operation
is successful the setMessageDisplay method imported from the notificationReducer is
used to display an appropriate message. If an exception is caught it is shown as a message.
On successful operation the state of the blogs is updated and the array is sorted. */
export const create = (blog, blogFormRef) => {
    return async (dispatch) => {
        try {
            const response = await blogService.createNew(blog)
            dispatch(newBlog({ error: false, result: response }))
            blogFormRef.current.toggleVisibility()

            dispatch(updateBlogsState())
            dispatch(setMessageDisplay(`${response.title} was successfully created.`, false, 2.5))
        } catch (exception) {
            dispatch(setMessageDisplay(exception.response.data.error, true, 2.5))
        }
    }
}

//Exporting an action creator to update the array of blogs and sort it.
export const updateBlogsState = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setAndSortBlogs(blogs))
    }
}

/*Exporting an action creator for updating the likes of a Blog object using async/await and
useDispatch hook to put data to the backend and save it to the store.
If an exception is caught it is shown as a message. On successful operation the
state of the blogs is updated and the array is sorted. */
export const updateBlogsLikes = (blog) => {
    return async (dispatch) => {
        try {
            await blogService.updateBlog(blog.id, blog)
            dispatch(likeBlog(blog))
            dispatch(updateBlogsState())
        } catch (exception) {
            dispatch(setMessageDisplay(exception.response.data.error, true, 2.5))
        }
    }
}

/*Exporting an action creator for removing a Blog object using async/await and
useDispatch hook to delete data from the backend and save it to the store.
If an exception is caught it is shown as a message. If the operation
is successful the setMessageDisplay method imported from the notificationReducer is
used to display an appropriate message and the array is resorted. */
export const removeBlog = (id, title, user) => {
    return async (dispatch) => {
        try {{
            if (user.token) {
                blogService.setToken(user.token)
                await blogService.deleteBlog(id)
                dispatch(remove(id))
                dispatch(updateBlogsState())
                dispatch(setMessageDisplay(`${title} was successfully deleted.`, false, 2.5))
            }
        }
        } catch (exception) {
            dispatch(setMessageDisplay(exception.response.data.error, true, 2.5))
        }
    }
}
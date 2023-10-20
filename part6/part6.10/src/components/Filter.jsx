import { setFilter } from "../reducers/filterReducer"
import { useDispatch } from 'react-redux'
import { sortAnecdotes } from "../reducers/anecdoteReducer"

const Filter = () => {
    //Defining a variable for the the useDispatch hook.
    const dispatch = useDispatch()

    /*When the filter input field value is changed,
    useDispatch is used to filter the anecdotes and
    resort them after filtering. */
    const handleChange = (event) => {
        const filterString = event.target.value       
        dispatch(setFilter(filterString))
        dispatch(sortAnecdotes())
    }

    //Defining an inline-style for the filter div.
    const style = {
        marginBottom: 10
    }

    //Returning the div containing the filter input field.
    return (
        <div style={style}>
            Filter: <input onChange={handleChange} />
        </div>
    )
}

export default Filter

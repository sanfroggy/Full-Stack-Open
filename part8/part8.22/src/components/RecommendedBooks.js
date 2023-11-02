/*Importing useQuery hook from apollo client as well as the
useState and useEffect hooks and the defined ALL_BOOKS query. */
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../services/queries'
import { useState, useEffect } from 'react'

/*Defining a component to display an array of books
containing the logged in user's favoriteGenre. */
const RecommendedBooks = () => {

    //Defining a "state variable" for the user object.
    const [user, setUser] = useState({})

    /*Using the useQuery hook to get the user object
    from backend, using cache-and-network fetch policy. */
    const userQuery = useQuery(ME, {
        fetchPolicy: 'cache-and-network'
    })

    /*Defining "state variables" for books, the favorite genre 
    of the user and a variable for the useQuery hook used to get
    the desired results using no-cache fetch policy. */
    const [genre, setGenre] = useState('')

    const resultWithGenre = useQuery(ALL_BOOKS, {
        variables: { genre: genre },
        fetchPolicy: 'no-cache',
        skip: false
    })

    const [books, setBooks] = useState([])

    /*Using the useEffect hook, to make sure that whenever the result of
    ALL_BOOKS query with parameters or the value of the genre variable changes, 
    the book array is filtered accordingly. */
    useEffect(() => {
        if (!resultWithGenre.loading) {
            setBooks(resultWithGenre.data.allBooks)
        }
    }, [resultWithGenre])

    /*Using the useEffect hook, to make sure that whenever the value of the 
    logged in user "state variable" changes, the genre variable is set accordingly. */
    useEffect(() => {
        if (user.favoriteGenre) {
            setGenre(user.favoriteGenre)
            
        }
    }, [user])

    /*Using the useEffect hook, to make sure that whenever the result of the
    query to get the logged in user changes, the user "state variable" is set accordingly. */
    useEffect(() => {
        if (!userQuery.loading) {
            setUser(userQuery.data.me)
        }
    }, [userQuery])

    /*Using the useEffect hook, to make sure that on first render
    the user "state variable" is set accordingly. */
    useEffect(() => {
        if (!userQuery.loading) {
            setUser(userQuery.data.me)
        }
    }, [])

    //If results are still loading, only the text "Loading..." is returned.
    if (resultWithGenre.loading) {
        return <div><br />Loading...<br /></div>
    }

    /*Returning an html table with the title, author and year of
    publication of each book object in books array. Also returning a 
    "template literal" with the favorite genre of the user. */
    return (
        <div>
            <h2>Recommendations:</h2>
            <div>
                <p>{user.favoriteGenre ? `Books in your favorite genre "${user.favoriteGenre}":` : null}</p>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Author:</th>
                        <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Published:</th>
                    </tr>
                    {books.length > 0 ? books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;{a.author.name}</td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{a.published}</td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
            <br />
        </div>
    )
}

export default RecommendedBooks

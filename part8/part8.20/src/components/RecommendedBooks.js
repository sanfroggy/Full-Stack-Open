/*Importing useQuery hook from apollo client as well as the
useState and useEffect hooks and the defined ALL_BOOKS query. */
import { useUser } from '../hooks/index'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../services/queries'
import { useState, useEffect } from 'react'

/*Defining a component to display an array of books
in an html table. */
const RecommendedBooks = () => {

    const [user, setUser] = useState({})

    //const customuser = useUser()

    /*Using the useQuery hook to get all book objects 
    from backend. */


    const userQuery = useQuery(ME, {
        fetchPolicy: 'cache-and-network'
    })

    /*Defining "state variables" for books, selected genre 
    and the array of genres. */
    const [genre, setGenre] = useState('')

    const resultWithGenre = useQuery(ALL_BOOKS, {
        variables: { genre: genre },
        skip: false
    })

    const [books, setBooks] = useState([])


    /*Using the useEffect hook to make sure, that whenever the books array
    changes e.g a new book is added, the array of filterable genres is
    updated accordingly as well. */

    /*Using the useEffect hook, to make sure that whenever the result of
    ALL_BOOKS query with parameters changes, the book array is filtered accordingly. */
    useEffect(() => {
        if (!resultWithGenre.loading) {
            console.log(resultWithGenre)
            console.log(user.favoriteGenre)
            setBooks(resultWithGenre.data.allBooks)
        }
    }, [genre])

    useEffect(() => {
        if (!resultWithGenre.loading) {
            setGenre(user.favoriteGenre)
            
        }
    }, [user])

    useEffect(() => {
        if (!userQuery.loading) {
            //console.log("custom:" + customuser.getFavorite)
            console.log(user.favoriteGenre)
            setUser(userQuery.data.me)
        }
    }, [userQuery])

    //If results are still loading, only the text "Loading..." is returned.
    if (resultWithGenre.loading) {
        return <div><br />Loading...<br /></div>
    }

    /*Returning an html table with the title, author and year of
    publication of each book object in books array. Also returning
    a button for each existing genre to filter books shown. */
    return (
        <div>
            <h2>Books:</h2>

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

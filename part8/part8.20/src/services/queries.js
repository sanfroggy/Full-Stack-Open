//Importing gql from apollo client.
import { gql } from '@apollo/client'

//Defining a query to get all authors from the backend.
export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            id
            name
            born
            bookCount
        }
    }`

//Defining a query to get all books from the backend.
export const ALL_BOOKS = gql`
    query ($genre: String) {
        allBooks (genre: $genre) {
            title
            author {
                name
            }
            published
            genres
        }
    }`

export const ME = gql`
    query {
        me {
            favoriteGenre
        }
    }
`
//Importing gql from apollo client.
import { gql } from '@apollo/client'

//Defining a query to get all authors from the backend.
export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author {
                name
            }
            published
        }
    }`
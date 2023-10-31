//Importing gql from apollo client.
import { gql } from '@apollo/client'

/*Defining a mutation used to add a book to the backend.
The added book object is the returned. */
export const ADD_BOOK = gql`
    mutation newBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            author {
                name
            }
            published
            id
            genres
        }
    }
`

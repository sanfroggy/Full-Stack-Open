//Importing gql from apollo client.
import { gql } from '@apollo/client'

/*Defining and exporting a mutation used to add a book to the backend.
The added book object is the returned. */
export const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
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

/*Defining and exporting a mutation used to update an author's birthyear
in the backend. The updated object is then returned. */
export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
        }
    }
`

/*Defining and exporting a mutation used to login, receive a token and
set user data in the backend context. */
export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username: $username,
            password: $password
        ) {
            value
        }
    }
`


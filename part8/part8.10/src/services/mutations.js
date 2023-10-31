//Importing gql from apollo client.
import { gql } from '@apollo/client'

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

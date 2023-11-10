//Importing gql from apollo client.
import { gql } from '@apollo/client'

/*Defining a subscription to transfer data
whenever a new book is added. */
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
          name
          born
      }
      published
      genres
    }
  }
`

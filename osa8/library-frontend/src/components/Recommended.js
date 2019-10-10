import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const RECOMMENDED_BOOKS = gql`
  query allBooks($favoriteGenre: String!) {
    allBooks(genre: $favoriteGenre) {
    title
    author {name}
    published
    genres
  }
}
`

const Recommended = (props) => {
  const result = useQuery(RECOMMENDED_BOOKS, {
    variables: { favoriteGenre: props.user.favoriteGenre }
  })

  if (!props.show || result.loading) {
    return null
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{props.user.favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
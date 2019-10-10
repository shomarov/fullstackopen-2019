import React from 'react'
import { useQuery } from '@apollo/react-hooks'


const Recommended = (props) => {
  const result = useQuery(props.ALL_BOOKS, {
    variables: { genreToFilter: props.user.favoriteGenre }
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
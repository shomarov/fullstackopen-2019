import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

const Books = (props) => {
  const [genreToFilter, setGenreToFilter] = useState('')

  const result = useQuery(props.ALL_BOOKS, {
    variables: { genreToFilter }
  })

  if (!props.show || result.loading) {
    return null
  }

  const books = result.data.allBooks
  const genres = props.genres.data.allGenres

  return (
    <div>
      <h2>books</h2>

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

      {genres.map(g =>
        <button key={g} onClick={() => setGenreToFilter(g)}>{g}</button>)}
      <button onClick={() => setGenreToFilter('')}>all genres</button>
    </div>
  )
}

export default Books
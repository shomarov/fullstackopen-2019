import React from 'react'

const Books = (props) => {
  if (!props.show || props.books.loading) {
    return null
  }

  const books = props.books.data.allBooks
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
        <button key={g} onClick={() => props.setGenreToFilter(g)}>{g}</button>)}
      <button onClick={() => props.setGenreToFilter()}>all genres</button>
    </div>
  )
}

export default Books
import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author {name}
    published
  }
}
`

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  if (!props.show || result.loading) {
    return null
  }

  const books = result.data.allBooks

  console.log(books)

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
    </div>
  )
}

export default Books
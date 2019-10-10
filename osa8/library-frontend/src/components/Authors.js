import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import Select from 'react-select'

const EDIT_AUTHOR = gql`
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

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState()

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: props.ALL_AUTHORS }]
  })

  if (!props.show || props.authors.loading) {
    return null
  }

  const authors = props.authors.data.allAuthors

  const submit = async (e) => {
    e.preventDefault()

    editAuthor({
      variables: { name, setBornTo: parseInt(born) }
    })

    setName('')
    setBorn('')
    setSelectedOption(null)
  }

  const handleChange = (selectedOption) => {
    setName(selectedOption.value)
    setSelectedOption(selectedOption)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <Select
        value={selectedOption}
        options={authors.map(a => {
          return {
            value: a.name,
            label: a.name
          }
        })}
        onChange={handleChange}
      >
      </Select>
      <form onSubmit={submit}>
        born
        <input
          type='number'
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <button onClick={submit}>update author</button>
      </form>
    </div>
  )
}

export default Authors
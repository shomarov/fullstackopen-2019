import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { useApolloClient } from 'react-apollo'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'


const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
  query allBooks($genreToFilter: String) {
    allBooks(genre: $genreToFilter) {
    title
    author {name}
    published
  },
  allGenres
}
`

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {name}
      published
    }
  }
`

const ALL_BOOKS_AND_AUTHORS = gql`
{
  allBooks {
      title
      author {name}
      published
    },
    allAuthors {
      name
      born
      bookCount
    },
    allGenres
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const client = useApolloClient()

  const handleError = (error) => {
    console.log(error.graphQLErrors[0].message)
  }

  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    /* update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS })
      dataInStore.allBooks.push(response.data.addBook)
      store.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    } */
    refetchQueries: [{ query: ALL_BOOKS_AND_AUTHORS }]
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    setUser(JSON.parse(localStorage.getItem('library-user')))
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (books.loading) {
    return 'loading...'
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button>
          : <button onClick={() => setPage('login')}>login</button>}
        {token ? <button onClick={() => setPage('recommended')}>recommend</button> : null}
        {token ? <button onClick={logout}>logout</button> : null}
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors}
        ALL_AUTHORS={ALL_AUTHORS}
      />

      <Books
        show={page === 'books'}
        ALL_BOOKS={ALL_BOOKS}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      {user ? <Recommended
        show={page === 'recommended'}
        user={user}
      />
        : null}


      <LoginForm
        show={page === 'login'}
        setToken={(token) => setToken(token)}
        setUser={setUser}
        setPage={setPage}
      />

    </div>
  )
}


export default App
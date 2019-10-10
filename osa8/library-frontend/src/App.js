import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'


const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

const ALL_BOOKS = gql`
  query allBooks($genreToFilter: String) {
    allBooks(genre: $genreToFilter) {
    title
    author {name}
    published
    genres
    id
  }
}
`

const ALL_GENRES = gql`
{
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
      genres
      id
    }
  }
`

/* const ALL_BOOKS_AND_AUTHORS = gql`
query main($genreToFilter: String) {
  allBooks(genre: $genreToFilter) {
      title
      author {name}
      published
      genres
      id
  },
  allAuthors {
    name
    born
    bookCount
    id
  },
  allGenres
  }
` */

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {name}
      published
      genres
      id
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const genres = useQuery(ALL_GENRES)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    setUser(JSON.parse(localStorage.getItem('library-user')))
    if (token) {
      setToken(token)
    }
  }, [])

  const client = useApolloClient()

  const handleError = (error) => {
    console.log(error.graphQLErrors[0].message)
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      console.log(addedBook)
      console.log(dataInStore.allBooks)
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook)}
      })
    }
    console.log(dataInStore.allBooks)
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    },
    refetchQueries: { ALL_AUTHORS, ALL_GENRES }
  })

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
        genres={genres}
        ALL_BOOKS={ALL_BOOKS}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      {user ? <Recommended
        show={page === 'recommended'}
        user={user}
        ALL_BOOKS={ALL_BOOKS}
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
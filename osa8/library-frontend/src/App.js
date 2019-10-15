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

const AUTHOR_ADDED = gql`
  subscription {
    authorAdded {
      name
      born
      bookCount
      id
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [genreToFilter, setGenreToFilter] = useState()

  const client = useApolloClient()

  const authors = useQuery(ALL_AUTHORS)

  const books = useQuery(ALL_BOOKS, {
    variables: { genreToFilter }
  })

  const genres = useQuery(ALL_GENRES)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    setUser(JSON.parse(localStorage.getItem('library-user')))
    if (token) {
      setToken(token)
    }
  }, [])

  const handleError = (error) => {
    console.log(error.graphQLErrors[0].message)
  }

  const updateCacheWithNewBook = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

    try {
      const dataInStore = client.readQuery({
        query: ALL_BOOKS
      })
      if (!includedIn(dataInStore.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: { allBooks: dataInStore.allBooks.concat(addedBook) }
        })
      }
    } catch (e) { }
  }

  const updateCacheWithNewAuthor = (addedAuthor) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery({
      query: ALL_AUTHORS,
    })
    if (!includedIn(dataInStore.allAuthors, addedAuthor)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: dataInStore.allAuthors.concat(addedAuthor) }
      })
    }
  }

  const updateCacheWithNewBookInFilters = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

      console.log(addedBook)

    addedBook.genres.forEach(genre => {
      try {
        const dataInStore = client.readQuery({
          query: ALL_BOOKS,
          variables: { genreToFilter: genre }
        })

        console.log(dataInStore)

        if (!includedIn(dataInStore.allBooks, addedBook)) {
          client.writeQuery({
            query: ALL_BOOKS,
            variables: { genreToFilter: genre },
            data: { allBooks: dataInStore.allBooks.concat(addedBook) }
          })
        }

        console.log(dataInStore)
      } catch (e) { }
    })
  }

  const updateCacheWithNewGenre = (genres) => {
    const includedIn = (set, object) =>
      set.includes(object)

    const dataInStore = client.readQuery({
      query: ALL_GENRES,
    })

    genres.forEach(genre => {
      if (!includedIn(dataInStore.allGenres, genre)) {
        client.writeQuery({
          query: ALL_GENRES,
          data: { allGenres: dataInStore.allGenres.concat(genre) }
        })
      }
    })
  }

  console.log(books)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWithNewBook(addedBook)
      updateCacheWithNewBookInFilters(addedBook)
      updateCacheWithNewGenre(addedBook.genres)
    }
  })

  useSubscription(AUTHOR_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedAuthor = subscriptionData.data.authorAdded
      updateCacheWithNewAuthor(addedAuthor)
    }
  })

  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    update: (cache, response) => {
      updateCacheWithNewBook(response.data.addBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (books.loading) {
    return 'loading...'
  }

  const handleClickBooks = () => {
    setPage('books')
    setGenreToFilter()
  }

  const handleClickRecommend = () => {
    setGenreToFilter(user.favoriteGenre)
    setPage('recommended')
    console.log(user)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => handleClickBooks()}>books</button>
        {token
          ?
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => handleClickRecommend()}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
          : <button onClick={() => setPage('login')}>login</button>}

      </div>

      <Authors
        show={page === 'authors'}
        authors={authors}
        ALL_AUTHORS={ALL_AUTHORS}
      />

      <Books
        show={page === 'books'}
        user={user}
        books={books}
        genres={genres}
        setGenreToFilter={setGenreToFilter}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      {user ? <Recommended
        show={page === 'recommended'}
        setGenreToFilter={(genre) => setGenreToFilter(genre)}
        user={user}
        books={books}
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
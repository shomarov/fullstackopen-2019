const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const User = require('./models/user')
const Author = require('./models/author')
const Book = require('./models/book')

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://fullstackopen-2019:v8MPmqD3q6sqYdIH@cluster0-qezc6.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    books: [Book!]!
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addAuthor(
      name: String!
      born: Int
    ): Author
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      return author
        ? Book.find({ author, genres: { $in: [new RegExp(args.genre)] } }).populate('author')
        : Book.find({ genres: { $in: [new RegExp(args.genre)] } }).populate('author')
    },
    allAuthors: (root) => Author.find({}).populate('book'),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    books: async (root) => {
      console.log(root)
      return Book.find({ author: root }).populate('author')
    },
    bookCount: async (root) => {
      console.log(root)
      return Book.find({ author: root }).populate('author').countDocuments()
    }
  },
  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
      }

      const book = new Book({ ...args, author })

      try {
        await author.save()
        await book.save()
        await currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) {
        throw new UserInputError('no such author', {
          invalidArgs: args.name
        })
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return author
    },
    
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      try {
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
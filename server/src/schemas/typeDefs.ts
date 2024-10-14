const typeDefs = `
  type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
    }

 type Auth {
    token: String
    user: User
  }

 input BookInput {
    authors: [String]
    description: String
    bookId: String!
    image: String
    link: String
    title: String
  }

type Query {
    me: User
    Book(userId: ID!): [Book]
    }

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    saveBook(bookData: BookInput!): User

    removeBook(bookId: String!): User
    }
`;

export default typeDefs
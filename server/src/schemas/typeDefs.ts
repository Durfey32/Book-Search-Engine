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
    password: String
    }

 type Auth {
    token: ID!
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

input UserInput {
    username: String
    email: String
    password: String
  }

type Query {
    me: User
  }

type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: String!): User
    }
`;

export default typeDefs
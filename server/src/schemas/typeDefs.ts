const typeDefs = `
type bookSchema {
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
    savedBooks: [bookSchema]
    }

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(userId: ID!, bookId: bookSchema!): User
    deleteBook(userId: ID!, bookId: bookSchema!): User
    }
`;

export default typeDefs
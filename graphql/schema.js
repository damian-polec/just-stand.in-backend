const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
  }  

  input UserInput {
    email: String!
    name: String!
    password: String!
  }

  type RootMutation {
    createUser(userInput: UserInput) : User!
  }

  schema {
    mutation: RootMutation
  }
`);
module.exports = `
"""
User Sign Up Input
"""
input UserSignUpInput {
  "The user email should be typed in the sign up form in email field"
  email: String!
  "The user name should be typed in the sign up form in name field"
  name: String!
  "The user password should be typed in the sign up form in password field"
  password: String!
  "The user must confitm password in the sign up form in confirmPassword field"
  confirmPassword: String!
}

"""
User Login Input
"""
input UserLoginInput {
  "The user email should be typed in email field"
  email: String!
  "The user password should be typed in password field"
  password: String!
}

type AuthData {
  token: String!
  userId: String!
}

type User {
  _id: ID!
  name: String!
  email: String!
  password: String
}  

type Query {
  "Login"
  login(userInput: UserLoginInput): AuthData!
}

type Mutation {
  createUser(userInput: UserSignUpInput): User!
  deleteUser(id: ID!): Boolean
}

schema {
  query: Query
  mutation: Mutation
}
`
const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type Note {
    id: ID!
    name: String!
    description:String!
    time: String!
    category: String
    author: User!
    answer: [Answer!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    favoriteCount: Int!
    favoritedBy: [User]
  }
  type Answer{
    id: ID!
    content: String!
    question: Note!
    isTrue: Boolean!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note!]!
    favorites: [Note!]!
  }

  type NoteFeed {
    notes: [Note]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type Query {
    notes: [Note!]!
    note(id: ID): Note!
    user(username: String!): User
    users: [User!]!
    me: User!
    noteFeed(cursor: String): NoteFeed
    answers: [Answer!]!
    answer(id: ID): Answer!
  }

  type Mutation {
    newNote(name: String!, description: String!, time: String!, category: String!): Note
    updateNote(id: ID!, name: String!, description: String!, time: String!, category: String!): Note!
    deleteNote(id: ID!): Boolean!
    toggleFavorite(id: ID!): Note!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
    newAnswer(content: String!,questionID: String!,isTrue: Boolean!): Answer
  }
`;

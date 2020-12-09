const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type Question {
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
    question: Question!
    isTrue: Boolean!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    questions: [Question!]!
    favorites: [Question!]!
  }

  type QuestionFeed {
    questions: [Question]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type Query {
    questions: [Question!]!
    question(id: ID): Question!
    user(username: String!): User
    users: [User!]!
    me: User!
    questionFeed(cursor: String): QuestionFeed
    answers: [Answer!]!
    answer(id: ID): Answer!
  }

  type Mutation {
    newQuestion(name: String!, description: String!, time: String!, category: String!): Question
    updateQuestion(id: ID!, name: String!, description: String!, time: String!, category: String!): Question!
    deleteQuestion(id: ID!): Boolean!
    toggleFavorite(id: ID!): Question!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
    newAnswer(content: String!,questionID: String!,isTrue: Boolean!): Answer
  }
`;

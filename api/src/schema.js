const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime
  
  type Quiz {
    id: ID!
    description: String!
    questions: [Question!]!
    time: String!
    category: String!
  }

  type Result {
    id: ID!
    username: User!
    quiz: [Quiz!]!
    timeCompleted: String!
    noOfTrueAnswers: String!
  }

  type Question {
    id: ID!
    description:String!
    author: User!
    answer: [Answer!]!
    quiz: Quiz!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  type Answer{
    id: ID!
    description: String!
    question: Question!
    isTrue: Boolean!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    questions: [Question!]!
  }

  type QuestionFeed {
    questions: [Question]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type Query {
    getAllQuestions: [Question!]!
    getQuestion(id: ID): Question!
    getUser(username: String!): User
    getAllUsers: [User!]!
    me: User!
    questionFeed(cursor: String): QuestionFeed
    getAllAnswers: [Answer!]!
    getAnswer(id: ID): Answer!
    getAllQuizes: [Quiz!]!
    getQuiz(id:ID): Quiz!
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!

    createQuestion(description: String!,quizID: String!): Question
    updateQuestion(id: ID!, description: String!): Question!
    deleteQuestion(id: ID!): Boolean!
    
    createAnswer(description: String!,questionID: String!,isTrue: Boolean!): Answer
    updateAnswer(id: ID!, description: String!,questionID: String!,isTrue: Boolean!): Answer
    deleteAnswer(id: ID!): Boolean!

    createQuiz(description: String!, time: String!, category: String!): Quiz
    updateQuiz(id: ID!, description: String!, time: String!, category: String!): Quiz
    deleteQuiz(id: ID!): Boolean!

  }
`;

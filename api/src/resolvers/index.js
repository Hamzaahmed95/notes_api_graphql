const Query = require('./query');
const Mutation = require('./mutation');
const Question = require('./question');
const User = require('./user');
const Quiz = require('./quiz');
const Answer = require('./answer');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
  Query,
  Mutation,
  Question,
  User,
  Answer,
  Quiz,
  DateTime: GraphQLDateTime
};

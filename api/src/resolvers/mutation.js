const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');

const mongoose = require('mongoose');

require('dotenv').config();

const gravatar = require('../util/gravatar');

module.exports = {
  createQuestion: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to create a Question');
    }

    return await models.Question.create({
      description: args.description,
      quiz: mongoose.Types.ObjectId(args.quizID),
      author: mongoose.Types.ObjectId(user.id)
    });
  },
  createQuiz: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to create a Question');
    }

    return await models.Quiz.create({
      description: args.description,
      time: args.time,
      category: args.category,
      author: mongoose.Types.ObjectId(user.id)
    });
  },
  createAnswer: async (parent,args,{ models, user }) => {
    if(!user){
      throw new AuthenticationError('You must be signed in to create an answer');
    }
    return await models.Answer.create({
      description: args.description,
      question: mongoose.Types.ObjectId(args.questionID),
      isTrue: args.isTrue
    });
  },
  deleteQuestion: async (parent, { id }, { models, user }) => {
    // if not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError('You must be signed in to delete a Question');
    }

    // find the question
    const question = await models.Question.findById(id);
    // if the question owner and current user don't match, throw a forbidden error
    if (question && String(question.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to delete the Question");
    }

    try {
      // if everything checks out, remove the question
      await question.remove();
      return true;
    } catch (err) {
      // if there's an error along the way, return false
      return false;
    }
  },
  deleteQuiz: async (parent, { id }, { models, user }) => {
    // if not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError('You must be signed in to delete a Question');
    }

    // find the question
    const quiz = await models.Quiz.findById(id);
    // if the question owner and current user don't match, throw a forbidden error
    if (quiz && String(quiz.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to delete the Question");
    }

    try {
      // if everything checks out, remove the question
      await quiz.remove();
      return true;
    } catch (err) {
      // if there's an error along the way, return false
      return false;
    }
  },
  deleteAnswer: async (parent, { id }, { models, user }) => {
    // if not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError('You must be signed in to delete an Answer');
    }

    // find the answer
    const answer = await models.Answer.findById(id);
    // if the answer owner and current user don't match, throw a forbidden error
    if (answer && String(answer.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to delete the Answer");
    }

    try {
      // if everything checks out, remove the answer
      await answer.remove();
      return true;
    } catch (err) {
      // if there's an error along the way, return false
      return false;
    }
  },
  updateQuestion: async (parent, { description, id }, { models, user }) => {
    // if not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError('You must be signed in to update a question');
    }

    // find the question
    const question = await models.Question.findById(id);
    // if the question owner and current user don't match, throw a forbidden error
    if (question && String(question.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to update the question");
    }

    // Update the question in the db and return the updated question
    return await models.Question.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          description
        }
      },
      {
        new: true
      }
    );
  },
  updateQuiz: async (parent, { description,time,category, id }, { models, user }) => {
    // if not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError('You must be signed in to update a question');
    }

    // find the question
    const question = await models.Question.findById(id);
    // if the question owner and current user don't match, throw a forbidden error
    if (question && String(question.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to update the question");
    }

    // Update the question in the db and return the updated question
    return await models.Quiz.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          description,
          time,
          category
        }
      },
      {
        new: true
      }
    );
  },
  updateAnswer: async (parent, args, { models, user }) => {
    // if not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError('You must be signed in to update an answer');
    }

    // find the answer
    const answer = await models.Answer.findById(id);
    // if the answer owner and current user don't match, throw a forbidden error
    if (answer && String(answer.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to update the answer");
    }

    // Update the answer in the db and return the updated answer
    return await models.Answer.findOneAndUpdate(
      {
        _id: args.id
      },
      {
        $set: {
          description,
          isTrue: args.isTrue
        }
      },
      {
        new: true
      }
    );
  },
  signUp: async (parent, { username, email, password }, { models }) => {
    // normalize email address
    email = email.trim().toLowerCase();
    // hash the password
    const hashed = await bcrypt.hash(password, 10);
    // create the gravatar url
    const avatar = gravatar(email);
    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed
      });

      // create and return the json web token
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      // if there's a problem creating the account, throw an error
      throw new Error('Error creating account'+err);
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      // normalize email address
      email = email.trim().toLowerCase();
    }

    const user = await models.User.findOne({
      $or: [{ email }, { username }]
    });

    // if no user is found, throw an authentication error
    if (!user) {
      throw new AuthenticationError('Error signing in');
    }

    // if the passwords don't match, throw an authentication error
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError('Error signing in');
    }

    // create and return the json web token
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  }
};

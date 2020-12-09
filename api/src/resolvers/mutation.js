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
  newQuestion: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to create a Question');
    }

    return await models.Question.create({
      name: args.name,
      description: args.description,
      time: args.time,
      category:args.category,
      author: mongoose.Types.ObjectId(user.id),
      favoriteCount: 0
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
  updateQuestion: async (parent, { name,description, time,category, id }, { models, user }) => {
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
          name,
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
  toggleFavorite: async (parent, { id }, { models, user }) => {
    // if no user context is passed, throw auth error
    if (!user) {
      throw new AuthenticationError();
    }

    // check to see if the user has already favorited the question
    let questionCheck = await models.Question.findById(id);
    const hasUser = questionCheck.favoritedBy.indexOf(user.id);

    // if the user exists in the list
    // pull them from the list and reduce the favoriteCount by 1
    if (hasUser >= 0) {
      return await models.Question.findByIdAndUpdate(
        id,
        {
          $pull: {
            favoritedBy: mongoose.Types.ObjectId(user.id)
          },
          $inc: {
            favoriteCount: -1
          }
        },
        {
          // Set new to true to return the updated doc
          new: true
        }
      );
    } else {
      // if the user doesn't exists in the list
      // add them to the list and increment the favoriteCount by 1
      return await models.Question.findByIdAndUpdate(
        id,
        {
          $push: {
            favoritedBy: mongoose.Types.ObjectId(user.id)
          },
          $inc: {
            favoriteCount: 1
          }
        },
        {
          new: true
        }
      );
    }
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
  },
  newAnswer: async (parent,args,{ models, user }) => {
    if(!user){
      throw new AuthenticationError('You must be signed in to create an answer');
    }
    return await models.Answer.create({
      content: args.content,
      question: mongoose.Types.ObjectId(args.questionID),
      isTrue: args.isTrue
    });
  }
};

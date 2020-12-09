// Require the mongose library
const mongoose = require('mongoose');

// Define the Question's database schema
const questionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    // reference the author's object ID
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true
  }
);

// Define the 'Question' model with the schema
const Question = mongoose.model('Question', questionSchema);
// Export the module
module.exports = Question;

module.exports = {
    // Resolve the author info for a question when requested
    author: async (question, args, { models }) => {
      return await models.User.findById(question.author);
    },
    answer: async (question,args,{ models }) => {

      return await models.Answer.find({ question: { $in: question.id } });
    },
    quiz: async (question, args, { models }) => {
      return await models.Quiz.findById(question.quiz);
    }
  };
  
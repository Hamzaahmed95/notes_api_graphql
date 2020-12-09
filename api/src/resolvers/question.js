module.exports = {
    // Resolve the author info for a question when requested
    author: async (question, args, { models }) => {
      return await models.User.findById(question.author);
    },
    // Resolved the favoritedBy info for a question when requested
    favoritedBy: async (question, args, { models }) => {
      return await models.User.find({ _id: { $in: question.favoritedBy } });
    },
    answer: async (question,args,{ models }) => {

      return await models.Answer.find({ question: { $in: question.id } });
    }
  };
  
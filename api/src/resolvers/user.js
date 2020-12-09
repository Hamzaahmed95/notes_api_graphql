module.exports = {
    // Resolve the list of Question for a user when requested
    questions: async (user, args, { models }) => {
      return await models.Question.find({ author: user._id }).sort({ _id: -1 });
    }
  };
  
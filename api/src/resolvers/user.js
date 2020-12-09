module.exports = {
    // Resolve the list of Question for a user when requested
    questions: async (user, args, { models }) => {
      return await models.Question.find({ author: user._id }).sort({ _id: -1 });
    },
    // Resolve the list of favorites for a user when requested
    favorites: async (user, args, { models }) => {
      return await models.Question.find({ favoritedBy: user._id }).sort({ _id: -1 });
    }
  };
  
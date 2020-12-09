module.exports = {
    // Resolve the list of Question for a user when requested
    questions: async (quiz, args, { models }) => {
      return await models.Question.find({ quiz: { $in: quiz.id } });
    }
};
  
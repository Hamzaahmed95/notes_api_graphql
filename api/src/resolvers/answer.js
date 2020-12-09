module.exports = {
    // Resolve the list of Question for a user when requested
    question: async (answer, args, { models }) => {
      return await models.Question.findById(answer.question);
    }
};
  
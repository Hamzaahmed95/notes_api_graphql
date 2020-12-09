module.exports = {
    // Resolve the list of notes for a user when requested
    question: async (answer, args, { models }) => {
      return await models.Note.findById(answer.question);
    }
};
  
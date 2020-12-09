module.exports = {
  questions: async (parent, args, { models }) => {
      return await models.Question.find();
    },
    question: async (parent, args, { models }) => {
      return await models.Question.findById(args.id);
    },
    user: async (parent, args, { models }) => {
      return await models.User.findOne({ username: args.username });
    },
    users: async (parent, args, { models }) => {
      return await models.User.find({}).limit(100);
    },
    me: async (parent, args, { models, user }) => {
      return await models.User.findById(user.id);
    },
    questionFeed: async (parent, { cursor }, { models }) => {
      // hard code the limit to 10 items
      const limit = 10;
      // set the default hasNextPage value to false
      let hasNextPage = false;
      // if no cursor is passed the default query will be empty
      // this will pull the newest questions from the db
      let cursorQuery = {};
  
      // if there is a cursor
      // our query will look for questions with an ObjectId less than that of the cursor
      if (cursor) {
        cursorQuery = { _id: { $lt: cursor } };
      }
  
      // find the limit + 1 of questions in our db, sorted newest to oldest
      let questions = await models.Question.find(cursorQuery)
        .sort({ _id: -1 })
        .limit(limit + 1);
  
      // if the number of Question we find exceeds our limit
      // set hasNextPage to true & trim the Question to the limit
      if (questions.length > limit) {
        hasNextPage = true;
        questions = questions.slice(0, -1);
      }
  
      // the new cursor will be the Mongo ObjectID of the last item in the feed array
      const newCursor = questions[questions.length - 1]._id;
  
      return {
        questions,
        cursor: newCursor,
        hasNextPage
      };
    },
    answers: async (parent,args, { models}) =>{
      return await models.Answer.find();
    },
    answer: async (parent, args,{models}) =>{
      return await models.Answer.findById(args.id);
    }
  };
  
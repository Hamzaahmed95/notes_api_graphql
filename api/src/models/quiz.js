const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
    {
        description:{
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }

    },{
        timestamps: true
    }
)
const Quiz = mongoose.model('Quiz',quizSchema);
module.exports = Quiz;
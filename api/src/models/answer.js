const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
    {
        content:{
            type: String,
            required: true
        },
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Creator',
            required: true
        },
        isTrue: {
            type: Boolean,
            required: true
        }         

    },
    {
        timestamps: true
    }

)

const Answer = mongoose.model('Answer',answerSchema);
module.exports = Answer;
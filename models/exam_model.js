const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    Topic: {
        type: String
    },
    level: {
        type: String,
        enum: ["O Level", "A Level", "Form 1", "Form 2", "Form 3", "Form 4"]
    },
    durationInMinutes: {
        type: Number,
        default: 60
    },
    questions: [{
        questionText: {
            type: String,
            required: true
        },
        options: [String],
        correctAnswer: {
            type: String,
            required: true
        },
        correctAnswerExplanation: String
    }],
    isPublished: {
        type: Boolean,
        default: false
    },
    createdBy: {
        userId: mongoose.Schema.Types.ObjectId,
        userType: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Exam', examSchema);

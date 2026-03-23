const mongoose = require('mongoose');

const studentTopicProgressSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    status: {
        type: String,
        enum: ['not_started', 'in_progress', 'completed'],
        default: 'not_started'
    },
    progressPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    timeSpent: {
        type: Number,  // in minutes
        default: 0
    },
    lastAccessed: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    },
    quizScores: [{
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz'
        },
        score: Number,
        maxScore: Number,
        percentage: Number,
        takenAt: {
            type: Date,
            default: Date.now
        }
    }],
    resourcesViewed: [{
        resourceId: mongoose.Schema.Types.ObjectId,
        viewedAt: Date
    }],
    notes: {
        type: String
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

// Compound index for unique student-topic combination
studentTopicProgressSchema.index({ studentId: 1, topicId: 1 }, { unique: true });

// Index for faster queries
studentTopicProgressSchema.index({ studentId: 1, status: 1 });
studentTopicProgressSchema.index({ topicId: 1, status: 1 });
studentTopicProgressSchema.index({ lastAccessed: -1 });

module.exports = mongoose.model('StudentTopicProgress', studentTopicProgressSchema);

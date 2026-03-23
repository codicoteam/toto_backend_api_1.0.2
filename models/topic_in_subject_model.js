const mongoose = require('mongoose');

const topicInSubjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    subjectName: {
        type: String
    },
    showTopic: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        default: 0
    },
    regularPrice: {
        type: Number
    },
    subscriptionPeriod: {
        type: String,
        enum: ['Monthly', 'Quarterly', 'Yearly', 'OneTime'],
        default: 'Monthly'
    },
    order: {
        type: Number,
        default: 0
    },
    icon: {
        type: String
    },
    color: {
        type: String
    },
    totalLessons: {
        type: Number,
        default: 0
    },
    totalDuration: {
        type: Number, // in minutes
        default: 0
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

// Indexes for faster queries
topicInSubjectSchema.index({ subject: 1, order: 1 });
topicInSubjectSchema.index({ showTopic: 1 });
topicInSubjectSchema.index({ subscriptionPeriod: 1 });

module.exports = mongoose.model('TopicInSubject', topicInSubjectSchema);

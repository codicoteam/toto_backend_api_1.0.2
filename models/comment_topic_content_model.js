const mongoose = require('mongoose');

const commentTopicContentSchema = new mongoose.Schema({
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userType: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentTopicContent'
    },
    likes: [{
        userId: mongoose.Schema.Types.ObjectId,
        userType: String
    }],
    isEdited: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Indexes
commentTopicContentSchema.index({ topicId: 1 });
commentTopicContentSchema.index({ userId: 1 });
commentTopicContentSchema.index({ parentCommentId: 1 });
commentTopicContentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('CommentTopicContent', commentTopicContentSchema);

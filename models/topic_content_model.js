const mongoose = require('mongoose');

const topicContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    contentType: {
        type: String,
        enum: ['lesson', 'video', 'quiz', 'assignment', 'resource'],
        default: 'lesson'
    },
    content: {
        type: String  // For text content
    },
    videoUrl: {
        type: String  // For video content
    },
    file_path: [{
        type: String,
        description: "File paths for attachments"
    }],
    file_type: {
        type: String,
        enum: ['pdf', 'video', 'audio', 'document', 'image', 'other'],
        default: 'document'
    },
    lesson: [{
        title: String,
        description: String,
        content: String,
        videoUrl: String,
        order: Number,
        duration: Number, // in minutes
        resources: [{
            title: String,
            type: String,
            url: String
        }]
    }],
    order: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number, // in minutes
        default: 0
    },
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

// Indexes for faster queries
topicContentSchema.index({ topicId: 1, order: 1 });
topicContentSchema.index({ contentType: 1 });
topicContentSchema.index({ isPublished: 1 });

module.exports = mongoose.model('TopicContent', topicContentSchema);

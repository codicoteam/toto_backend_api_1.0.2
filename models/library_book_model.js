const mongoose = require('mongoose');

const libraryBookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    isbn: {
        type: String
    },
    publisher: {
        type: String
    },
    publishedYear: {
        type: Number
    },
    pages: {
        type: Number
    },
    coverImage: {
        type: String
    },
    fileUrl: {
        type: String
    },
    likes: [{
        userId: mongoose.Schema.Types.ObjectId,
        userType: String,
        likedAt: {
            type: Date,
            default: Date.now
        }
    }],
    likeCount: {
        type: Number,
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

// Index for faster queries
libraryBookSchema.index({ subjectId: 1 });
libraryBookSchema.index({ name: 'text', author: 'text', description: 'text' });

module.exports = mongoose.model('LibraryBook', libraryBookSchema);

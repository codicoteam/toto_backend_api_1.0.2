const mongoose = require('mongoose');

const messageCommunitySchema = new mongoose.Schema({
    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    senderType: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        required: true
    },
    senderName: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    attachments: [{
        type: String
    }],
    isEdited: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    readBy: [{
        userId: mongoose.Schema.Types.ObjectId,
        userType: String,
        readAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Indexes for faster queries
messageCommunitySchema.index({ communityId: 1, createdAt: -1 });
messageCommunitySchema.index({ senderId: 1 });
messageCommunitySchema.index({ createdAt: -1 });

module.exports = mongoose.model('MessageCommunity', messageCommunitySchema);

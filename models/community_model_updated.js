const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    profilePicture: {
        type: String
    },
    subject: {
        type: String
    },
    level: {
        type: String,
        enum: ["O Level", "A Level", "Form 1", "Form 2", "Form 3", "Form 4"]
    },
    createdBy: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        userType: {
            type: String,
            enum: ['student', 'teacher', 'admin'],
            required: true
        }
    },
    members: [{
        userId: mongoose.Schema.Types.ObjectId,
        userType: String,
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Community', communitySchema);

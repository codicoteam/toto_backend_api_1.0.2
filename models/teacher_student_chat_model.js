// teacher_student_chat Model
const mongoose = require('mongoose');

const teacherStudentChatSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'senderModel'
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['Teacher', 'Student']
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'receiverModel'
    },
    receiverModel: {
        type: String,
        required: true,
        enum: ['Teacher', 'Student']
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    readAt: {
        type: Date
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
    deletedFor: [{
        userId: mongoose.Schema.Types.ObjectId,
        userType: String
    }]
}, {
    timestamps: true
});

// Indexes for faster queries
teacherStudentChatSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });
teacherStudentChatSchema.index({ receiverId: 1, isRead: 1 });
teacherStudentChatSchema.index({ createdAt: -1 });

module.exports = mongoose.model('TeacherStudentChat', teacherStudentChatSchema);

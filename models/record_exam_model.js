const mongoose = require('mongoose');

const recordExamSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    },
    score: {
        type: Number,
        min: 0,
        max: 100
    },
    percentage: {
        type: Number,
        min: 0,
        max: 100
    },
    grade: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E', 'F']
    },
    results: {
        type: mongoose.Schema.Types.Mixed
    },
    comment: {
        type: String
    },
    timeSpent: {
        type: Number  // in minutes
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Indexes for faster queries
recordExamSchema.index({ studentId: 1, createdAt: -1 });
recordExamSchema.index({ examId: 1, score: -1 });
recordExamSchema.index({ studentId: 1, examId: 1 }, { unique: true });

module.exports = mongoose.model('RecordExam', recordExamSchema);

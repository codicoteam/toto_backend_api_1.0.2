const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'USD'
    },
    description: {
        type: String
    },
    customerPhoneNumber: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['ecocash', 'paynow', 'credit_card', 'cash'],
        default: 'ecocash'
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    transactionId: {
        type: String,
        unique: true,
        sparse: true
    },
    pollUrl: {
        type: String
    },
    reference: {
        type: String
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed
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
paymentSchema.index({ student_id: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Payment', paymentSchema);

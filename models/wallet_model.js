const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0,
        min: 0
    },
    currency: {
        type: String,
        default: 'USD',
        enum: ['USD', 'ZWL', 'EUR', 'GBP']
    },
    transactions: [{
        type: {
            type: String,
            enum: ['deposit', 'withdrawal', 'payment', 'refund'],
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
        method: {
            type: String,
            enum: ['ecocash', 'bank_transfer', 'credit_card', 'paypal', 'cash'],
            required: true
        },
        reference: {
            type: String
        },
        description: {
            type: String
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'cancelled'],
            default: 'completed'
        },
        balance: {
            type: Number,
            comment: "Balance after transaction"
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    totalDeposited: {
        type: Number,
        default: 0
    },
    totalWithdrawn: {
        type: Number,
        default: 0
    },
    lastTransactionAt: {
        type: Date
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
walletSchema.index({ student: 1 });
walletSchema.index({ 'transactions.createdAt': -1 });
walletSchema.index({ 'transactions.status': 1 });

// Method to add transaction and update balance
walletSchema.methods.addTransaction = function(transactionData) {
    const newBalance = this.balance + transactionData.amount;
    
    this.transactions.push({
        ...transactionData,
        balance: newBalance
    });
    
    this.balance = newBalance;
    
    if (transactionData.amount > 0) {
        this.totalDeposited += transactionData.amount;
    } else {
        this.totalWithdrawn += Math.abs(transactionData.amount);
    }
    
    this.lastTransactionAt = new Date();
    
    return this.save();
};

module.exports = mongoose.model('Wallet', walletSchema);

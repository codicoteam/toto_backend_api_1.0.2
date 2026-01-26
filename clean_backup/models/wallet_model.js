const mongoose = require("mongoose");

const contentPurchaseSchema = new mongoose.Schema({
  topicContent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "topic_content",
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  teacherRevenue: {
    type: Number,
    required: true,
  },
  platformFee: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

const walletTransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["deposit", "withdrawal", "content_purchase", "teacher_payout"],
    required: true,
  },
  method: {
    type: String,
    required: true,
    enum: ["bank_transfer", "ecocash", "inn bucks", "other", "content_purchase"],
  },
  reference: {
    type: String,
    required: true,
  },
  pollUrl: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "expired"],
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: function () {
      return this.type === "withdrawal";
    },
  },
  isExpired: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  // For content purchases
  contentPurchase: contentPurchaseSchema,
  // For teacher payouts
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

const walletSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      unique: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      unique: true,
      sparse: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },
    deposits: [walletTransactionSchema],
    withdrawals: [walletTransactionSchema],
    contentPurchases: [contentPurchaseSchema],
    teacherEarnings: {
      type: Number,
      default: 0,
      min: 0,
    },
    pendingPayouts: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPayouts: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
walletSchema.index({ student: 1 });
walletSchema.index({ teacher: 1 });
walletSchema.index({ "withdrawals.expiresAt": 1 });
walletSchema.index({ "contentPurchases.purchaseDate": 1 });

module.exports = mongoose.model("Wallet", walletSchema);
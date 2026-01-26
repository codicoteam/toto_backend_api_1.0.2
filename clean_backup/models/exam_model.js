const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  correctAnswerExplanation: {
    type: String,
    required: false,
  }
});

const examSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    Topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: false,
    },
    level: {
      type: String,
      required: true,
      enum: ["O Level", "A Level", "Others"],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    durationInMinutes: {
      type: Number,
      required: true,
    },
    questions: [questionSchema],
    isPublished: {
      type: Boolean,
      default: false,
    },
    attemptCount: {
      type: Number,
      default: 0,
    },
    averageScore: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { 
    timestamps: true 
  }
);

// Add indexes
examSchema.index({ teacherId: 1 });
examSchema.index({ subject: 1 });
examSchema.index({ Topic: 1 });
examSchema.index({ isPublished: 1 });
examSchema.index({ deleted: 1 });

module.exports = mongoose.model("Exam", examSchema);
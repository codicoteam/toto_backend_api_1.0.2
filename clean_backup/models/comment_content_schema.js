const mongoose = require("mongoose");

const contentCommentSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    content_system_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
      required: true,
    },
    comment_on_content: {
      type: String,
      required: true,
    },
    showComment: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("ContentComment", contentCommentSchema);

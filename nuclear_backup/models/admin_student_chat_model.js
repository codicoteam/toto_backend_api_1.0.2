const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "messages.senderType",
    },
    senderType: {
      type: String,
      required: true,
      enum: ["Admin", "Student", "Teacher"],
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "messages.receiverType",
    },
    receiverType: {
      type: String,
      required: true,
      enum: ["Admin", "Student", "Teacher"],
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    attachments: [
      {
        fileName: String,
        fileUrl: String,
        fileType: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "participants.userType",
        },
        userType: {
          type: String,
          required: true,
          enum: ["Admin", "Student", "Teacher"],
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
        lastSeen: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    messages: [messageSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    chatType: {
      type: String,
      enum: ["student_teacher", "student_admin", "teacher_admin", "group"],
      default: "student_teacher",
    },
    groupName: {
      type: String,
      required: function () {
        return this.chatType === "group";
      },
    },
    groupDescription: {
      type: String,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "participants.userType",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
chatSchema.index({ "participants.userId": 1, "participants.userType": 1 });
chatSchema.index({ lastMessageAt: -1 });
chatSchema.index({ chatType: 1 });
chatSchema.index({ isActive: 1 });

module.exports = mongoose.model("Chat", chatSchema);
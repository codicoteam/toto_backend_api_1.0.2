const mongoose = require("mongoose");

const communityMemberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "members.userType",
  },
  userType: {
    type: String,
    required: true,
    enum: ["Admin", "Student", "Teacher"],
  },
  role: {
    type: String,
    enum: ["member", "moderator", "admin"],
    default: "member",
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
});

const communityPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "posts.userType",
  },
  userType: {
    type: String,
    required: true,
    enum: ["Admin", "Student", "Teacher"],
  },
  content: {
    type: String,
    required: true,
  },
  media: [
    {
      url: String,
      type: {
        type: String,
        enum: ["image", "video", "document"],
      },
      thumbnail: String,
    },
  ],
  likes: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "posts.likes.userType",
      },
      userType: {
        type: String,
        required: true,
        enum: ["Admin", "Student", "Teacher"],
      },
      likedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likesCount: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "posts.comments.userType",
      },
      userType: {
        type: String,
        required: true,
        enum: ["Admin", "Student", "Teacher"],
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      replies: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "posts.comments.replies.userType",
          },
          userType: {
            type: String,
            required: true,
            enum: ["Admin", "Student", "Teacher"],
          },
          content: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
  commentsCount: {
    type: Number,
    default: 0,
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      required: true,
      enum: ["academic", "social", "sports", "hobbies", "general"],
      default: "academic",
    },
    level: {
      type: String,
      enum: ["O Level", "A Level", "All Levels"],
      default: "All Levels",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      default: null,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    requireApproval: {
      type: Boolean,
      default: false,
    },
    members: [communityMemberSchema],
    posts: [communityPostSchema],
    memberCount: {
      type: Number,
      default: 0,
    },
    postCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "createdBy.userType",
      },
      userType: {
        type: String,
        required: true,
        enum: ["Admin", "Student", "Teacher"],
      },
    },
    admins: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "admins.userType",
        },
        userType: {
          type: String,
          required: true,
          enum: ["Admin", "Student", "Teacher"],
        },
        assignedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    rules: [
      {
        rule: String,
        description: String,
      },
    ],
    lastActivity: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
communitySchema.index({ name: 1 });
communitySchema.index({ category: 1 });
communitySchema.index({ level: 1 });
communitySchema.index({ subject: 1 });
communitySchema.index({ "members.userId": 1, "members.userType": 1 });
communitySchema.index({ "createdBy.userId": 1, "createdBy.userType": 1 });
communitySchema.index({ lastActivity: -1 });
communitySchema.index({ isActive: 1 });

// Update memberCount before save
communitySchema.pre("save", function (next) {
  this.memberCount = this.members.length;
  this.postCount = this.posts.length;
  next();
});

module.exports = mongoose.model("Community", communitySchema);
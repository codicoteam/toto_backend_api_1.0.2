const topic_contentModel = require("../models/topic_content_model.js");
const topic_contentModel = require("../models/topic_content_model.js");
const topic_contentModel = require("../models/topic_content_model.js");
const topic_contentModel = require("../models/topic_content_model.js");
const topic_contentModel = require("mongoose");

// Helper function to get model by user type
const getModelByUserType = (userType) => {
  switch (userType) {
    case "Admin":
      return Admin;
    case "Student":
      return Student;
    case "Teacher":
      return Teacher;
    default:
      return null;
  }
};

// Helper function to pick user fields
const pickUserFields = "firstName lastName profilePicture email profile_picture profile_pic_url fullName";

// Helper to populate user
const populateUser = async (userType, userId) => {
  if (!userId) return null;
  const Model = getModelByUserType(userType);
  return Model.findById(userId).select(pickUserFields);
};

// Create new topic content
const createTopicContent = async (data) => {
  try {
    const newContent = new TopicContent(data);
    await newContent.save();
    return newContent;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all topic contents (non-deleted only)
const getAllTopicContents = async () => {
  try {
    return await TopicContent.find({ deleted: false })
      .populate("Topic")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications");
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get topic content by ID with full population
const getTopicContentById = async (id) => {
  try {
    const content = await TopicContent.findById(id)
      .populate("Topic")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications bio");

    if (!content) {
      throw new Error("Topic content not found");
    }

    // Process each lesson to populate user data
    for (const lesson of content.lesson) {
      // Populate comments
      for (const comment of lesson.comments) {
        const userData = await populateUser(comment.userType, comment.userId);
        comment.userId = userData;
      }

      // Populate replies in comments
      for (const comment of lesson.comments) {
        for (const reply of comment.replies) {
          const userData = await populateUser(reply.userType, reply.userId);
          reply.userId = userData;
        }
      }

      // Populate reactions
      for (const reaction of lesson.reactions) {
        const userData = await populateUser(reaction.userType, reaction.userId);
        reaction.userId = userData;
      }
    }

    return content;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get topic contents by Topic ID
const getTopicContentByTopicId = async (topicId) => {
  try {
    let contents = await TopicContent.find({
      Topic: topicId,
      deleted: false,
    })
      .populate("Topic")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications");

    if (!contents || contents.length === 0) {
      throw new Error("No content found for the specified Topic ID");
    }

    // Process each content
    for (const content of contents) {
      // Process each lesson
      for (const lesson of content.lesson) {
        // Populate comments
        for (const comment of lesson.comments) {
          const userData = await populateUser(comment.userType, comment.userId);
          comment.userId = userData;
        }

        // Populate replies inside comments
        for (const comment of lesson.comments) {
          for (const reply of comment.replies) {
            const userData = await populateUser(reply.userType, reply.userId);
            reply.userId = userData;
          }
        }
        // Populate reactions
        for (const reaction of lesson.reactions) {
          const userData = await populateUser(reaction.userType, reaction.userId);
          reaction.userId = userData;
        }
      }
    }
    return contents;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get topic contents by teacher ID
const getTopicContentByTeacherId = async (teacherId) => {
  try {
    const contents = await TopicContent.find({ 
      teacherId, 
      deleted: false 
    })
      .populate("Topic")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications")
      .sort({ createdAt: -1 });

    return contents;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update topic content by ID
const updateTopicContent = async (id, updateData) => {
  try {
    const updatedContent = await TopicContent.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    )
      .populate("Topic")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications");
    
    if (!updatedContent) {
      throw new Error("Topic content not found");
    }
    return updatedContent;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Soft delete (move to trash)
const moveToTrash = async (id) => {
  try {
    const deletedContent = await TopicContent.findByIdAndUpdate(
      id,
      { deleted: true, deletedAt: Date.now() },
      { new: true }
    )
      .populate("Topic")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications");

    if (!deletedContent) {
      throw new Error("Topic content not found");
    }
    return deletedContent;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Restore from trash
const restoreFromTrash = async (id) => {
  try {
    const restoredContent = await TopicContent.findByIdAndUpdate(
      id,
      { deleted: false, deletedAt: null },
      { new: true }
    )
      .populate("Topic")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications");

    if (!restoredContent) {
      throw new Error("Topic content not found");
    }
    return restoredContent;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all trashed items
const getTrashedContents = async () => {
  try {
    return await TopicContent.find({ deleted: true })
      .populate("Topic")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications");
  } catch (error) {
    throw new Error(error.message);
  }
};

// Permanent deletion
const deletePermanently = async (id) => {
  try {
    const deletedContent = await TopicContent.findByIdAndDelete(id);
    if (!deletedContent) {
      throw new Error("Topic content not found");
    }
    return deletedContent;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Add a comment to a lesson
const addComment = async (contentId, lessonIndex, commentData) => {
  try {
    const content = await TopicContent.findById(contentId);
    if (!content) {
      throw new Error("Topic content not found");
    }

    if (!content.lesson[lessonIndex]) {
      throw new Error("Lesson not found");
    }

    // Add the comment to the lesson
    content.lesson[lessonIndex].comments.push(commentData);
    await content.save();

    return content.lesson[lessonIndex].comments;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Add a reply to a comment
const addReplyToComment = async (
  contentId,
  lessonIndex,
  commentIndex,
  replyData
) => {
  try {
    const content = await TopicContent.findById(contentId);
    if (!content) {
      throw new Error("Topic content not found");
    }

    if (!content.lesson[lessonIndex]) {
      throw new Error("Lesson not found");
    }

    if (!content.lesson[lessonIndex].comments[commentIndex]) {
      throw new Error("Comment not found");
    }

    // Add the reply to the comment
    content.lesson[lessonIndex].comments[commentIndex].replies.push(replyData);
    await content.save();

    return content.lesson[lessonIndex].comments[commentIndex].replies;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Add or update a reaction
const addReaction = async (contentId, lessonIndex, reactionData) => {
  try {
    const content = await TopicContent.findById(contentId);
    if (!content) {
      throw new Error("Topic content not found");
    }

    if (!content.lesson[lessonIndex]) {
      throw new Error("Lesson not found");
    }

    const lesson = content.lesson[lessonIndex];
    const existingReactionIndex = lesson.reactions.findIndex(
      (r) =>
        r.userId.toString() === reactionData.userId.toString() &&
        r.userType === reactionData.userType
    );

    if (existingReactionIndex !== -1) {
      // Update existing reaction
      lesson.reactions[existingReactionIndex].emoji = reactionData.emoji;
    } else {
      // Add new reaction
      lesson.reactions.push(reactionData);
    }

    await content.save();
    return lesson.reactions;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get comments for a lesson
const getComments = async (contentId, lessonIndex) => {
  try {
    const content = await TopicContent.findById(contentId);
    if (!content) throw new Error("Topic content not found");

    const lesson = content.lesson?.[lessonIndex];
    if (!lesson) throw new Error("Lesson not found");

    // Build a fully-populated comments array
    const populatedComments = await Promise.all(
      lesson.comments.map(async (commentDoc) => {
        const comment = commentDoc.toObject();

        // Populate comment author
        comment.userId = await populateUser(comment.userType, comment.userId);

        // Populate each reply author
        comment.replies = await Promise.all(
          (comment.replies || []).map(async (replyDoc) => {
            const reply = replyDoc;
            reply.userId = await populateUser(reply.userType, reply.userId);
            return reply;
          })
        );

        return comment;
      })
    );

    return populatedComments;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get reactions for a lesson
const getReactions = async (contentId, lessonIndex) => {
  try {
    const content = await TopicContent.findById(contentId);
    if (!content) throw new Error("Topic content not found");

    const lesson = content.lesson?.[lessonIndex];
    if (!lesson) throw new Error("Lesson not found");

    const populatedReactions = await Promise.all(
      lesson.reactions.map(async (reactionDoc) => {
        const reaction = reactionDoc.toObject();
        reaction.userId = await populateUser(
          reaction.userType,
          reaction.userId
        );
        return reaction;
      })
    );

    return populatedReactions;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete a comment from a lesson
const deleteComment = async (contentId, lessonIndex, commentIndex) => {
  try {
    const content = await TopicContent.findById(contentId);
    if (!content) throw new Error("Topic content not found");
    if (!content.lesson[lessonIndex]) throw new Error("Lesson not found");
    if (!content.lesson[lessonIndex].comments[commentIndex])
      throw new Error("Comment not found");

    // Remove the comment
    content.lesson[lessonIndex].comments.splice(commentIndex, 1);
    await content.save();

    return content.lesson[lessonIndex].comments;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete a reaction from a lesson
const deleteReaction = async (contentId, lessonIndex, reactionIndex) => {
  try {
    const content = await TopicContent.findById(contentId);
    if (!content) throw new Error("Topic content not found");
    if (!content.lesson[lessonIndex]) throw new Error("Lesson not found");
    if (!content.lesson[lessonIndex].reactions[reactionIndex])
      throw new Error("Reaction not found");

    // Remove the reaction
    content.lesson[lessonIndex].reactions.splice(reactionIndex, 1);
    await content.save();

    return content.lesson[lessonIndex].reactions;
  } catch (error) {
    throw new Error(error.message);
  }
};

const { Types } = require("mongoose");

const safeToObject = (v) =>
  v && typeof v.toObject === "function" ? v.toObject() : v;

// Get lesson info by ID
const getLessonInfo = async (contentId, lessonId) => {
  if (!Types.ObjectId.isValid(contentId)) throw new Error("Invalid contentId");
  if (!Types.ObjectId.isValid(lessonId)) throw new Error("Invalid lessonId");

  const content = await TopicContent.findById(contentId)
    .populate("Topic")
    .populate("teacherId", "firstName lastName email profile_pic_url qualifications");
  
  if (!content) throw new Error("Topic content not found");

  const lesson = content.lesson.id(lessonId);
  if (!lesson) throw new Error("Lesson not found");

  const base = safeToObject(lesson);

  const comments = await Promise.all(
    (base.comments || []).map(async (c) => {
      const comment = safeToObject(c);
      if (comment?.userId) {
        comment.userId = await populateUser(comment.userType, comment.userId);
      }

      comment.replies = await Promise.all(
        (comment.replies || []).map(async (r) => {
          const reply = safeToObject(r);
          if (reply?.userId) {
            reply.userId = await populateUser(reply.userType, reply.userId);
          }
          return reply;
        })
      );

      return comment;
    })
  );

  const reactions = await Promise.all(
    (base.reactions || []).map(async (r) => {
      const reaction = safeToObject(r);
      if (reaction?.userId) {
        reaction.userId = await populateUser(
          reaction.userType,
          reaction.userId
        );
      }
      return reaction;
    })
  );

  return { ...base, comments, reactions };
};

const {
  Types: { ObjectId },
} = mongoose;

// Get all topic contents with lean lessons
const getAllTopicContentsLeanLessons = async () => {
  try {
    const results = await TopicContent.aggregate([
      { $match: { deleted: false } },
      // populate Topic
      {
        $lookup: {
          from: "topics",
          localField: "Topic",
          foreignField: "_id",
          as: "Topic",
        },
      },
      { $unwind: { path: "$Topic", preserveNullAndEmptyArrays: true } },
      // populate teacher
      {
        $lookup: {
          from: "teachers",
          localField: "teacherId",
          foreignField: "_id",
          as: "teacherId",
        },
      },
      { $unwind: { path: "$teacherId", preserveNullAndEmptyArrays: true } },
      // project lessons to only {_id, text} while keeping all other fields
      {
        $addFields: {
          lesson: {
            $map: {
              input: "$lesson",
              as: "l",
              in: { _id: "$$l._id", text: "$$l.text" },
            },
          },
        },
      },
    ]).exec();

    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get topic contents by Topic ID with lean lessons
const getTopicContentsByTopicIdLeanLessons = async (topicId) => {
  try {
    const results = await TopicContent.aggregate([
      { $match: { deleted: false, Topic: new ObjectId(topicId) } },
      // populate Topic
      {
        $lookup: {
          from: "topics",
          localField: "Topic",
          foreignField: "_id",
          as: "Topic",
        },
      },
      { $unwind: { path: "$Topic", preserveNullAndEmptyArrays: true } },
      // populate teacher
      {
        $lookup: {
          from: "teachers",
          localField: "teacherId",
          foreignField: "_id",
          as: "teacherId",
        },
      },
      { $unwind: { path: "$teacherId", preserveNullAndEmptyArrays: true } },
      // project lessons to only {_id, text} while keeping all other fields
      {
        $addFields: {
          lesson: {
            $map: {
              input: "$lesson",
              as: "l",
              in: { _id: "$$l._id", text: "$$l.text" },
            },
          },
        },
      },
    ]).exec();

    if (!results || results.length === 0) {
      throw new Error("No content found for the specified Topic ID");
    }

    // Return only the first object in the array
    return results[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get topic content by ID with lean lessons
const getTopicContentLeanLessonsById = async (id) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid topic content ID");
    }

    const [doc] = await TopicContent.aggregate([
      { $match: { _id: new ObjectId(id), deleted: false } },
      // Populate `Topic`
      {
        $lookup: {
          from: "topics",
          localField: "Topic",
          foreignField: "_id",
          as: "Topic",
        },
      },
      { $unwind: { path: "$Topic", preserveNullAndEmptyArrays: true } },
      // Populate teacher
      {
        $lookup: {
          from: "teachers",
          localField: "teacherId",
          foreignField: "_id",
          as: "teacherId",
        },
      },
      { $unwind: { path: "$teacherId", preserveNullAndEmptyArrays: true } },
      // Keep all top-level fields but slim down lessons to {_id, text}
      {
        $addFields: {
          lesson: {
            $map: {
              input: "$lesson",
              as: "l",
              in: { _id: "$$l._id", text: "$$l.text" },
            },
          },
        },
      },
    ]).exec();

    if (!doc) {
      throw new Error("Topic content not found");
    }

    return doc;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update lesson content
const updateLessonContent = async (contentId, lessonId, payload = {}) => {
  if (!Types.ObjectId.isValid(contentId)) throw new Error("Invalid contentId");
  if (!Types.ObjectId.isValid(lessonId)) throw new Error("Invalid lessonId");

  const ALLOWED = ["text", "audio", "video", "subHeading"];
  const setOps = {};
  for (const key of ALLOWED) {
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      setOps[`lesson.$.${key}`] = payload[key];
    }
  }
  if (Object.keys(setOps).length === 0) {
    throw new Error(
      "No valid fields to update. Allowed: text, audio, video, subHeading"
    );
  }

  const res = await TopicContent.updateOne(
    { _id: contentId, deleted: false, "lesson._id": lessonId },
    { $set: setOps }
  );

  if (res.matchedCount === 0) {
    const content = await TopicContent.findById(contentId).lean();
    if (!content) throw new Error("Topic content not found");
    if (content.deleted) throw new Error("Topic content is deleted");
    throw new Error("Lesson not found");
  }

  return { matchedCount: res.matchedCount, modifiedCount: res.modifiedCount };
};

// Reorder lessons
async function reorderLessons(topicContentId, orderedLessonIds) {
  if (!mongoose.isValidObjectId(topicContentId)) {
    throw new Error("Invalid topic_content id");
  }
  if (!Array.isArray(orderedLessonIds) || orderedLessonIds.length === 0) {
    throw new Error("`order` must be a non-empty array of lesson ids");
  }

  const doc = await TopicContent.findById(topicContentId);
  if (!doc) throw new Error("topic_content not found");

  const existingIds = doc.lesson.map((l) => String(l._id));
  const incomingIds = orderedLessonIds.map(String);

  // Validate size
  if (existingIds.length !== incomingIds.length) {
    throw new Error(
      "`order` must include every existing lesson id exactly once"
    );
  }
  // Validate set
  const sameSet =
    [...existingIds].sort().join(",") === [...incomingIds].sort().join(",");
  if (!sameSet) {
    throw new Error("`order` must match the set of existing lesson ids");
  }

  const byId = new Map(doc.lesson.map((l) => [String(l._id), l]));
  doc.lesson = incomingIds.map((id) => byId.get(id));
  doc.markModified("lesson");

  await doc.save();

  return {
    _id: doc._id,
    lesson: doc.lesson.map((l) => ({ _id: l._id })),
  };
}

// Add lesson info
const addLessonInfo = async (topicContentId, lessonPayload = {}) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(topicContentId)) {
      throw new Error("Invalid topic_content id");
    }

    const content = await TopicContent.findOne({
      _id: topicContentId,
      deleted: false,
    });

    if (!content) {
      throw new Error("Topic content not found or is in trash");
    }

    const lesson = {
      text: lessonPayload.text ?? "",
      subHeading: Array.isArray(lessonPayload.subHeading)
        ? lessonPayload.subHeading
        : [],
      audio: lessonPayload.audio ?? undefined,
      video: lessonPayload.video ?? undefined,
      comments: [],
      reactions: [],
    };

    content.lesson.push(lesson);
    await content.save();

    const newLesson = content.lesson[content.lesson.length - 1];
    return { topicContent: content, lesson: newLesson };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete lesson info
const deleteLessonInfo = async (topicContentId, lessonId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(topicContentId)) {
      throw new Error("Invalid topic_content id");
    }
    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      throw new Error("Invalid lesson id");
    }

    const content = await TopicContent.findOne({
      _id: topicContentId,
      deleted: false,
    }).select("lesson");

    if (!content) throw new Error("Topic content not found or is in trash");

    const lesson = content.lesson.id(lessonId);
    if (!lesson) throw new Error("Lesson not found");

    const deletedLesson = lesson.toObject();
    lesson.deleteOne();
    await content.save();

    return { topicContent: content, deletedLesson };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Increment purchase count
const incrementPurchaseCount = async (contentId, amount) => {
  try {
    const content = await TopicContent.findById(contentId);
    if (!content) {
      throw new Error("Topic content not found");
    }
    
    content.purchaseCount += 1;
    content.totalRevenue += amount;
    
    await content.save();
    return content;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete topic content (alias for moveToTrash)
const deleteTopicContent = async (id) => {
  return await moveToTrash(id);
};

module.exports = {
  createTopicContent,
  getAllTopicContents,
  getTopicContentById,
  getTopicContentByTopicId,
  getTopicContentByTeacherId,
  updateTopicContent,
  deleteTopicContent,
  addComment,
  addReplyToComment,
  addReaction,
  getComments,
  getReactions,
  deletePermanently,
  moveToTrash,
  restoreFromTrash,
  getTrashedContents,
  deleteComment,
  deleteReaction,
  getLessonInfo,
  getAllTopicContentsLeanLessons,
  getTopicContentsByTopicIdLeanLessons,
  getTopicContentLeanLessonsById,
  updateLessonContent,
  reorderLessons,
  addLessonInfo,
  deleteLessonInfo,
  incrementPurchaseCount,
};

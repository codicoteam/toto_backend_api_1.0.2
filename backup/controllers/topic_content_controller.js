const topicContentService = require("../services/topic_content_service.js");

// Create topic content
exports.createTopicContent = async (req, res) => {
  try {
    // Add teacherId if user is a teacher
    if (req.user && req.user.type === 'teacher') {
      req.body.teacherId = req.user.id;
    }
    
    const newContent = await topicContentService.createTopicContent(req.body);
    
    res.status(201).json({
      success: true,
      message: "Topic content created successfully",
      data: newContent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create topic content",
      error: error.message,
    });
  }
};

// Get all topic contents
exports.getAllTopicContents = async (req, res) => {
  try {
    const contentList = await topicContentService.getAllTopicContents();
    
    res.status(200).json({
      success: true,
      message: "Topic contents retrieved successfully",
      data: contentList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve topic contents",
      error: error.message,
    });
  }
};

// Get topic content by ID
exports.getTopicContentById = async (req, res) => {
  try {
    const content = await topicContentService.getTopicContentById(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Topic content retrieved successfully",
      data: content,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Topic content not found",
      error: error.message,
    });
  }
};

// Get topic contents by topic ID
exports.getTopicContentByTopicId = async (req, res) => {
  try {
    const contents = await topicContentService.getTopicContentByTopicId(
      req.params.topicId
    );
    
    res.status(200).json({
      success: true,
      message: "Topic contents retrieved successfully",
      data: contents,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "No content found for this Topic ID",
      error: error.message,
    });
  }
};

// Get topic contents by teacher ID
exports.getTopicContentByTeacherId = async (req, res) => {
  try {
    const contents = await topicContentService.getTopicContentByTeacherId(
      req.params.teacherId
    );
    
    res.status(200).json({
      success: true,
      message: "Topic contents retrieved successfully",
      data: contents,
      count: contents.length,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "No content found for this Teacher",
      error: error.message,
    });
  }
};

// Update topic content
exports.updateTopicContent = async (req, res) => {
  try {
    // Check if user is the creator (if content has teacherId)
    if (req.user.type === 'teacher') {
      const content = await topicContentService.getTopicContentById(req.params.id);
      if (content.teacherId && content.teacherId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You can only update your own content",
        });
      }
    }
    
    const updatedContent = await topicContentService.updateTopicContent(
      req.params.id,
      req.body
    );
    
    res.status(200).json({
      success: true,
      message: "Topic content updated successfully",
      data: updatedContent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update topic content",
      error: error.message,
    });
  }
};

// Delete topic content (soft delete)
exports.deleteTopicContent = async (req, res) => {
  try {
    // Check if user is the creator (if content has teacherId)
    if (req.user.type === 'teacher') {
      const content = await topicContentService.getTopicContentById(req.params.id);
      if (content.teacherId && content.teacherId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You can only delete your own content",
        });
      }
    }
    
    await topicContentService.deleteTopicContent(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Topic content moved to trash successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to move topic content to trash",
      error: error.message,
    });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { contentId, lessonIndex } = req.params;
    
    // Add user info to comment
    req.body.userId = req.user.id;
    req.body.userType = req.user.type === 'teacher' ? 'Teacher' : 
                       req.user.type === 'admin' ? 'Admin' : 'Student';
    
    const comments = await topicContentService.addComment(
      contentId,
      parseInt(lessonIndex),
      req.body
    );
    
    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: comments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add comment",
      error: error.message,
    });
  }
};

// Add reply to comment
exports.addReplyToComment = async (req, res) => {
  try {
    const { contentId, lessonIndex, commentIndex } = req.params;
    
    // Add user info to reply
    req.body.userId = req.user.id;
    req.body.userType = req.user.type === 'teacher' ? 'Teacher' : 
                       req.user.type === 'admin' ? 'Admin' : 'Student';
    
    const replies = await topicContentService.addReplyToComment(
      contentId,
      parseInt(lessonIndex),
      parseInt(commentIndex),
      req.body
    );
    
    res.status(201).json({
      success: true,
      message: "Reply added successfully",
      data: replies,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add reply",
      error: error.message,
    });
  }
};

// Add or update reaction
exports.addReaction = async (req, res) => {
  try {
    const { contentId, lessonIndex } = req.params;
    
    // Add user info to reaction
    req.body.userId = req.user.id;
    req.body.userType = req.user.type === 'teacher' ? 'Teacher' : 
                       req.user.type === 'admin' ? 'Admin' : 'Student';
    
    const reactions = await topicContentService.addReaction(
      contentId,
      parseInt(lessonIndex),
      req.body
    );
    
    res.status(201).json({
      success: true,
      message: "Reaction added successfully",
      data: reactions,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add reaction",
      error: error.message,
    });
  }
};

// Get comments for a lesson
exports.getComments = async (req, res) => {
  try {
    const { contentId, lessonIndex } = req.params;
    const comments = await topicContentService.getComments(
      contentId,
      parseInt(lessonIndex)
    );
    
    res.status(200).json({
      success: true,
      message: "Comments retrieved successfully",
      data: comments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve comments",
      error: error.message,
    });
  }
};

// Get reactions for a lesson
exports.getReactions = async (req, res) => {
  try {
    const { contentId, lessonIndex } = req.params;
    const reactions = await topicContentService.getReactions(
      contentId,
      parseInt(lessonIndex)
    );
    
    res.status(200).json({
      success: true,
      message: "Reactions retrieved successfully",
      data: reactions,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve reactions",
      error: error.message,
    });
  }
};

// Move to trash
exports.moveToTrash = async (req, res) => {
  try {
    const trashedContent = await topicContentService.moveToTrash(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Topic content moved to trash successfully",
      data: trashedContent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to move topic content to trash",
      error: error.message,
    });
  }
};

// Restore from trash
exports.restoreFromTrash = async (req, res) => {
  try {
    const restoredContent = await topicContentService.restoreFromTrash(
      req.params.id
    );
    
    res.status(200).json({
      success: true,
      message: "Topic content restored successfully",
      data: restoredContent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to restore topic content",
      error: error.message,
    });
  }
};

// Get all trashed contents
exports.getTrashedContents = async (req, res) => {
  try {
    const trashedContents = await topicContentService.getTrashedContents();
    
    res.status(200).json({
      success: true,
      message: "Trashed contents retrieved successfully",
      data: trashedContents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve trashed contents",
      error: error.message,
    });
  }
};

// Delete permanently
exports.deletePermanently = async (req, res) => {
  try {
    await topicContentService.deletePermanently(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Topic content permanently deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to permanently delete topic content",
      error: error.message,
    });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const { contentId, lessonIndex, commentIndex } = req.params;
    const updatedComments = await topicContentService.deleteComment(
      contentId,
      parseInt(lessonIndex),
      parseInt(commentIndex)
    );
    
    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      data: updatedComments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete comment",
      error: error.message,
    });
  }
};

// Delete reaction
exports.deleteReaction = async (req, res) => {
  try {
    const { contentId, lessonIndex, reactionIndex } = req.params;
    const updatedReactions = await topicContentService.deleteReaction(
      contentId,
      parseInt(lessonIndex),
      parseInt(reactionIndex)
    );
    
    res.status(200).json({
      success: true,
      message: "Reaction deleted successfully",
      data: updatedReactions,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete reaction",
      error: error.message,
    });
  }
};

// Get lesson info
exports.getLessonInfo = async (req, res) => {
  try {
    const { contentId, lessonId } = req.params;
    
    const lesson = await topicContentService.getLessonInfo(contentId, lessonId);
    
    res.status(200).json({
      success: true,
      message: "Lesson info retrieved successfully",
      data: lesson,
    });
  } catch (error) {
    const notFound = /Topic content not found|Lesson not found/i.test(
      error.message
    );
    res.status(notFound ? 404 : 400).json({
      success: false,
      message: "Failed to retrieve lesson info",
      error: error.message,
    });
  }
};

// Get all topic contents with lean lessons
exports.getAllTopicContentsLeanLessons = async (req, res) => {
  try {
    const data = await topicContentService.getAllTopicContentsLeanLessons();
    res.status(200).json({
      success: true,
      data: data
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message || "Server error" 
    });
  }
};

// Get topic contents by topic ID with lean lessons
exports.getTopicContentsByTopicIdLeanLessons = async (req, res) => {
  try {
    const { topicId } = req.params;
    const data = await topicContentService.getTopicContentsByTopicIdLeanLessons(
      topicId
    );
    
    res.status(200).json({
      success: true,
      data: data
    });
  } catch (err) {
    const msg = err.message || "Server error";
    const code = /No content found/.test(msg) ? 404 : 500;
    res.status(code).json({ 
      success: false,
      message: msg 
    });
  }
};

// Get topic content by ID with lean lessons
exports.getTopicContentLeanLessonsById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await topicContentService.getTopicContentLeanLessonsById(id);
    
    res.status(200).json({
      success: true,
      data: doc
    });
  } catch (err) {
    const msg = err.message || "Server error";
    if (msg === "Invalid topic content ID") {
      return res.status(400).json({ 
        success: false,
        message: msg 
      });
    }
    if (msg === "Topic content not found") {
      return res.status(404).json({ 
        success: false,
        message: msg 
      });
    }
    return res.status(500).json({ 
      success: false,
      message: msg 
    });
  }
};

// Update lesson content
exports.updateLessonContent = async (req, res) => {
  try {
    const { contentId, lessonId } = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body cannot be empty. Allowed fields: text, audio, video, subHeading",
      });
    }

    const updatedLesson = await topicContentService.updateLessonContent(
      contentId,
      lessonId,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Lesson updated successfully",
      data: updatedLesson
    });
  } catch (err) {
    const msg = err?.message || "Server error";
    const status = mapServiceErrorToHttpStatus(msg);
    return res.status(status).json({
      success: false,
      message: msg
    });
  }
};

// Helper function for error mapping
function mapServiceErrorToHttpStatus(message) {
  switch (message) {
    case "Invalid id":
    case "Provide either `order:[ids...]` or `{from,to}`":
    case "from/to out of bounds":
    case "Order does not match existing lessons":
    case "Order does not match existing subHeadings":
      return 400;
    case "Topic content not found":
    case "Lesson not found":
      return 404;
    case "Topic content is deleted":
      return 409;
    default:
      return 500;
  }
}

// Reorder lessons
exports.reorderLessons = async (req, res) => {
  try {
    const { id } = req.params;
    const { order } = req.body;

    const result = await topicContentService.reorderLessons(id, order);
    
    res.status(200).json({
      success: true,
      message: "Lessons reordered successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message || "Failed to reorder lessons",
    });
  }
};

// Add lesson info
exports.addLessonInfo = async (req, res) => {
  try {
    const topicContentId = req.params.id;

    const lessonPayload = {
      text: req.body?.text,
      subHeading: req.body?.subHeading,
      audio: req.body?.audio,
      video: req.body?.video,
    };

    const { topicContent, lesson } = await topicContentService.addLessonInfo(
      topicContentId,
      lessonPayload
    );

    return res.status(201).json({
      success: true,
      message: "Lesson added successfully",
      data: { topicContent, lesson }
    });
  } catch (err) {
    if (err?.name === "CastError") {
      return res.status(400).json({ 
        success: false,
        error: "Invalid id format" 
      });
    }
    return res.status(400).json({ 
      success: false,
      error: err.message || "Failed to add lesson" 
    });
  }
};

// Delete lesson info
exports.deleteLessonInfo = async (req, res) => {
  try {
    const { id: topicContentId, lessonId } = req.params;

    const result = await topicContentService.deleteLessonInfo(topicContentId, lessonId);

    return res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
      data: {
        deletedLesson: result.deletedLesson,
        topicContent: result.topicContent,
      }
    });
  } catch (err) {
    if (err?.name === "CastError") {
      return res.status(400).json({ 
        success: false,
        error: "Invalid id format" 
      });
    }
    return res.status(400).json({ 
      success: false,
      error: err.message || "Failed to delete lesson" 
    });
  }
};

// Increment purchase count
exports.incrementPurchaseCount = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required"
      });
    }

    const content = await topicContentService.incrementPurchaseCount(id, amount);
    
    res.status(200).json({
      success: true,
      message: "Purchase recorded successfully",
      data: content
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to record purchase",
      error: error.message
    });
  }
};

// Add missing functions for router compatibility
exports.getAll = exports.getAllTopicContents;
exports.getById = exports.getTopicContentById;
exports.create = exports.createTopicContent || exports.createTopiicContent; // Handle typo
exports.update = exports.updateTopicContent || exports.uTpdateTopicContent; // Handle typo
exports.delete = exports.deleteTopicContent || exports.deleteTopicCnontent; // Handle typo

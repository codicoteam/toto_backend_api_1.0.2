const TopicContent = require("../models/topic_content_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await TopicContent.find({ isActive: true })
      .populate('topicId', 'title')
      .sort({ order: 1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch topic contents: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await TopicContent.findById(id)
      .populate('topicId');
    if (!item) throw new Error("Topic content not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch topic content: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new TopicContent(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create topic content: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await TopicContent.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Topic content not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update topic content: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await TopicContent.findByIdAndDelete(id);
    if (!item) throw new Error("Topic content not found");
    return { message: "Topic content deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete topic content: " + error.message);
  }
};

// Get content by topic ID
exports.getByTopicId = async (topicId) => {
  try {
    const items = await TopicContent.find({ topicId, isActive: true })
      .sort({ order: 1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch content by topic: " + error.message);
  }
};

// Get lean content by topic ID (for listings)
exports.getLeanByTopicId = async (topicId) => {
  try {
    const items = await TopicContent.find({ topicId, isActive: true })
      .select('title description contentType order duration isPublished')
      .sort({ order: 1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch lean content by topic: " + error.message);
  }
};

// Add lesson to content
exports.addLesson = async (contentId, lessonData) => {
  try {
    const content = await TopicContent.findById(contentId);
    if (!content) throw new Error("Content not found");
    
    if (!content.lesson) content.lesson = [];
    
    // Set order
    lessonData.order = content.lesson.length;
    
    content.lesson.push(lessonData);
    await content.save();
    
    return content;
  } catch (error) {
    throw new Error("Failed to add lesson: " + error.message);
  }
};

// Update lesson
exports.updateLesson = async (contentId, lessonId, lessonData) => {
  try {
    const content = await TopicContent.findById(contentId);
    if (!content) throw new Error("Content not found");
    
    const lesson = content.lesson.id(lessonId);
    if (!lesson) throw new Error("Lesson not found");
    
    Object.assign(lesson, lessonData);
    await content.save();
    
    return content;
  } catch (error) {
    throw new Error("Failed to update lesson: " + error.message);
  }
};

// Delete lesson
exports.deleteLesson = async (contentId, lessonId) => {
  try {
    const content = await TopicContent.findById(contentId);
    if (!content) throw new Error("Content not found");
    
    content.lesson = content.lesson.filter(l => l._id.toString() !== lessonId);
    
    // Reorder remaining lessons
    content.lesson.forEach((lesson, index) => {
      lesson.order = index;
    });
    
    await content.save();
    
    return content;
  } catch (error) {
    throw new Error("Failed to delete lesson: " + error.message);
  }
};

// Reorder lessons
exports.reorderLessons = async (contentId, orderArray) => {
  try {
    const content = await TopicContent.findById(contentId);
    if (!content) throw new Error("Content not found");
    
    // Create a map of lessons by ID
    const lessonMap = {};
    content.lesson.forEach(lesson => {
      lessonMap[lesson._id.toString()] = lesson;
    });
    
    // Reorder based on orderArray
    content.lesson = orderArray.map((lessonId, index) => {
      const lesson = lessonMap[lessonId];
      if (lesson) {
        lesson.order = index;
        return lesson;
      }
      return null;
    }).filter(l => l !== null);
    
    await content.save();
    
    return content;
  } catch (error) {
    throw new Error("Failed to reorder lessons: " + error.message);
  }
};

// Get lesson info
exports.getLessonInfo = async (contentId, lessonId) => {
  try {
    const content = await TopicContent.findById(contentId);
    if (!content) throw new Error("Content not found");
    
    const lesson = content.lesson.id(lessonId);
    if (!lesson) throw new Error("Lesson not found");
    
    return {
      contentId: content._id,
      contentTitle: content.title,
      lesson: lesson
    };
  } catch (error) {
    throw new Error("Failed to get lesson info: " + error.message);
  }
};

// Publish/unpublish content
exports.publishContent = async (id, publish = true) => {
  try {
    const item = await TopicContent.findByIdAndUpdate(
      id,
      { isPublished: publish },
      { new: true }
    );
    if (!item) throw new Error("Topic content not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update publish status: " + error.message);
  }
};

// Get content by type
exports.getByContentType = async (contentType) => {
  try {
    const items = await TopicContent.find({ contentType, isActive: true })
      .populate('topicId', 'title')
      .sort({ createdAt: -1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch content by type: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllContents = exports.getAll;
exports.getContentById = exports.getById;
exports.createContent = exports.create;
exports.updateContent = exports.update;
exports.deleteContent = exports.delete;

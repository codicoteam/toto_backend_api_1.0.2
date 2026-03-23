const TopicInSubject = require("../models/topic_in_subject_model.js");
const mongoose = require('mongoose');

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await TopicInSubject.find({ isActive: true })
      .populate('subject', 'name')
      .sort({ order: 1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch topics: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await TopicInSubject.findById(id)
      .populate('subject');
    if (!item) throw new Error("Topic not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch topic: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    // Check if topic with same title already exists in subject
    const existing = await TopicInSubject.findOne({
      title: data.title,
      subject: data.subject
    });
    
    if (existing) {
      throw new Error("Topic with this title already exists in the subject");
    }
    
    const item = new TopicInSubject(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create topic: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await TopicInSubject.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Topic not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update topic: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await TopicInSubject.findByIdAndDelete(id);
    if (!item) throw new Error("Topic not found");
    return { message: "Topic deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete topic: " + error.message);
  }
};

// Get topics by subject ID
exports.getBySubjectId = async (subjectId) => {
  try {
    const items = await TopicInSubject.find({ 
      subject: subjectId, 
      isActive: true,
      showTopic: true 
    })
    .sort({ order: 1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch topics by subject: " + error.message);
  }
};

// Toggle topic visibility
exports.toggleVisibility = async (id, showTopic) => {
  try {
    const item = await TopicInSubject.findByIdAndUpdate(
      id,
      { showTopic },
      { new: true }
    );
    if (!item) throw new Error("Topic not found");
    return item;
  } catch (error) {
    throw new Error("Failed to toggle visibility: " + error.message);
  }
};

// Update topic order
exports.updateOrder = async (id, order) => {
  try {
    const item = await TopicInSubject.findByIdAndUpdate(
      id,
      { order },
      { new: true }
    );
    if (!item) throw new Error("Topic not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update order: " + error.message);
  }
};

// Get topics by subscription period
exports.getBySubscriptionPeriod = async (period) => {
  try {
    const items = await TopicInSubject.find({ 
      subscriptionPeriod: period,
      isActive: true,
      showTopic: true 
    })
    .populate('subject', 'name')
    .sort({ order: 1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch topics by period: " + error.message);
  }
};

// Update lesson counts (called when lessons are added/removed)
exports.updateLessonStats = async (id, lessonCount, duration) => {
  try {
    const item = await TopicInSubject.findByIdAndUpdate(
      id,
      { 
        totalLessons: lessonCount,
        totalDuration: duration 
      },
      { new: true }
    );
    if (!item) throw new Error("Topic not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update lesson stats: " + error.message);
  }
};

// Get topic with pricing info
exports.getWithPricing = async (id) => {
  try {
    const item = await TopicInSubject.findById(id)
      .populate('subject');
    if (!item) throw new Error("Topic not found");
    
    return {
      _id: item._id,
      title: item.title,
      description: item.description,
      subject: item.subject,
      price: item.price,
      regularPrice: item.regularPrice,
      subscriptionPeriod: item.subscriptionPeriod,
      discount: item.regularPrice ? ((item.regularPrice - item.price) / item.regularPrice * 100).toFixed(0) : 0
    };
  } catch (error) {
    throw new Error("Failed to fetch topic with pricing: " + error.message);
  }
};

// Bulk update topic order
exports.bulkUpdateOrder = async (updates) => {
  try {
    const operations = updates.map(({ id, order }) => ({
      updateOne: {
        filter: { _id: id },
        update: { order }
      }
    }));
    
    await TopicInSubject.bulkWrite(operations);
    return { success: true, message: "Order updated successfully" };
  } catch (error) {
    throw new Error("Failed to bulk update order: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllTopics = exports.getAll;
exports.getTopicById = exports.getById;
exports.createTopic = exports.create;
exports.updateTopic = exports.update;
exports.deleteTopic = exports.delete;

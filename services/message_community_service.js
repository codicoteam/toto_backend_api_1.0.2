const MessageCommunity = require("../models/message_community_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await MessageCommunity.find({ isDeleted: false })
      .sort({ createdAt: -1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch messages: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await MessageCommunity.findById(id);
    if (!item || item.isDeleted) throw new Error("Message not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch message: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new MessageCommunity(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create message: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await MessageCommunity.findByIdAndUpdate(
      id, 
      { ...data, isEdited: true }, 
      { new: true }
    );
    if (!item) throw new Error("Message not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update message: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await MessageCommunity.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!item) throw new Error("Message not found");
    return { message: "Message deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete message: " + error.message);
  }
};

// Get messages by community ID
exports.getByCommunityId = async (communityId) => {
  try {
    const items = await MessageCommunity.find({ 
      communityId, 
      isDeleted: false 
    }).sort({ createdAt: -1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch messages by community: " + error.message);
  }
};

// Get messages by sender ID
exports.getBySenderId = async (senderId) => {
  try {
    const items = await MessageCommunity.find({ 
      senderId, 
      isDeleted: false 
    }).sort({ createdAt: -1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch messages by sender: " + error.message);
  }
};

// Mark message as read
exports.markAsRead = async (messageId, userId, userType) => {
  try {
    const message = await MessageCommunity.findById(messageId);
    if (!message) throw new Error("Message not found");
    
    // Check if already read
    const alreadyRead = message.readBy.some(r => r.userId.toString() === userId);
    
    if (!alreadyRead) {
      message.readBy.push({ userId, userType, readAt: new Date() });
      await message.save();
    }
    
    return message;
  } catch (error) {
    throw new Error("Failed to mark message as read: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllMessages = exports.getAll;
exports.getMessageById = exports.getById;
exports.createMessage = exports.create;
exports.updateMessage = exports.update;
exports.deleteMessage = exports.delete;

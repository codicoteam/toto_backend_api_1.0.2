const TeacherStudentChat = require("../models/teacher_student_chat_model.js");
const mongoose = require('mongoose');

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await TeacherStudentChat.find({ isDeleted: false })
      .sort({ createdAt: -1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch messages: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await TeacherStudentChat.findById(id);
    if (!item || item.isDeleted) throw new Error("Message not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch message: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new TeacherStudentChat(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to send message: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await TeacherStudentChat.findByIdAndUpdate(
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
    const item = await TeacherStudentChat.findByIdAndUpdate(
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

// Get conversation between two users
exports.getConversation = async (userId1, userId2) => {
  try {
    const items = await TeacherStudentChat.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 }
      ],
      isDeleted: false
    })
    .sort({ createdAt: 1 })
    .populate({
      path: 'senderId',
      select: 'firstName lastName email profilePicture'
    })
    .populate({
      path: 'receiverId',
      select: 'firstName lastName email profilePicture'
    });
    
    // Filter out messages where sender or receiver doesn't exist
    const validItems = items.filter(msg => msg.senderId && msg.receiverId);
    
    return validItems;
  } catch (error) {
    throw new Error("Failed to fetch conversation: " + error.message);
  }
};

// Get all chats for a user (grouped by other user)
exports.getUserChats = async (userId) => {
  try {
    // Get all messages where user is sender or receiver
    const messages = await TeacherStudentChat.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ],
      isDeleted: false
    })
    .sort({ createdAt: -1 })
    .populate({
      path: 'senderId',
      select: 'firstName lastName email profilePicture'
    })
    .populate({
      path: 'receiverId',
      select: 'firstName lastName email profilePicture'
    });

    // Group by conversation partner
    const conversations = {};
    
    messages.forEach(msg => {
      // Skip if sender or receiver is null (user deleted)
      if (!msg.senderId || !msg.receiverId) return;
      
      const otherUserId = msg.senderId._id.toString() === userId.toString() 
        ? msg.receiverId._id.toString() 
        : msg.senderId._id.toString();
      
      const otherUser = msg.senderId._id.toString() === userId.toString() 
        ? msg.receiverId 
        : msg.senderId;
      
      // Skip if other user is null
      if (!otherUser) return;
      
      if (!conversations[otherUserId]) {
        conversations[otherUserId] = {
          user: {
            _id: otherUser._id,
            firstName: otherUser.firstName || 'Deleted',
            lastName: otherUser.lastName || 'User',
            email: otherUser.email || '',
            profilePicture: otherUser.profilePicture || null
          },
          lastMessage: {
            _id: msg._id,
            message: msg.message,
            createdAt: msg.createdAt,
            isRead: msg.isRead,
            senderId: msg.senderId._id
          },
          unreadCount: 0
        };
      }
      
      // Count unread messages
      if (msg.receiverId._id.toString() === userId.toString() && !msg.isRead) {
        conversations[otherUserId].unreadCount++;
      }
    });

    return Object.values(conversations);
  } catch (error) {
    throw new Error("Failed to fetch user chats: " + error.message);
  }
};

// Mark messages as read
exports.markAsRead = async (userId, otherUserId) => {
  try {
    await TeacherStudentChat.updateMany(
      {
        senderId: otherUserId,
        receiverId: userId,
        isRead: false
      },
      {
        isRead: true,
        readAt: new Date()
      }
    );
    
    return { success: true, message: "Messages marked as read" };
  } catch (error) {
    throw new Error("Failed to mark messages as read: " + error.message);
  }
};

// Get unread count for a user
exports.getUnreadCount = async (userId) => {
  try {
    const count = await TeacherStudentChat.countDocuments({
      receiverId: userId,
      isRead: false,
      isDeleted: false
    });
    
    return { unreadCount: count };
  } catch (error) {
    throw new Error("Failed to get unread count: " + error.message);
  }
};

// Delete message for specific user (soft delete)
exports.deleteForUser = async (messageId, userId, userType) => {
  try {
    const message = await TeacherStudentChat.findById(messageId);
    if (!message) throw new Error("Message not found");
    
    // Add user to deletedFor array
    if (!message.deletedFor) {
      message.deletedFor = [];
    }
    
    message.deletedFor.push({ userId, userType });
    await message.save();
    
    return { message: "Message deleted for user" };
  } catch (error) {
    throw new Error("Failed to delete message for user: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllMessages = exports.getAll;
exports.getMessageById = exports.getById;
exports.createMessage = exports.create;
exports.updateMessage = exports.update;
exports.deleteMessage = exports.delete;

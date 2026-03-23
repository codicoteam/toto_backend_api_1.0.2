const chatService = require("../services/teacher_student_chat_service");

// Basic CRUD
exports.getAll = async (req, res) => {
  try {
    const data = await chatService.getAll();
    res.status(200).json({ success: true, message: "Messages retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await chatService.getById(req.params.id);
    res.status(200).json({ success: true, message: "Message retrieved", data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await chatService.create(req.body);
    res.status(201).json({ success: true, message: "Message sent", data }); 
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await chatService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Message updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await chatService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Message deleted" });    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Additional methods
exports.createMessage = exports.create;
exports.deleteMessage = exports.delete;

exports.getConversation = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const data = await chatService.getConversation(userId1, userId2);       
    res.status(200).json({ success: true, message: "Conversation retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserChats = async (req, res) => {
  try {
    const data = await chatService.getUserChats(req.params.userId);
    res.status(200).json({ success: true, message: "User chats retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { userId, otherUserId } = req.body;
    const data = await chatService.markAsRead(userId, otherUserId);
    res.status(200).json({ success: true, message: "Messages marked as read", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const data = await chatService.getUnreadCount(req.params.userId);
    res.status(200).json({ success: true, message: "Unread count retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteForUser = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { userId, userType } = req.body;
    const data = await chatService.deleteForUser(messageId, userId, userType);
    res.status(200).json({ success: true, message: "Message deleted for user", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

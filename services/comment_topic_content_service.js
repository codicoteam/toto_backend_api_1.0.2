const CommentTopicContent = require('../models/comment_topic_content_model');

// Get all comment topic content records
exports.getAll = async (filters = {}) => {
    try {
        const data = await CommentTopicContent.find(filters);
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve comment topic content records: ${error.message}`);
    }
};

// Get comment topic content by ID
exports.getById = async (id) => {
    try {
        const data = await CommentTopicContent.findById(id);
        if (!data) {
            throw new Error('Comment topic content not found');
        }
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve comment topic content: ${error.message}`);
    }
};

// Create new comment topic content
exports.create = async (data) => {
    try {
        const newCommentTopicContent = new CommentTopicContent(data);
        const savedData = await newCommentTopicContent.save();
        return savedData;
    } catch (error) {
        throw new Error(`Failed to create comment topic content: ${error.message}`);
    }
};

// Update comment topic content
exports.update = async (id, updateData) => {
    try {
        const updatedData = await CommentTopicContent.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedData) {
            throw new Error('Comment topic content not found');
        }
        return updatedData;
    } catch (error) {
        throw new Error(`Failed to update comment topic content: ${error.message}`);
    }
};

// Delete comment topic content
exports.delete = async (id) => {
    try {
        const deletedData = await CommentTopicContent.findByIdAndDelete(id);
        if (!deletedData) {
            throw new Error('Comment topic content not found');
        }
        return deletedData;
    } catch (error) {
        throw new Error(`Failed to delete comment topic content: ${error.message}`);
    }
};

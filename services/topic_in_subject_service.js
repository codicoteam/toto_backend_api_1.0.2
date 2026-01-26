const Topic_in_subject = require('../models/topic_in_subject_model');

// Get all topic_in_subject records
exports.getAll = async (filters = {}) => {
    try {
        const data = await Topic_in_subject.find(filters);
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve topic_in_subject records: ${error.message}`);
    }
};

// Get topic_in_subject by ID
exports.getById = async (id) => {
    try {
        const data = await Topic_in_subject.findById(id);
        if (!data) {
            throw new Error('Topic_in_subject not found');
        }
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve topic_in_subject: ${error.message}`);
    }
};

// Create new topic_in_subject
exports.create = async (data) => {
    try {
        const newData = new Topic_in_subject(data);
        const savedData = await newData.save();
        return savedData;
    } catch (error) {
        throw new Error(`Failed to create topic_in_subject: ${error.message}`);
    }
};

// Update topic_in_subject
exports.update = async (id, updateData) => {
    try {
        const updatedData = await Topic_in_subject.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedData) {
            throw new Error('Topic_in_subject not found');
        }
        return updatedData;
    } catch (error) {
        throw new Error(`Failed to update topic_in_subject: ${error.message}`);
    }
};

// Delete topic_in_subject
exports.delete = async (id) => {
    try {
        const deletedData = await Topic_in_subject.findByIdAndDelete(id);
        if (!deletedData) {
            throw new Error('Topic_in_subject not found');
        }
        return deletedData;
    } catch (error) {
        throw new Error(`Failed to delete topic_in_subject: ${error.message}`);
    }
};

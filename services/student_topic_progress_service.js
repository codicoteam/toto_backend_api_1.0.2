const Student_topic_progress = require('../models/student_topic_progress_model');

// Get all student_topic_progress records
exports.getAll = async (filters = {}) => {
    try {
        const data = await Student_topic_progress.find(filters);
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve student_topic_progress records: ${error.message}`);
    }
};

// Get student_topic_progress by ID
exports.getById = async (id) => {
    try {
        const data = await Student_topic_progress.findById(id);
        if (!data) {
            throw new Error('Student_topic_progress not found');
        }
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve student_topic_progress: ${error.message}`);
    }
};

// Create new student_topic_progress
exports.create = async (data) => {
    try {
        const newData = new Student_topic_progress(data);
        const savedData = await newData.save();
        return savedData;
    } catch (error) {
        throw new Error(`Failed to create student_topic_progress: ${error.message}`);
    }
};

// Update student_topic_progress
exports.update = async (id, updateData) => {
    try {
        const updatedData = await Student_topic_progress.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedData) {
            throw new Error('Student_topic_progress not found');
        }
        return updatedData;
    } catch (error) {
        throw new Error(`Failed to update student_topic_progress: ${error.message}`);
    }
};

// Delete student_topic_progress
exports.delete = async (id) => {
    try {
        const deletedData = await Student_topic_progress.findByIdAndDelete(id);
        if (!deletedData) {
            throw new Error('Student_topic_progress not found');
        }
        return deletedData;
    } catch (error) {
        throw new Error(`Failed to delete student_topic_progress: ${error.message}`);
    }
};

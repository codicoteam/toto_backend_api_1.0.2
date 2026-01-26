const Exam = require('../models/exam_model');

// Get all exam records
exports.getAll = async (filters = {}) => {
    try {
        const data = await Exam.find(filters);
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve exam records: ${error.message}`);
    }
};

// Get exam by ID
exports.getById = async (id) => {
    try {
        const data = await Exam.findById(id);
        if (!data) {
            throw new Error('Exam not found');
        }
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve exam: ${error.message}`);
    }
};

// Create new exam
exports.create = async (data) => {
    try {
        const newData = new Exam(data);
        const savedData = await newData.save();
        return savedData;
    } catch (error) {
        throw new Error(`Failed to create exam: ${error.message}`);
    }
};

// Update exam
exports.update = async (id, updateData) => {
    try {
        const updatedData = await Exam.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedData) {
            throw new Error('Exam not found');
        }
        return updatedData;
    } catch (error) {
        throw new Error(`Failed to update exam: ${error.message}`);
    }
};

// Delete exam
exports.delete = async (id) => {
    try {
        const deletedData = await Exam.findByIdAndDelete(id);
        if (!deletedData) {
            throw new Error('Exam not found');
        }
        return deletedData;
    } catch (error) {
        throw new Error(`Failed to delete exam: ${error.message}`);
    }
};

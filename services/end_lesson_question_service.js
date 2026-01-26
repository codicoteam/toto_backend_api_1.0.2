const End_lesson_question = require('../models/end_lesson_question');

// Service to create a new end_lesson_question
const createEnd_lesson_question = async (data) => {
    try {
        // Check if unique field already exists (e.g., email)
        if (data.email) {
            const existing = await End_lesson_question.findOne({ email: data.email });
            if (existing) {
                throw new Error('Email already exists');
            }
        }
        
        const newEnd_lesson_question = new End_lesson_question(data);
        await newEnd_lesson_question.save();
        return newEnd_lesson_question;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get all end_lesson_questions
const getAllEnd_lesson_questions = async () => {
    try {
        return await End_lesson_question.find();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get end_lesson_question by ID
const getEnd_lesson_questionById = async (id) => {
    try {
        const data = await End_lesson_question.findById(id);
        if (!data) {
            throw new Error('End_lesson_question not found');
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to update a end_lesson_question
const updateEnd_lesson_question = async (id, updateData) => {
    try {
        const updatedData = await End_lesson_question.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedData) {
            throw new Error('End_lesson_question not found');
        }
        return updatedData;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to delete a end_lesson_question
const deleteEnd_lesson_question = async (id) => {
    try {
        const deletedData = await End_lesson_question.findByIdAndDelete(id);
        if (!deletedData) {
            throw new Error('End_lesson_question not found');
        }
        return deletedData;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Basic CRUD functions for generic controllers
const getAll = async () => {
    return getAllEnd_lesson_questions();
};

const getById = async (id) => {
    return getEnd_lesson_questionById(id);
};

const create = async (data) => {
    return createEnd_lesson_question(data);
};

const update = async (id, data) => {
    return updateEnd_lesson_question(id, data);
};

const deleteById = async (id) => {
    return deleteEnd_lesson_question(id);
};

module.exports = {
    createEnd_lesson_question,
    getAllEnd_lesson_questions,
    getEnd_lesson_questionById,
    updateEnd_lesson_question,
    deleteEnd_lesson_question,
    // Basic CRUD exports
    getAll,
    getById,
    create,
    update,
    delete: deleteById
};

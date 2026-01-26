const Library_book = require('../models/library_book_model');

// Get all library_book records
exports.getAll = async (filters = {}) => {
    try {
        const data = await Library_book.find(filters);
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve library_book records: ${error.message}`);
    }
};

// Get library_book by ID
exports.getById = async (id) => {
    try {
        const data = await Library_book.findById(id);
        if (!data) {
            throw new Error('Library_book not found');
        }
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve library_book: ${error.message}`);
    }
};

// Create new library_book
exports.create = async (data) => {
    try {
        const newData = new Library_book(data);
        const savedData = await newData.save();
        return savedData;
    } catch (error) {
        throw new Error(`Failed to create library_book: ${error.message}`);
    }
};

// Update library_book
exports.update = async (id, updateData) => {
    try {
        const updatedData = await Library_book.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedData) {
            throw new Error('Library_book not found');
        }
        return updatedData;
    } catch (error) {
        throw new Error(`Failed to update library_book: ${error.message}`);
    }
};

// Delete library_book
exports.delete = async (id) => {
    try {
        const deletedData = await Library_book.findByIdAndDelete(id);
        if (!deletedData) {
            throw new Error('Library_book not found');
        }
        return deletedData;
    } catch (error) {
        throw new Error(`Failed to delete library_book: ${error.message}`);
    }
};

const Home_banner = require('../models/home_banner_model');

// Get all home_banner records
exports.getAll = async (filters = {}) => {
    try {
        const data = await Home_banner.find(filters);
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve home_banner records: ${error.message}`);
    }
};

// Get home_banner by ID
exports.getById = async (id) => {
    try {
        const data = await Home_banner.findById(id);
        if (!data) {
            throw new Error('Home_banner not found');
        }
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve home_banner: ${error.message}`);
    }
};

// Create new home_banner
exports.create = async (data) => {
    try {
        const newData = new Home_banner(data);
        const savedData = await newData.save();
        return savedData;
    } catch (error) {
        throw new Error(`Failed to create home_banner: ${error.message}`);
    }
};

// Update home_banner
exports.update = async (id, updateData) => {
    try {
        const updatedData = await Home_banner.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedData) {
            throw new Error('Home_banner not found');
        }
        return updatedData;
    } catch (error) {
        throw new Error(`Failed to update home_banner: ${error.message}`);
    }
};

// Delete home_banner
exports.delete = async (id) => {
    try {
        const deletedData = await Home_banner.findByIdAndDelete(id);
        if (!deletedData) {
            throw new Error('Home_banner not found');
        }
        return deletedData;
    } catch (error) {
        throw new Error(`Failed to delete home_banner: ${error.message}`);
    }
};

const Community = require('../models/community_model');

// Get all community records
exports.getAll = async (filters = {}) => {
    try {
        const data = await Community.find(filters);
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve community records: ${error.message}`);
    }
};

// Get community by ID
exports.getById = async (id) => {
    try {
        const data = await Community.findById(id);
        if (!data) {
            throw new Error('Community not found');
        }
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve community: ${error.message}`);
    }
};

// Create new community
exports.create = async (data) => {
    try {
        const newData = new Community(data);
        const savedData = await newData.save();
        return savedData;
    } catch (error) {
        throw new Error(`Failed to create community: ${error.message}`);
    }
};

// Update community
exports.update = async (id, updateData) => {
    try {
        const updatedData = await Community.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedData) {
            throw new Error('Community not found');
        }
        return updatedData;
    } catch (error) {
        throw new Error(`Failed to update community: ${error.message}`);
    }
};

// Delete community
exports.delete = async (id) => {
    try {
        const deletedData = await Community.findByIdAndDelete(id);
        if (!deletedData) {
            throw new Error('Community not found');
        }
        return deletedData;
    } catch (error) {
        throw new Error(`Failed to delete community: ${error.message}`);
    }
};

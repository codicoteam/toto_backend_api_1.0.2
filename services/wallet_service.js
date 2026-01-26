const Wallet = require('../models/wallet_model');

// Get all wallet records
exports.getAll = async (filters = {}) => {
    try {
        const data = await Wallet.find(filters);
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve wallet records: ${error.message}`);
    }
};

// Get wallet by ID
exports.getById = async (id) => {
    try {
        const data = await Wallet.findById(id);
        if (!data) {
            throw new Error('Wallet not found');
        }
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve wallet: ${error.message}`);
    }
};

// Create new wallet
exports.create = async (data) => {
    try {
        const newData = new Wallet(data);
        const savedData = await newData.save();
        return savedData;
    } catch (error) {
        throw new Error(`Failed to create wallet: ${error.message}`);
    }
};

// Update wallet
exports.update = async (id, updateData) => {
    try {
        const updatedData = await Wallet.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedData) {
            throw new Error('Wallet not found');
        }
        return updatedData;
    } catch (error) {
        throw new Error(`Failed to update wallet: ${error.message}`);
    }
};

// Delete wallet
exports.delete = async (id) => {
    try {
        const deletedData = await Wallet.findByIdAndDelete(id);
        if (!deletedData) {
            throw new Error('Wallet not found');
        }
        return deletedData;
    } catch (error) {
        throw new Error(`Failed to delete wallet: ${error.message}`);
    }
};

const Payment = require('../models/payment_model');

// Get all payment records
exports.getAll = async (filters = {}) => {
    try {
        const data = await Payment.find(filters);
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve payment records: ${error.message}`);
    }
};

// Get payment by ID
exports.getById = async (id) => {
    try {
        const data = await Payment.findById(id);
        if (!data) {
            throw new Error('Payment not found');
        }
        return data;
    } catch (error) {
        throw new Error(`Failed to retrieve payment: ${error.message}`);
    }
};

// Create new payment
exports.create = async (data) => {
    try {
        const newData = new Payment(data);
        const savedData = await newData.save();
        return savedData;
    } catch (error) {
        throw new Error(`Failed to create payment: ${error.message}`);
    }
};

// Update payment
exports.update = async (id, updateData) => {
    try {
        const updatedData = await Payment.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedData) {
            throw new Error('Payment not found');
        }
        return updatedData;
    } catch (error) {
        throw new Error(`Failed to update payment: ${error.message}`);
    }
};

// Delete payment
exports.delete = async (id) => {
    try {
        const deletedData = await Payment.findByIdAndDelete(id);
        if (!deletedData) {
            throw new Error('Payment not found');
        }
        return deletedData;
    } catch (error) {
        throw new Error(`Failed to delete payment: ${error.message}`);
    }
};

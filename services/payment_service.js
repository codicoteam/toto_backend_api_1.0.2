const Payment = require("../models/payment_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Payment.find().sort({ createdAt: -1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch payments: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Payment.findById(id);
    if (!item) throw new Error("Payment not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch payment: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Payment(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create payment: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Payment.findByIdAndUpdate(id, data, { new: true });  
    if (!item) throw new Error("Payment not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update payment: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Payment.findByIdAndDelete(id);
    if (!item) throw new Error("Payment not found");
    return { message: "Payment deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete payment: " + error.message);
  }
};

// Create mobile payment (Ecocash/Paynow)
exports.createMobilePayment = async (paymentData) => {
  try {
    const { student_id, amount, customerPhoneNumber, description } = paymentData;
    
    // Generate transaction reference
    const reference = 'PAY-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    
    // Create payment record
    const payment = new Payment({
      student_id,
      amount,
      customerPhoneNumber,
      description,
      reference,
      status: 'pending',
      paymentMethod: 'ecocash'
    });
    
    await payment.save();
    
    // Here you would integrate with Ecocash/Paynow API
    // For now, we'll simulate a response
    return {
      success: true,
      message: "Payment initiated",
      data: {
        paymentId: payment._id,
        reference: payment.reference,
        amount: payment.amount,
        status: payment.status,
        pollUrl: `https://api.example.com/payments/status/${payment._id}`
      }
    };
  } catch (error) {
    throw new Error("Failed to create mobile payment: " + error.message);
  }
};

// Check payment status
exports.checkStatus = async (pollUrl) => {
  try {
    // Extract payment ID from pollUrl
    const paymentId = pollUrl.split('/').pop();
    const payment = await Payment.findById(paymentId);
    
    if (!payment) {
      throw new Error("Payment not found");
    }
    
    // Here you would check with payment gateway
    // For now, return current status
    return {
      paymentId: payment._id,
      status: payment.status,
      amount: payment.amount,
      reference: payment.reference
    };
  } catch (error) {
    throw new Error("Failed to check payment status: " + error.message);
  }
};

// Get payments by status
exports.getByStatus = async (status) => {
  try {
    const items = await Payment.find({ status }).sort({ createdAt: -1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch payments by status: " + error.message);
  }
};

// Get payments by student ID
exports.getByStudentId = async (studentId) => {
  try {
    const items = await Payment.find({ student_id: studentId }).sort({ createdAt: -1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch student payments: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllPayments = exports.getAll;
exports.getPaymentById = exports.getById;
exports.createPayment = exports.create;
exports.updatePayment = exports.update;
exports.deletePayment = exports.delete;

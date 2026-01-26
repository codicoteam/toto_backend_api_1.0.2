const paymentService = require("../services/payment_service.js");

// Initialize payment
exports.initializePayment = async (req, res) => {
  try {
    if (req.user.type !== 'student') {
      return res.status(403).json({
        success: false,
        message: "Only students can make payments",
      });
    }
    
    const { studentId } = req.params;
    const { amount, method, description } = req.body;
    
    // Check if user is the student
    if (req.user.id !== studentId) {
      return res.status(403).json({
        success: false,
        message: "You can only make payments for your own account",
      });
    }
    
    const payment = await paymentService.initializePayment(
      studentId,
      amount,
      method,
      description
    );
    
    res.status(200).json({
      success: true,
      message: "Payment initialized successfully",
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to initialize payment",
      error: error.message,
    });
  }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
  try {
    const { reference } = req.body;
    
    const payment = await paymentService.verifyPayment(reference);
    
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to verify payment",
      error: error.message,
    });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    
    // Check if user has permission
    if (req.user.type === 'student' && payment.student.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own payments",
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Payment retrieved successfully",
      data: payment,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Payment not found",
      error: error.message,
    });
  }
};

// Get student payments
exports.getStudentPayments = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { status, startDate, endDate } = req.query;
    
    // Check if user has permission
    if (req.user.type === 'student' && req.user.id !== studentId) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own payments",
      });
    }
    
    const payments = await paymentService.getStudentPayments(studentId, { status, startDate, endDate });
    
    res.status(200).json({
      success: true,
      message: "Payments retrieved successfully",
      data: payments,
      count: payments.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve payments",
      error: error.message,
    });
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    if (req.user.type !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Only admins can update payment status",
      });
    }
    
    const { id } = req.params;
    const { status } = req.body;
    
    const payment = await paymentService.updatePaymentStatus(id, status);
    
    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update payment status",
      error: error.message,
    });
  }
};

// Get payment statistics
exports.getPaymentStats = async (req, res) => {
  try {
    if (req.user.type !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Only admins can view payment statistics",
      });
    }
    
    const { startDate, endDate } = req.query;
    
    const stats = await paymentService.getPaymentStats(startDate, endDate);
    
    res.status(200).json({
      success: true,
      message: "Payment statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve payment statistics",
      error: error.message,
    });
  }
};

// Process refund
exports.processRefund = async (req, res) => {
  try {
    if (req.user.type !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Only admins can process refunds",
      });
    }
    
    const { id } = req.params;
    const { reason } = req.body;
    
    const refund = await paymentService.processRefund(id, reason);
    
    res.status(200).json({
      success: true,
      message: "Refund processed successfully",
      data: refund,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to process refund",
      error: error.message,
    });
  }
};

// Get teacher payments (content purchases)
exports.getTeacherPayments = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { startDate, endDate } = req.query;
    
    // Check if user has permission
    if (req.user.type === 'teacher' && req.user.id !== teacherId) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own payments",
      });
    }
    
    const payments = await paymentService.getTeacherPayments(teacherId, startDate, endDate);
    
    res.status(200).json({
      success: true,
      message: "Teacher payments retrieved successfully",
      data: payments,
      count: payments.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve teacher payments",
      error: error.message,
    });
  }
};

// Generate payment report
exports.generatePaymentReport = async (req, res) => {
  try {
    if (req.user.type !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Only admins can generate payment reports",
      });
    }
    
    const { startDate, endDate, format } = req.query;
    
    const report = await paymentService.generatePaymentReport(startDate, endDate, format);
    
    res.status(200).json({
      success: true,
      message: "Payment report generated successfully",
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate payment report",
      error: error.message,
    });
  }
};

// Check payment webhook
exports.paymentWebhook = async (req, res) => {
  try {
    const result = await paymentService.handleWebhook(req.body, req.headers);
    
    res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to process webhook",
      error: error.message,
    });
  }
};

// Add missing functions for router compatibility
exports.getAll = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get all payments endpoint",
    data: []
  });
};

exports.getById = async (req, res) => {
  try {
    const payment = await exports.getPaymentById(req.params.id);
    return payment;
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Payment not found",
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const payment = await exports.initializePayment(req.body);
    return payment;
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to create payment",
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Delete payment endpoint"
  });
};

exports.update = async (req, res) => {
  try {
    const payment = await exports.updatePaymentStatus(req.params.id, req.body);
    return payment;
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to update payment",
      error: error.message
    });
  }
};

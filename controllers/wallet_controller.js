const walletService = require("../services/wallet_service.js");

// Get wallet by student ID
exports.getWalletByStudentId = async (req, res) => {
  try {
    // Check if user is the student or admin/teacher with permission
    if (req.user.type === 'student' && req.user.id !== req.params.studentId) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own wallet",
      });
    }
    
    const wallet = await walletService.getWalletByStudentId(req.params.studentId);
    
    res.status(200).json({
      success: true,
      message: "Wallet retrieved successfully",
      data: wallet,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Wallet not found",
      error: error.message,
    });
  }
};

// Get teacher wallet
exports.getTeacherWallet = async (req, res) => {
  try {
    // Check if user is the teacher
    if (req.user.type === 'teacher' && req.user.id !== req.params.teacherId) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own wallet",
      });
    }
    
    const wallet = await walletService.getTeacherWallet(req.params.teacherId);
    
    res.status(200).json({
      success: true,
      message: "Teacher wallet retrieved successfully",
      data: wallet,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Teacher wallet not found",
      error: error.message,
    });
  }
};

// Deposit funds
exports.depositFunds = async (req, res) => {
  try {
    if (req.user.type !== 'student') {
      return res.status(403).json({
        success: false,
        message: "Only students can deposit funds",
      });
    }
    
    const { studentId } = req.params;
    const { amount, method, description } = req.body;
    
    const transaction = await walletService.depositFunds(
      studentId,
      amount,
      method,
      description
    );
    
    res.status(200).json({
      success: true,
      message: "Deposit initiated successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to initiate deposit",
      error: error.message,
    });
  }
};

// Withdraw funds
exports.withdrawFunds = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { amount, method, description } = req.body;
    
    // Check if user is the student
    if (req.user.type === 'student' && req.user.id !== studentId) {
      return res.status(403).json({
        success: false,
        message: "You can only withdraw from your own wallet",
      });
    }
    
    const transaction = await walletService.withdrawFunds(
      studentId,
      amount,
      method,
      description
    );
    
    res.status(200).json({
      success: true,
      message: "Withdrawal initiated successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to initiate withdrawal",
      error: error.message,
    });
  }
};

// Purchase content
exports.purchaseContent = async (req, res) => {
  try {
    if (req.user.type !== 'student') {
      return res.status(403).json({
        success: false,
        message: "Only students can purchase content",
      });
    }
    
    const { studentId } = req.params;
    const { contentId, contentType, amount } = req.body;
    
    // Check if user is the student
    if (req.user.id !== studentId) {
      return res.status(403).json({
        success: false,
        message: "You can only purchase with your own wallet",
      });
    }
    
    const transaction = await walletService.purchaseContent(
      studentId,
      contentId,
      contentType,
      amount
    );
    
    res.status(200).json({
      success: true,
      message: "Content purchased successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to purchase content",
      error: error.message,
    });
  }
};

// Get transaction history
exports.getTransactionHistory = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { type, startDate, endDate, limit } = req.query;
    
    // Check if user has permission
    if (req.user.type === 'student' && req.user.id !== studentId) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own transaction history",
      });
    }
    
    const filters = { type, startDate, endDate };
    const transactions = await walletService.getTransactionHistory(studentId, filters, limit);
    
    res.status(200).json({
      success: true,
      message: "Transaction history retrieved successfully",
      data: transactions,
      count: transactions.length,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve transaction history",
      error: error.message,
    });
  }
};

// Get teacher earnings
exports.getTeacherEarnings = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { startDate, endDate } = req.query;
    
    // Check if user is the teacher
    if (req.user.type === 'teacher' && req.user.id !== teacherId) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own earnings",
      });
    }
    
    const earnings = await walletService.getTeacherEarnings(teacherId, startDate, endDate);
    
    res.status(200).json({
      success: true,
      message: "Teacher earnings retrieved successfully",
      data: earnings,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve teacher earnings",
      error: error.message,
    });
  }
};

// Request payout
exports.requestPayout = async (req, res) => {
  try {
    if (req.user.type !== 'teacher') {
      return res.status(403).json({
        success: false,
        message: "Only teachers can request payouts",
      });
    }
    
    const { teacherId } = req.params;
    const { amount, method } = req.body;
    
    // Check if user is the teacher
    if (req.user.id !== teacherId) {
      return res.status(403).json({
        success: false,
        message: "You can only request payouts from your own account",
      });
    }
    
    const payout = await walletService.requestPayout(teacherId, amount, method);
    
    res.status(200).json({
      success: true,
      message: "Payout requested successfully",
      data: payout,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to request payout",
      error: error.message,
    });
  }
};

// Update transaction status
exports.updateTransactionStatus = async (req, res) => {
  try {
    if (req.user.type !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Only admins can update transaction status",
      });
    }
    
    const { studentId, transactionId } = req.params;
    const { status } = req.body;
    
    const transaction = await walletService.updateTransactionStatus(
      studentId,
      transactionId,
      status
    );
    
    res.status(200).json({
      success: true,
      message: "Transaction status updated successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update transaction status",
      error: error.message,
    });
  }
};

// Check deposit status
exports.checkDepositStatus = async (req, res) => {
  try {
    const { studentId, transactionId } = req.params;
    
    const status = await walletService.checkDepositStatus(studentId, transactionId);
    
    res.status(200).json({
      success: true,
      message: "Deposit status retrieved",
      data: status,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to check deposit status",
      error: error.message,
    });
  }
};

// Add missing functions for router compatibility
exports.getAll = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get all wallets endpoint",
    data: []
  });
};

exports.getById = async (req, res) => {
  try {
    const wallet = await exports.getWalletByStudentId(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Wallet retrieved successfully",
      data: wallet
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Wallet not found",
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const wallet = await exports.depositFunds(req.body);
    return res.status(201).json({
      success: true,
      message: "Wallet transaction created",
      data: wallet
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to create wallet transaction",
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const wallet = await exports.updateTrasnsactionStatus(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Wallet transaction updated",
      data: wallet
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to update wallet transaction",
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Delete wallet endpoint"
  });
};

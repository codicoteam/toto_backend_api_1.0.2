const Wallet = require("../models/wallet_model.js");
const mongoose = require('mongoose');

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Wallet.find({ isActive: true })
      .populate('student', 'firstName lastName email');
    return items;
  } catch (error) {
    throw new Error("Failed to fetch wallets: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Wallet.findById(id)
      .populate('student');
    if (!item) throw new Error("Wallet not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch wallet: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    // Check if wallet already exists for student
    const existing = await Wallet.findOne({ student: data.student });
    if (existing) {
      throw new Error("Wallet already exists for this student");
    }
    
    const item = new Wallet(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create wallet: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Wallet.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Wallet not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update wallet: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Wallet.findByIdAndDelete(id);
    if (!item) throw new Error("Wallet not found");
    return { message: "Wallet deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete wallet: " + error.message);
  }
};

// Get wallet by student ID
exports.getByStudentId = async (studentId) => {
  try {
    const item = await Wallet.findOne({ student: studentId, isActive: true })
      .populate('student', 'firstName lastName email');
    
    if (!item) {
      // Auto-create wallet if not exists
      return await exports.create({ student: studentId, currency: 'USD' });
    }
    
    return item;
  } catch (error) {
    throw new Error("Failed to fetch wallet by student: " + error.message);
  }
};

// Deposit to wallet
exports.deposit = async (studentId, depositData) => {
  try {
    const { amount, method, reference, description } = depositData;
    
    if (amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }
    
    let wallet = await Wallet.findOne({ student: studentId });
    
    if (!wallet) {
      wallet = await exports.create({ student: studentId, currency: 'USD' });
    }
    
    const transaction = {
      type: 'deposit',
      amount: Math.abs(amount),
      method,
      reference,
      description: description || 'Deposit to wallet',
      status: 'completed'
    };
    
    await wallet.addTransaction(transaction);
    
    return wallet;
  } catch (error) {
    throw new Error("Failed to deposit: " + error.message);
  }
};

// Withdraw from wallet
exports.withdraw = async (studentId, withdrawData) => {
  try {
    const { amount, method, reference, description } = withdrawData;
    
    if (amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }
    
    const wallet = await Wallet.findOne({ student: studentId });
    
    if (!wallet) {
      throw new Error("Wallet not found");
    }
    
    if (wallet.balance < amount) {
      throw new Error("Insufficient balance");
    }
    
    const transaction = {
      type: 'withdrawal',
      amount: -Math.abs(amount),
      method,
      reference,
      description: description || 'Withdrawal from wallet',
      status: 'completed'
    };
    
    await wallet.addTransaction(transaction);
    
    return wallet;
  } catch (error) {
    throw new Error("Failed to withdraw: " + error.message);
  }
};

// Get transaction history
exports.getTransactions = async (studentId, limit = 50) => {
  try {
    const wallet = await Wallet.findOne({ student: studentId });
    
    if (!wallet) {
      return [];
    }
    
    // Return last 'limit' transactions sorted by date
    return wallet.transactions
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);
  } catch (error) {
    throw new Error("Failed to fetch transactions: " + error.message);
  }
};

// Get wallet dashboard data
exports.getDashboardData = async (user) => {
  try {
    if (!user || !user.id) {
      throw new Error("User not authenticated");
    }
    
    const wallet = await Wallet.findOne({ student: user.id });
    
    if (!wallet) {
      return {
        balance: 0,
        totalDeposited: 0,
        totalWithdrawn: 0,
        recentTransactions: [],
        hasWallet: false
      };
    }
    
    // Get recent transactions
    const recentTransactions = wallet.transactions
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 10)
      .map(t => ({
        id: t._id,
        type: t.type,
        amount: t.amount,
        method: t.method,
        description: t.description,
        status: t.status,
        date: t.createdAt
      }));
    
    return {
      balance: wallet.balance,
      currency: wallet.currency,
      totalDeposited: wallet.totalDeposited,
      totalWithdrawn: wallet.totalWithdrawn,
      recentTransactions,
      lastTransactionAt: wallet.lastTransactionAt,
      hasWallet: true
    };
  } catch (error) {
    throw new Error("Failed to get dashboard data: " + error.message);
  }
};

// Process payment for subscription
exports.processPayment = async (studentId, paymentData) => {
  try {
    const { amount, description, reference } = paymentData;
    
    const wallet = await Wallet.findOne({ student: studentId });
    
    if (!wallet) {
      throw new Error("Wallet not found");
    }
    
    if (wallet.balance < amount) {
      throw new Error("Insufficient balance");
    }
    
    const transaction = {
      type: 'payment',
      amount: -Math.abs(amount),
      method: 'wallet',
      reference,
      description: description || 'Payment for subscription',
      status: 'completed'
    };
    
    await wallet.addTransaction(transaction);
    
    return {
      success: true,
      message: "Payment processed successfully",
      balance: wallet.balance
    };
  } catch (error) {
    throw new Error("Failed to process payment: " + error.message);
  }
};

// Get wallet summary for admin
exports.getSummary = async () => {
  try {
    const stats = await Wallet.aggregate([
      {
        $group: {
          _id: null,
          totalBalance: { $sum: "$balance" },
          totalDeposited: { $sum: "$totalDeposited" },
          totalWithdrawn: { $sum: "$totalWithdrawn" },
          walletCount: { $sum: 1 }
        }
      }
    ]);
    
    return stats[0] || {
      totalBalance: 0,
      totalDeposited: 0,
      totalWithdrawn: 0,
      walletCount: 0
    };
  } catch (error) {
    throw new Error("Failed to get wallet summary: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllWallets = exports.getAll;
exports.getWalletById = exports.getById;
exports.createWallet = exports.create;
exports.updateWallet = exports.update;
exports.deleteWallet = exports.delete;

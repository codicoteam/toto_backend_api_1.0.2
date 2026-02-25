const walletService = require("../services/wallet_service");

// Basic CRUD
exports.getAll = async (req, res) => {
  try {
    const data = await walletService.getAll();
    res.status(200).json({ success: true, message: "Wallets retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await walletService.getById(req.params.id);
    res.status(200).json({ success: true, message: "Wallet retrieved", data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await walletService.create(req.body);
    res.status(201).json({ success: true, message: "Wallet created", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await walletService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Wallet updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await walletService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Wallet deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Additional methods
exports.getAllWallets = exports.getAll;
exports.getWalletById = exports.getById;
exports.createWallet = exports.create;
exports.updateWallet = exports.update;
exports.deleteWallet = exports.delete;

exports.getWalletByStudentId = async (req, res) => {
  try {
    const data = await walletService.getByStudentId(req.params.studentId);
    res.status(200).json({ success: true, message: "Wallet retrieved", data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.deposit = async (req, res) => {
  try {
    const { studentId } = req.params;
    const data = await walletService.deposit(studentId, req.body);
    res.status(200).json({ success: true, message: "Deposit successful", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { studentId } = req.params;
    const data = await walletService.withdraw(studentId, req.body);
    res.status(200).json({ success: true, message: "Withdrawal successful", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const data = await walletService.getDashboardData(req.user);
    res.status(200).json({ success: true, message: "Dashboard data retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

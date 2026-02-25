const paymentService = require("../services/payment_service");

// Basic CRUD
exports.getAll = async (req, res) => {
  try {
    const data = await paymentService.getAll();
    res.status(200).json({ success: true, message: "Payments retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await paymentService.getById(req.params.id);
    res.status(200).json({ success: true, message: "Payment retrieved", data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await paymentService.create(req.body);
    res.status(201).json({ success: true, message: "Payment created", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await paymentService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Payment updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await paymentService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Payment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Additional methods
exports.getAllPayments = exports.getAll;
exports.getPaymentById = exports.getById;
exports.deletePayment = exports.delete;

exports.createMobilePayment = async (req, res) => {
  try {
    const data = await paymentService.createMobilePayment(req.body);
    res.status(201).json({ success: true, message: "Mobile payment initiated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.checkPaymentStatus = async (req, res) => {
  try {
    const { pollUrl } = req.body;
    const data = await paymentService.checkStatus(pollUrl);
    res.status(200).json({ success: true, message: "Payment status retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getPaymentsByStatus = async (req, res) => {
  try {
    const data = await paymentService.getByStatus(req.params.status);
    res.status(200).json({ success: true, message: "Payments retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

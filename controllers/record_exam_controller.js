const recordService = require("../services/record_exam_service");

// Basic CRUD
exports.getAll = async (req, res) => {
  try {
    const data = await recordService.getAll();
    res.status(200).json({ success: true, message: "Records retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await recordService.getById(req.params.id);
    res.status(200).json({ success: true, message: "Record retrieved", data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await recordService.create(req.body);
    res.status(201).json({ success: true, message: "Record created", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await recordService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Record updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await recordService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Additional methods
exports.createRecord = exports.create;

exports.getRecordsByStudentId = async (req, res) => {
  try {
    const data = await recordService.getByStudentId(req.params.studentId);
    res.status(200).json({ success: true, message: "Records retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getTopStudentsByExamId = async (req, res) => {
  try {
    const data = await recordService.getTopStudents(req.params.examId);
    res.status(200).json({ success: true, message: "Top students retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

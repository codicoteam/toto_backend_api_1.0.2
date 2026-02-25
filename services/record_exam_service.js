const Record_exam = require("../models/record_exam_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Record_exam.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch record_exam: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Record_exam.findById(id);
    if (!item) throw new Error("Record_exam not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch record_exam: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Record_exam(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create record_exam: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Record_exam.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Record_exam not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update record_exam: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Record_exam.findByIdAndDelete(id);
    if (!item) throw new Error("Record_exam not found");
    return { message: "Record_exam deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete record_exam: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllRecord_exams = exports.getAll;
exports.getRecord_examById = exports.getById;
exports.createRecord_exam = exports.create;
exports.updateRecord_exam = exports.update;
exports.deleteRecord_exam = exports.delete;

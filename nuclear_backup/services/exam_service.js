const examModel = require("../models/exam_model.js");

// Create new exam
const createExam = async (examData) => {
  try {
    const newExam = new Exam(examData);
    await newExam.save();
    return newExam;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all exams
const getAllExams = async (filters = {}) => {
  try {
    const query = { deleted: false };
    
    if (filters.teacherId) query.teacherId = filters.teacherId;
    if (filters.subject) query.subject = filters.subject;
    if (filters.Topic) query.Topic = filters.Topic;
    if (filters.level) query.level = filters.level;
    if (filters.isPublished !== undefined) query.isPublished = filters.isPublished;
    
    const exams = await Exam.find(query)
      .populate("subject")
      .populate("Topic")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications")
      .sort({ createdAt: -1 });
    
    return exams;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get exam by ID
const getExamById = async (id) => {
  try {
    const exam = await Exam.findById(id)
      .populate("subject")
      .populate("Topic")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications");

    if (!exam) {
      throw new Error("Exam not found");
    }
    return exam;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update exam by ID
const updateExam = async (id, updateData) => {
  try {
    const updatedExam = await Exam.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    )
      .populate("subject")
      .populate("Topic")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications");

    if (!updatedExam) {
      throw new Error("Exam not found");
    }
    return updatedExam;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete exam by ID (soft delete)
const deleteExam = async (id) => {
  try {
    const deletedExam = await Exam.findByIdAndUpdate(
      id,
      { deleted: true, deletedAt: Date.now() },
      { new: true }
    );

    if (!deletedExam) {
      throw new Error("Exam not found");
    }
    return deletedExam;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get exams by teacher ID
const getExamsByTeacherId = async (teacherId) => {
  try {
    const exams = await Exam.find({ 
      teacherId, 
      deleted: false 
    })
      .populate("subject")
      .populate("Topic")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications")
      .sort({ createdAt: -1 });

    return exams;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Publish exam
const publishExam = async (id) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      id,
      { isPublished: true },
      { new: true }
    )
      .populate("subject")
      .populate("Topic")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications");

    if (!exam) {
      throw new Error("Exam not found");
    }
    return exam;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Unpublish exam
const unpublishExam = async (id) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      id,
      { isPublished: false },
      { new: true }
    )
      .populate("subject")
      .populate("Topic")
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications");

    if (!exam) {
      throw new Error("Exam not found");
    }
    return exam;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get exam statistics
const getExamStats = async (id) => {
  try {
    const exam = await Exam.findById(id)
      .populate("teacherId", "firstName lastName email profile_pic_url qualifications");

    if (!exam) {
      throw new Error("Exam not found");
    }

    const stats = {
      exam,
      attemptCount: exam.attemptCount || 0,
      averageScore: exam.averageScore || 0,
    };

    return stats;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Add question to exam
const addQuestion = async (examId, questionData) => {
  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      throw new Error("Exam not found");
    }

    exam.questions.push(questionData);
    await exam.save();

    return exam;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update question
const updateQuestion = async (examId, questionIndex, questionData) => {
  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      throw new Error("Exam not found");
    }

    if (!exam.questions[questionIndex]) {
      throw new Error("Question not found");
    }

    exam.questions[questionIndex] = {
      ...exam.questions[questionIndex].toObject(),
      ...questionData
    };

    await exam.save();
    return exam;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete question
const deleteQuestion = async (examId, questionIndex) => {
  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      throw new Error("Exam not found");
    }

    if (!exam.questions[questionIndex]) {
      throw new Error("Question not found");
    }

    exam.questions.splice(questionIndex, 1);
    await exam.save();

    return exam;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
  getExamsByTeacherId,
  publishExam,
  unpublishExam,
  getExamStats,
  addQuestion,
  updateQuestion,
  deleteQuestion
};

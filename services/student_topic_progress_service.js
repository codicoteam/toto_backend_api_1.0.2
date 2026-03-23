const StudentTopicProgress = require("../models/student_topic_progress_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await StudentTopicProgress.find()
      .populate('studentId', 'firstName lastName email')
      .populate('topicId', 'title')
      .sort({ lastAccessed: -1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch progress records: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await StudentTopicProgress.findById(id)
      .populate('studentId')
      .populate('topicId');
    if (!item) throw new Error("Progress record not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch progress record: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    // Check if record already exists
    const existing = await StudentTopicProgress.findOne({
      studentId: data.studentId,
      topicId: data.topicId
    });
    
    if (existing) {
      throw new Error("Progress record already exists for this student and topic");
    }
    
    const item = new StudentTopicProgress(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create progress record: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await StudentTopicProgress.findByIdAndUpdate(
      id, 
      { ...data, lastAccessed: new Date() }, 
      { new: true }
    );
    if (!item) throw new Error("Progress record not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update progress record: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await StudentTopicProgress.findByIdAndDelete(id);
    if (!item) throw new Error("Progress record not found");
    return { message: "Progress record deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete progress record: " + error.message);
  }
};

// Get progress by student ID
exports.getByStudentId = async (studentId) => {
  try {
    const items = await StudentTopicProgress.find({ studentId })
      .populate('topicId')
      .sort({ lastAccessed: -1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch student progress: " + error.message);
  }
};

// Get progress by topic ID
exports.getByTopicId = async (topicId) => {
  try {
    const items = await StudentTopicProgress.find({ topicId })
      .populate('studentId', 'firstName lastName email')
      .sort({ progressPercentage: -1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch topic progress: " + error.message);
  }
};

// Get specific student's progress for a topic
exports.getStudentTopicProgress = async (studentId, topicId) => {
  try {
    const item = await StudentTopicProgress.findOne({ studentId, topicId })
      .populate('topicId');
    return item || { studentId, topicId, status: 'not_started', progressPercentage: 0 };
  } catch (error) {
    throw new Error("Failed to fetch student topic progress: " + error.message);
  }
};

// Get student progress summary
exports.getStudentProgressSummary = async (studentId) => {
  try {
    const records = await StudentTopicProgress.find({ studentId })
      .populate('topicId');
    
    const totalTopics = records.length;
    const completedTopics = records.filter(r => r.status === 'completed').length;
    const inProgressTopics = records.filter(r => r.status === 'in_progress').length;
    const notStartedTopics = records.filter(r => r.status === 'not_started').length;
    
    const averageProgress = records.reduce((acc, curr) => acc + (curr.progressPercentage || 0), 0) / totalTopics || 0;
    const totalTimeSpent = records.reduce((acc, curr) => acc + (curr.timeSpent || 0), 0);
    
    return {
      totalTopics,
      completedTopics,
      inProgressTopics,
      notStartedTopics,
      averageProgress,
      totalTimeSpent,
      recentTopics: records.slice(0, 5)
    };
  } catch (error) {
    throw new Error("Failed to fetch student progress summary: " + error.message);
  }
};

// Update progress
exports.updateProgress = async (studentId, topicId, progressData) => {
  try {
    let record = await StudentTopicProgress.findOne({ studentId, topicId });
    
    if (!record) {
      record = new StudentTopicProgress({ studentId, topicId, ...progressData });
    } else {
      Object.assign(record, progressData);
    }
    
    record.lastAccessed = new Date();
    await record.save();
    return record;
  } catch (error) {
    throw new Error("Failed to update progress: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllProgress = exports.getAll;
exports.getProgressById = exports.getById;
exports.createProgress = exports.create;
exports.updateProgress = exports.update;
exports.deleteProgress = exports.delete;

const communityService = require("../services/community_service");

// Basic CRUD
exports.getAll = async (req, res) => {
  try {
    const data = await communityService.getAll();
    res.status(200).json({ success: true, message: "Communities retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await communityService.getById(req.params.id);
    res.status(200).json({ success: true, message: "Community retrieved", data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await communityService.create(req.body);
    res.status(201).json({ success: true, message: "Community created", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await communityService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Community updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await communityService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Community deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Additional methods
exports.getAllCommunities = exports.getAll;
exports.getCommunityById = exports.getById;
exports.createCommunity = exports.create;
exports.updateCommunity = exports.update;
exports.deleteCommunity = exports.delete;

exports.getCommunitiesBySubjectId = async (req, res) => {
  try {
    const data = await communityService.getBySubjectId(req.params.subjectId);
    res.status(200).json({ success: true, message: "Communities retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.joinCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const { studentId } = req.body;
    const data = await communityService.addStudent(communityId, studentId);
    res.status(200).json({ success: true, message: "Joined community", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.leaveCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const { studentId } = req.body;
    const data = await communityService.removeStudent(communityId, studentId);
    res.status(200).json({ success: true, message: "Left community", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

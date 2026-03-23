const Community = require("../models/community_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Community.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch community: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Community.findById(id);
    if (!item) throw new Error("Community not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch community: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Community(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create community: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Community.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Community not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update community: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Community.findByIdAndDelete(id);
    if (!item) throw new Error("Community not found");
    return { message: "Community deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete community: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllCommunitys = exports.getAll;
exports.getCommunityById = exports.getById;
exports.createCommunity = exports.create;
exports.updateCommunity = exports.update;
exports.deleteCommunity = exports.delete;

// Get communities by subject ID
exports.getBySubjectId = async (subjectId) => {
  try {
    // This assumes your model has a subject field
    // If not, you'll need to adjust this query
    const items = await Community.find({ subject: subjectId, isActive: true });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch communities by subject: " + error.message);
  }
};

// Add student to community
exports.addStudent = async (communityId, userId) => {
  try {
    const community = await Community.findById(communityId);
    if (!community) throw new Error("Community not found");
    
    // Add student logic here - depends on your model structure
    // For example, if you have a members array:
    // community.members = community.members || [];
    // community.members.push({ userId, userType: 'student' });
    // await community.save();
    
    return community;
  } catch (error) {
    throw new Error("Failed to join community: " + error.message);
  }
};

// Remove student from community
exports.removeStudent = async (communityId, userId) => {
  try {
    const community = await Community.findById(communityId);
    if (!community) throw new Error("Community not found");
    
    // Remove student logic here - depends on your model structure
    // community.members = community.members.filter(m => m.userId.toString() !== userId);
    // await community.save();
    
    return community;
  } catch (error) {
    throw new Error("Failed to leave community: " + error.message);
  }
};

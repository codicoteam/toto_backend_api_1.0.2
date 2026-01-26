const communityService = require("../services/community_service.js");

// Create community
exports.createCommunity = async (req, res) => {
  try {
    // Add creator info
    req.body.createdBy = {
      userId: req.user.id,
      userType: req.user.type === 'teacher' ? 'Teacher' : 
                req.user.type === 'admin' ? 'Admin' : 'Student'
    };
    
    // Add creator as admin
    req.body.admins = [{
      userId: req.user.id,
      userType: req.user.type === 'teacher' ? 'Teacher' : 
                req.user.type === 'admin' ? 'Admin' : 'Student'
    }];
    
    const community = await communityService.createCommunity(req.body);
    
    res.status(201).json({
      success: true,
      message: "Community created successfully",
      data: community,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create community",
      error: error.message,
    });
  }
};

// Get all communities
exports.getAllCommunities = async (req, res) => {
  try {
    const filters = {};
    if (req.query.category) filters.category = req.query.category;
    if (req.query.level) filters.level = req.query.level;
    if (req.query.subject) filters.subject = req.query.subject;
    if (req.query.isPublic !== undefined) filters.isPublic = req.query.isPublic === 'true';
    
    const communities = await communityService.getAllCommunities(filters);
    
    res.status(200).json({
      success: true,
      message: "Communities retrieved successfully",
      data: communities,
      count: communities.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve communities",
      error: error.message,
    });
  }
};

// Get community by ID
exports.getCommunityById = async (req, res) => {
  try {
    const community = await communityService.getCommunityById(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Community retrieved successfully",
      data: community,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Community not found",
      error: error.message,
    });
  }
};

// Update community
exports.updateCommunity = async (req, res) => {
  try {
    // Check if user is admin of the community
    const community = await communityService.getCommunityById(req.params.id);
    const isAdmin = community.admins.some(admin => 
      admin.userId.toString() === req.user.id && admin.userType === req.user.type
    );
    
    if (!isAdmin && req.user.type !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Only community admins can update the community",
      });
    }
    
    const updatedCommunity = await communityService.updateCommunity(req.params.id, req.body);
    
    res.status(200).json({
      success: true,
      message: "Community updated successfully",
      data: updatedCommunity,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update community",
      error: error.message,
    });
  }
};

// Delete community
exports.deleteCommunity = async (req, res) => {
  try {
    // Check if user is admin of the community or main admin
    const community = await communityService.getCommunityById(req.params.id);
    const isAdmin = community.admins.some(admin => 
      admin.userId.toString() === req.user.id && admin.userType === req.user.type
    );
    
    if (!isAdmin && req.user.type !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Only community admins can delete the community",
      });
    }
    
    await communityService.deleteCommunity(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Community deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete community",
      error: error.message,
    });
  }
};

// Join community
exports.joinCommunity = async (req, res) => {
  try {
    const member = {
      userId: req.user.id,
      userType: req.user.type === 'teacher' ? 'Teacher' : 
                req.user.type === 'admin' ? 'Admin' : 'Student'
    };
    
    const community = await communityService.joinCommunity(req.params.id, member);
    
    res.status(200).json({
      success: true,
      message: "Joined community successfully",
      data: community,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to join community",
      error: error.message,
    });
  }
};

// Leave community
exports.leaveCommunity = async (req, res) => {
  try {
    const community = await communityService.leaveCommunity(req.params.id, req.user.id, req.user.type);
    
    res.status(200).json({
      success: true,
      message: "Left community successfully",
      data: community,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to leave community",
      error: error.message,
    });
  }
};

// Create post
exports.createPost = async (req, res) => {
  try {
    const post = {
      userId: req.user.id,
      userType: req.user.type === 'teacher' ? 'Teacher' : 
                req.user.type === 'admin' ? 'Admin' : 'Student',
      content: req.body.content,
      media: req.body.media || []
    };
    
    const community = await communityService.createPost(req.params.id, post);
    
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: community.posts[community.posts.length - 1],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create post",
      error: error.message,
    });
  }
};

// Like post
exports.likePost = async (req, res) => {
  try {
    const like = {
      userId: req.user.id,
      userType: req.user.type === 'teacher' ? 'Teacher' : 
                req.user.type === 'admin' ? 'Admin' : 'Student'
    };
    
    const community = await communityService.likePost(
      req.params.communityId,
      req.params.postIndex,
      like
    );
    
    res.status(200).json({
      success: true,
      message: "Post liked successfully",
      data: community.posts[req.params.postIndex].likes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to like post",
      error: error.message,
    });
  }
};

// Unlike post
exports.unlikePost = async (req, res) => {
  try {
    const community = await communityService.unlikePost(
      req.params.communityId,
      req.params.postIndex,
      req.user.id,
      req.user.type
    );
    
    res.status(200).json({
      success: true,
      message: "Post unliked successfully",
      data: community.posts[req.params.postIndex].likes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to unlike post",
      error: error.message,
    });
  }
};

// Add comment to post
exports.addComment = async (req, res) => {
  try {
    const comment = {
      userId: req.user.id,
      userType: req.user.type === 'teacher' ? 'Teacher' : 
                req.user.type === 'admin' ? 'Admin' : 'Student',
      content: req.body.content
    };
    
    const community = await communityService.addComment(
      req.params.communityId,
      req.params.postIndex,
      comment
    );
    
    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: community.posts[req.params.postIndex].comments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add comment",
      error: error.message,
    });
  }
};

// Add reply to comment
exports.addReplyToComment = async (req, res) => {
  try {
    const reply = {
      userId: req.user.id,
      userType: req.user.type === 'teacher' ? 'Teacher' : 
                req.user.type === 'admin' ? 'Admin' : 'Student',
      content: req.body.content
    };
    
    const community = await communityService.addReplyToComment(
      req.params.communityId,
      req.params.postIndex,
      req.params.commentIndex,
      reply
    );
    
    res.status(201).json({
      success: true,
      message: "Reply added successfully",
      data: community.posts[req.params.postIndex].comments[req.params.commentIndex].replies,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add reply",
      error: error.message,
    });
  }
};

// Get user communities
exports.getUserCommunities = async (req, res) => {
  try {
    const communities = await communityService.getUserCommunities(req.user.id, req.user.type);
    
    res.status(200).json({
      success: true,
      message: "User communities retrieved successfully",
      data: communities,
      count: communities.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user communities",
      error: error.message,
    });
  }
};

// Add admin to community
exports.addAdmin = async (req, res) => {
  try {
    const { communityId } = req.params;
    const { userId, userType } = req.body;
    
    // Check if current user is admin
    const community = await communityService.getCommunityById(communityId);
    const isAdmin = community.admins.some(admin => 
      admin.userId.toString() === req.user.id && admin.userType === req.user.type
    );
    
    if (!isAdmin && req.user.type !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Only community admins can add new admins",
      });
    }
    
    const updatedCommunity = await communityService.addAdmin(communityId, userId, userType);
    
    res.status(200).json({
      success: true,
      message: "Admin added successfully",
      data: updatedCommunity,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add admin",
      error: error.message,
    });
  }
};

// Remove admin from community
exports.removeAdmin = async (req, res) => {
  try {
    const { communityId } = req.params;
    const { userId, userType } = req.body;
    
    // Check if current user is admin
    const community = await communityService.getCommunityById(communityId);
    const isAdmin = community.admins.some(admin => 
      admin.userId.toString() === req.user.id && admin.userType === req.user.type
    );
    
    if (!isAdmin && req.user.type !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Only community admins can remove admins",
      });
    }
    
    const updatedCommunity = await communityService.removeAdmin(communityId, userId, userType);
    
    res.status(200).json({
      success: true,
      message: "Admin removed successfully",
      data: updatedCommunity,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to remove admin",
      error: error.message,
    });
  }
};

// Add missing functions for router compatibility
exports.getById = exports.getCommunityById;
exports.getAll = exports.getAllCommunities;
exports.create = exports.createCommunity;
exports.update = exports.updateCommunity;
exports.delete = exports.deleteCommunity;

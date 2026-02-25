const dashboardService = require("../services/dashboard_service");

exports.getStudentLevelInfo = async (req, res) => {
  try {
    const { level, studentId } = req.query;
    const data = await dashboardService.getStudentLevelInfo(level, studentId);
    res.status(200).json({ success: true, message: "Dashboard data retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const data = await dashboardService.getDashboard(req.user);
    res.status(200).json({ success: true, message: "Dashboard data retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const router = express.Router();
const express = require("express");
const subjectController = require("../controllers/subject_controller");
const { authenticateToken } = require("../middlewares/auth");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/subject_router_fixed:
 *   get:
 *     summary: Get all subject router fixed.js
 *     tags: [Subject router fixed.js]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subject router fixed.js
 */

router.get("/", authenticateToken, subjectController.getAll);

router.get("/", authenticateToken, subjectController.getAllSubjects);
router.get("/:id", authenticateToken, subjectController.getSubjectById);
router.post("/", authenticateToken, subjectController.createSubject);
router.put("/:id", authenticateToken, subjectController.updateSubject);
router.delete("/:id", authenticateToken, subjectController.deleteSubject);

module.exports = router;